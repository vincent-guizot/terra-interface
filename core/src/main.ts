import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Swagger OpenAPI Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('TERRA INTERFACE — Home OS API')
    .setDescription(
      'Operational Management & Universal Batch Engine for Vincent\'s Farm (300 m² Homestead, West Java, Indonesia). ' +
      'Supports embedded CRUD, closed-loop circular nutrient tracking, microgrid telemetry, and biological batch lifecycles.'
    )
    .setVersion('1.0.0')
    .addTag('Universal Batches', 'Lifecycle tracking from Draft to Completed with multi-harvest logging')
    .addTag('Cultivation', 'Hydroponic NFT, microgreen trays, and permaculture beds')
    .addTag('Livestock', 'Ayam KUB, Joper, Boer goats, and Garut sheep herds')
    .addTag('Aquaculture', 'Recirculating Nile tilapia and African catfish bio-ponds')
    .addTag('Circular System', 'BSF bioconversion, maggot harvests, and Bokashi composting')
    .addTag('Energy & Water', '5.2 kWp Solar PV, 15.3 kWh LiFePO4 BMS, and 12,000 L rainwater storage')
    .addTag('Inventory', 'Homestead storage locations and SKU stock ledger')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Terra Interface — Swagger API Docs',
    customCss: '.swagger-ui .topbar { background-color: #1B4332; }',
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🌿 Terra Interface Core Engine running at http://localhost:${port}/api/v1`);
  console.log(`📖 Swagger OpenAPI Documentation available at http://localhost:${port}/api/docs`);
}
bootstrap();
