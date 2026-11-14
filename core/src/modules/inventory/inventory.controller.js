"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inventory_service_1 = require("./inventory.service");
const record_stock_movement_dto_1 = require("./dto/record-stock-movement.dto");
const create_inventory_item_dto_1 = require("./dto/create-inventory-item.dto");
let InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async getItems(category, lowStockOnly) {
        return this.inventoryService.getItems(category, lowStockOnly);
    }
    async getItemById(id) {
        return this.inventoryService.getItemById(id);
    }
    async createItem(dto) {
        return this.inventoryService.createItem(dto);
    }
    async getStorageLocations() {
        return this.inventoryService.getStorageLocations();
    }
    async getMovements(itemId, limit) {
        return this.inventoryService.getMovements(itemId, limit ? Number(limit) : 50);
    }
    async recordMovement(dto) {
        return this.inventoryService.recordMovement(dto);
    }
    async getLowStockAlerts() {
        return this.inventoryService.getLowStockAlerts();
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Get)('items'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get inventory stock items with mathematically derived balances',
        description: 'Retrieves current items across storage locations with balance calculated from immutable movements.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category (Feeds, Seeds, Biologicals, etc.)' }),
    (0, swagger_1.ApiQuery)({ name: 'lowStockOnly', required: false, type: Boolean, description: 'Filter items below reorder threshold' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of inventory stock items' }),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('lowStockOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getItems", null);
__decorate([
    (0, common_1.Get)('items/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single inventory item with full movement ledger' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inventory item details with audit movements' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getItemById", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new inventory catalog SKU item' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Item created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventory_item_dto_1.CreateInventoryItemDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createItem", null);
__decorate([
    (0, common_1.Get)('locations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all physical storage locations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of storage locations with item counts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getStorageLocations", null);
__decorate([
    (0, common_1.Get)('movements'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get immutable stock movement ledger stream',
        description: 'Audit log of all stock inflows and outflows across the homestead.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'itemId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of stock movement transactions' }),
    __param(0, (0, common_1.Query)('itemId')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getMovements", null);
__decorate([
    (0, common_1.Post)('movements'),
    (0, swagger_1.ApiOperation)({
        summary: 'Record an immutable stock movement transaction',
        description: 'Appends a movement to the ledger and recalculates stock balance.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Movement recorded and balance updated' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_stock_movement_dto_1.RecordStockMovementDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "recordMovement", null);
__decorate([
    (0, common_1.Get)('alerts/low-stock'),
    (0, swagger_1.ApiOperation)({ summary: 'Get low stock reorder alerts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of stock alerts for replenishing' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getLowStockAlerts", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Inventory Transaction Ledger'),
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
