-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('DRAFT', 'PLANNED', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('PURCHASE_IN', 'HARVEST_IN', 'BATCH_CONSUME_OUT', 'FEEDING_OUT', 'MORTALITY_LOSS_OUT', 'WASTE_OUT', 'INTERNAL_TRANSFER', 'CYCLE_COUNT_ADJUSTMENT');

-- CreateTable
CREATE TABLE "Homestead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Vincent''s Farm',
    "totalAreaSqm" DOUBLE PRECISION NOT NULL DEFAULT 300.0,
    "dimensions" TEXT NOT NULL DEFAULT '15m x 20m',
    "location" TEXT NOT NULL DEFAULT 'West Java, Indonesia',
    "climateType" TEXT NOT NULL DEFAULT 'Tropical Highland Monsoon',
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT -6.9175,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 107.6191,
    "stewardName" TEXT NOT NULL DEFAULT 'Vincent',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Homestead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitePlanVersion" (
    "id" TEXT NOT NULL,
    "homesteadId" TEXT NOT NULL,
    "versionName" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
    "svgLayout" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SitePlanVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "homesteadId" TEXT NOT NULL,
    "areaSqm" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "domainTag" TEXT DEFAULT 'CULTIVATION',
    "colorHex" TEXT NOT NULL DEFAULT '#10B981',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "footprintSqm" DOUBLE PRECISION NOT NULL,
    "roofAreaSqm" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "buildingId" TEXT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "modelNumber" TEXT,
    "ratedPowerWatt" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "status" TEXT NOT NULL DEFAULT 'OPERATIONAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "homesteadId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "icon" TEXT DEFAULT 'Grass',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDefinition" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "defaultUnitId" TEXT,
    "densityKgPerL" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasurementUnit" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,

    CONSTRAINT "MeasurementUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitConversion" (
    "id" TEXT NOT NULL,
    "sourceUnitId" TEXT NOT NULL,
    "targetUnitId" TEXT NOT NULL,
    "multiplier" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UnitConversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomFieldDefinition" (
    "id" TEXT NOT NULL,
    "productDefinitionId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CustomFieldDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomFieldValue" (
    "id" TEXT NOT NULL,
    "fieldDefId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CustomFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionType" (
    "id" TEXT NOT NULL,
    "homesteadId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "defaultUnit" TEXT NOT NULL DEFAULT 'kg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomField" (
    "id" TEXT NOT NULL,
    "productionTypeId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "fieldType" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CustomField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchCustomFieldValue" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "customFieldId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "BatchCustomFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "batchCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "productionTypeId" TEXT,
    "productDefinitionId" TEXT,
    "zoneId" TEXT NOT NULL,
    "status" "BatchStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL,
    "expectedEndDate" TIMESTAMP(3),
    "actualEndDate" TIMESTAMP(3),
    "initialQuantity" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "currentQuantity" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "measurementUnit" TEXT NOT NULL,
    "healthIndex" DOUBLE PRECISION DEFAULT 95.0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchStatusHistory" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "fromStatus" "BatchStatus" NOT NULL,
    "toStatus" "BatchStatus" NOT NULL,
    "reason" TEXT,
    "changedBy" TEXT NOT NULL DEFAULT 'Vincent',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchEvent" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "recordedBy" TEXT NOT NULL DEFAULT 'Vincent',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchOutput" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "harvestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productName" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "measurementUnit" TEXT NOT NULL,
    "qualityGrade" TEXT DEFAULT 'Grade A',
    "destination" TEXT,
    "stewardName" TEXT NOT NULL DEFAULT 'Vincent',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchOutput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchHistory" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "performedBy" TEXT NOT NULL DEFAULT 'Vincent',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CultivationBatchDetail" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "growingMedium" TEXT NOT NULL,
    "lightingType" TEXT DEFAULT 'NATURAL_SUNLIGHT',
    "ecTarget" DOUBLE PRECISION,
    "phTarget" DOUBLE PRECISION,
    "trayCount" INTEGER,
    "bedNumber" TEXT,

    CONSTRAINT "CultivationBatchDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LivestockBatchDetail" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "housingSystem" TEXT NOT NULL,
    "mortalityCount" INTEGER NOT NULL DEFAULT 0,
    "targetFcr" DOUBLE PRECISION,

    CONSTRAINT "LivestockBatchDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AquacultureBatchDetail" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "pondVolumeM3" DOUBLE PRECISION NOT NULL DEFAULT 12.0,
    "targetDensityKgM3" DOUBLE PRECISION NOT NULL DEFAULT 25.0,
    "aerationType" TEXT DEFAULT 'VENTURI_AND_DIFFUSER',
    "dissolvedOxygenMin" DOUBLE PRECISION NOT NULL DEFAULT 5.0,

    CONSTRAINT "AquacultureBatchDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BsfBatchDetail" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "substrateType" TEXT NOT NULL,
    "substrateWeightKg" DOUBLE PRECISION NOT NULL,
    "trayCount" INTEGER NOT NULL DEFAULT 5,
    "frassYieldKg" DOUBLE PRECISION,
    "maggotYieldKg" DOUBLE PRECISION,

    CONSTRAINT "BsfBatchDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompostBatchDetail" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "bayNumber" TEXT NOT NULL,
    "carbonNitrogenRatio" DOUBLE PRECISION NOT NULL DEFAULT 30.0,
    "biocharPercent" DOUBLE PRECISION NOT NULL DEFAULT 10.0,
    "turnCount" INTEGER NOT NULL DEFAULT 0,
    "peakTempC" DOUBLE PRECISION,
    "curedMaturityScore" DOUBLE PRECISION,

    CONSTRAINT "CompostBatchDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowingRecord" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "recordDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordType" TEXT NOT NULL,
    "parameter1" TEXT,
    "parameter2" TEXT,
    "notes" TEXT,
    "stewardName" TEXT NOT NULL DEFAULT 'Vincent',

    CONSTRAINT "GrowingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorageLocation" (
    "id" TEXT NOT NULL,
    "homesteadId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacityInfo" TEXT,

    CONSTRAINT "StorageLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "homesteadId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "productDefId" TEXT,
    "inStock" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "unit" TEXT NOT NULL,
    "minThreshold" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "type" "StockMovementType" NOT NULL,
    "quantityDelta" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "referenceBatchCode" TEXT,
    "batchOutputId" TEXT,
    "stewardName" TEXT NOT NULL DEFAULT 'Vincent',
    "notes" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTx" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "reason" TEXT,
    "stewardName" TEXT NOT NULL DEFAULT 'Vincent',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockTx_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyNode" (
    "id" TEXT NOT NULL,
    "solarKw" DOUBLE PRECISION NOT NULL DEFAULT 5.2,
    "batterySocPct" DOUBLE PRECISION NOT NULL DEFAULT 88.0,
    "inverterPowerWatt" DOUBLE PRECISION NOT NULL DEFAULT 1240.0,
    "gridDrawWatt" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnergyNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterNode" (
    "id" TEXT NOT NULL,
    "cisternLevelPct" DOUBLE PRECISION NOT NULL DEFAULT 92.0,
    "currentVolumeL" DOUBLE PRECISION NOT NULL DEFAULT 11040.0,
    "totalCapacityL" DOUBLE PRECISION NOT NULL DEFAULT 12000.0,
    "dailyUsageL" DOUBLE PRECISION NOT NULL DEFAULT 380.0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceFlowLog" (
    "id" TEXT NOT NULL,
    "sourceZoneId" TEXT NOT NULL,
    "destinationZoneId" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "plannedQuantity" DOUBLE PRECISION NOT NULL,
    "actualQuantity" DOUBLE PRECISION NOT NULL,
    "measurementUnit" TEXT NOT NULL,
    "circularityScore" DOUBLE PRECISION NOT NULL DEFAULT 95.4,
    "stewardName" TEXT NOT NULL DEFAULT 'Vincent',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResourceFlowLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "assignedTo" TEXT NOT NULL DEFAULT 'Vincent',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorDevice" (
    "id" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "deviceModel" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ONLINE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelemetryReading" (
    "id" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "sensorId" TEXT,
    "metric" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TelemetryReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiRecommendation" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "actionText" TEXT NOT NULL,
    "isApplied" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Zone_code_key" ON "Zone"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductDefinition_sku_key" ON "ProductDefinition"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementUnit_symbol_key" ON "MeasurementUnit"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_batchCode_key" ON "Batch"("batchCode");

-- CreateIndex
CREATE INDEX "Batch_domain_status_idx" ON "Batch"("domain", "status");

-- CreateIndex
CREATE INDEX "Batch_zoneId_idx" ON "Batch"("zoneId");

-- CreateIndex
CREATE UNIQUE INDEX "CultivationBatchDetail_batchId_key" ON "CultivationBatchDetail"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "LivestockBatchDetail_batchId_key" ON "LivestockBatchDetail"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "AquacultureBatchDetail_batchId_key" ON "AquacultureBatchDetail"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "BsfBatchDetail_batchId_key" ON "BsfBatchDetail"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "CompostBatchDetail_batchId_key" ON "CompostBatchDetail"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_sku_key" ON "InventoryItem"("sku");

-- CreateIndex
CREATE INDEX "InventoryItem_locationId_category_idx" ON "InventoryItem"("locationId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "StockMovement_batchOutputId_key" ON "StockMovement"("batchOutputId");

-- CreateIndex
CREATE INDEX "StockMovement_itemId_timestamp_idx" ON "StockMovement"("itemId", "timestamp");

-- CreateIndex
CREATE INDEX "ResourceFlowLog_resourceType_timestamp_idx" ON "ResourceFlowLog"("resourceType", "timestamp");

-- CreateIndex
CREATE INDEX "TelemetryReading_metric_timestamp_idx" ON "TelemetryReading"("metric", "timestamp");

-- AddForeignKey
ALTER TABLE "SitePlanVersion" ADD CONSTRAINT "SitePlanVersion_homesteadId_fkey" FOREIGN KEY ("homesteadId") REFERENCES "Homestead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_homesteadId_fkey" FOREIGN KEY ("homesteadId") REFERENCES "Homestead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_homesteadId_fkey" FOREIGN KEY ("homesteadId") REFERENCES "Homestead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDefinition" ADD CONSTRAINT "ProductDefinition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDefinition" ADD CONSTRAINT "ProductDefinition_defaultUnitId_fkey" FOREIGN KEY ("defaultUnitId") REFERENCES "MeasurementUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitConversion" ADD CONSTRAINT "UnitConversion_sourceUnitId_fkey" FOREIGN KEY ("sourceUnitId") REFERENCES "MeasurementUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitConversion" ADD CONSTRAINT "UnitConversion_targetUnitId_fkey" FOREIGN KEY ("targetUnitId") REFERENCES "MeasurementUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomFieldDefinition" ADD CONSTRAINT "CustomFieldDefinition_productDefinitionId_fkey" FOREIGN KEY ("productDefinitionId") REFERENCES "ProductDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomFieldValue" ADD CONSTRAINT "CustomFieldValue_fieldDefId_fkey" FOREIGN KEY ("fieldDefId") REFERENCES "CustomFieldDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomFieldValue" ADD CONSTRAINT "CustomFieldValue_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionType" ADD CONSTRAINT "ProductionType_homesteadId_fkey" FOREIGN KEY ("homesteadId") REFERENCES "Homestead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomField" ADD CONSTRAINT "CustomField_productionTypeId_fkey" FOREIGN KEY ("productionTypeId") REFERENCES "ProductionType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchCustomFieldValue" ADD CONSTRAINT "BatchCustomFieldValue_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchCustomFieldValue" ADD CONSTRAINT "BatchCustomFieldValue_customFieldId_fkey" FOREIGN KEY ("customFieldId") REFERENCES "CustomField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_productionTypeId_fkey" FOREIGN KEY ("productionTypeId") REFERENCES "ProductionType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_productDefinitionId_fkey" FOREIGN KEY ("productDefinitionId") REFERENCES "ProductDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchStatusHistory" ADD CONSTRAINT "BatchStatusHistory_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchEvent" ADD CONSTRAINT "BatchEvent_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchOutput" ADD CONSTRAINT "BatchOutput_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchHistory" ADD CONSTRAINT "BatchHistory_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CultivationBatchDetail" ADD CONSTRAINT "CultivationBatchDetail_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LivestockBatchDetail" ADD CONSTRAINT "LivestockBatchDetail_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AquacultureBatchDetail" ADD CONSTRAINT "AquacultureBatchDetail_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BsfBatchDetail" ADD CONSTRAINT "BsfBatchDetail_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompostBatchDetail" ADD CONSTRAINT "CompostBatchDetail_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowingRecord" ADD CONSTRAINT "GrowingRecord_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageLocation" ADD CONSTRAINT "StorageLocation_homesteadId_fkey" FOREIGN KEY ("homesteadId") REFERENCES "Homestead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_homesteadId_fkey" FOREIGN KEY ("homesteadId") REFERENCES "Homestead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "StorageLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_productDefId_fkey" FOREIGN KEY ("productDefId") REFERENCES "ProductDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_batchOutputId_fkey" FOREIGN KEY ("batchOutputId") REFERENCES "BatchOutput"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTx" ADD CONSTRAINT "StockTx_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorDevice" ADD CONSTRAINT "SensorDevice_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelemetryReading" ADD CONSTRAINT "TelemetryReading_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelemetryReading" ADD CONSTRAINT "TelemetryReading_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "SensorDevice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
