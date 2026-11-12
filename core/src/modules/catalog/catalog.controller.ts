import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { CreateProductCategoryDto, CreateProductDefinitionDto } from './dto/create-product.dto';
import { ConvertUnitDto } from './dto/convert-unit.dto';

@ApiTags('Product & Unit Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('categories')
  @ApiOperation({ summary: 'List all dynamic product categories' })
  @ApiQuery({ name: 'domain', required: false, enum: ['CULTIVATION', 'LIVESTOCK', 'AQUACULTURE', 'CIRCULAR'] })
  @ApiResponse({ status: 200, description: 'List of product categories' })
  async getCategories(@Query('domain') domain?: string) {
    return this.catalogService.getCategories(domain);
  }

  @Post('categories')
  @ApiOperation({ summary: 'Register a custom product category' })
  @ApiResponse({ status: 201, description: 'Category created' })
  async createCategory(@Body() dto: CreateProductCategoryDto) {
    return this.catalogService.createCategory(dto);
  }

  @Get('products')
  @ApiOperation({ summary: 'List all product definitions' })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiResponse({ status: 200, description: 'List of products with units and density' })
  async getProducts(@Query('categoryId') categoryId?: string) {
    return this.catalogService.getProducts(categoryId);
  }

  @Post('products')
  @ApiOperation({ summary: 'Register a new product definition' })
  @ApiResponse({ status: 201, description: 'Product registered' })
  async createProduct(@Body() dto: CreateProductDefinitionDto) {
    return this.catalogService.createProduct(dto);
  }

  @Get('units')
  @ApiOperation({ summary: 'Get list of standard measurement units with physical dimensions' })
  @ApiResponse({ status: 200, description: 'List of units' })
  async getUnits() {
    return this.catalogService.getUnits();
  }

  @Post('units/convert')
  @ApiOperation({
    summary: 'Perform dimension-safe unit conversion',
    description: 'Enforces same-dimension scaling or requires densityKgPerL for Mass <-> Volume conversion.',
  })
  @ApiResponse({ status: 200, description: 'Converted quantity result' })
  @ApiResponse({ status: 400, description: 'Incompatible dimensions or missing density' })
  async convertUnit(@Body() dto: ConvertUnitDto) {
    return this.catalogService.convertUnit(dto);
  }
}
