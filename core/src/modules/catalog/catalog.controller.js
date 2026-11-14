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
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const catalog_service_1 = require("./catalog.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const convert_unit_dto_1 = require("./dto/convert-unit.dto");
let CatalogController = class CatalogController {
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    async getCategories(domain) {
        return this.catalogService.getCategories(domain);
    }
    async createCategory(dto) {
        return this.catalogService.createCategory(dto);
    }
    async getProducts(categoryId) {
        return this.catalogService.getProducts(categoryId);
    }
    async createProduct(dto) {
        return this.catalogService.createProduct(dto);
    }
    async getUnits() {
        return this.catalogService.getUnits();
    }
    async convertUnit(dto) {
        return this.catalogService.convertUnit(dto);
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'List all dynamic product categories' }),
    (0, swagger_1.ApiQuery)({ name: 'domain', required: false, enum: ['CULTIVATION', 'LIVESTOCK', 'AQUACULTURE', 'CIRCULAR'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of product categories' }),
    __param(0, (0, common_1.Query)('domain')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a custom product category' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Category created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductCategoryDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'List all product definitions' }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of products with units and density' }),
    __param(0, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new product definition' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product registered' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDefinitionDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('units'),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of standard measurement units with physical dimensions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of units' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getUnits", null);
__decorate([
    (0, common_1.Post)('units/convert'),
    (0, swagger_1.ApiOperation)({
        summary: 'Perform dimension-safe unit conversion',
        description: 'Enforces same-dimension scaling or requires densityKgPerL for Mass <-> Volume conversion.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Converted quantity result' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Incompatible dimensions or missing density' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [convert_unit_dto_1.ConvertUnitDto]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "convertUnit", null);
exports.CatalogController = CatalogController = __decorate([
    (0, swagger_1.ApiTags)('Product & Unit Catalog'),
    (0, common_1.Controller)('catalog'),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
