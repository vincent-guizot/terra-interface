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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const STANDARD_UNITS = [
    { symbol: 'kg', name: 'Kilogram', dimension: 'MASS', factor: 1.0 },
    { symbol: 'g', name: 'Gram', dimension: 'MASS', factor: 0.001 },
    { symbol: 'mg', name: 'Milligram', dimension: 'MASS', factor: 0.000001 },
    { symbol: 'm3', name: 'Cubic Meter', dimension: 'VOLUME', factor: 1000.0 },
    { symbol: 'L', name: 'Liter', dimension: 'VOLUME', factor: 1.0 },
    { symbol: 'mL', name: 'Milliliter', dimension: 'VOLUME', factor: 0.001 },
    { symbol: 'pcs', name: 'Pieces', dimension: 'DISCRETE', factor: 1.0 },
    { symbol: 'head', name: 'Head (Livestock)', dimension: 'DISCRETE', factor: 1.0 },
    { symbol: 'birds', name: 'Birds (Flock)', dimension: 'DISCRETE', factor: 1.0 },
    { symbol: 'trays', name: 'Trays (BSF / Microgreens)', dimension: 'DISCRETE', factor: 1.0 },
    { symbol: 'bundles', name: 'Bundles', dimension: 'DISCRETE', factor: 1.0 },
    { symbol: 'bags', name: 'Bags', dimension: 'DISCRETE', factor: 1.0 },
    { symbol: 'kWh', name: 'Kilowatt-Hour', dimension: 'ENERGY', factor: 1.0 },
];
let CatalogService = class CatalogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCategories(domain) {
        try {
            const where = {};
            if (domain)
                where.domain = domain;
            const categories = await this.prisma.productCategory.findMany({
                where,
                include: { products: true },
                orderBy: { name: 'asc' },
            });
            if (categories.length > 0)
                return categories;
        }
        catch (err) {
        }
        return [
            { id: 'cat-veg', name: 'Vegetables & Leafy Greens', domain: 'CULTIVATION', icon: 'Grass' },
            { id: 'cat-fun', name: 'Gourmet Mushrooms & Fungi', domain: 'CULTIVATION', icon: 'Spa' },
            { id: 'cat-pou', name: 'Poultry & Layers', domain: 'LIVESTOCK', icon: 'Pets' },
            { id: 'cat-rum', name: 'Small Ruminants (Goats & Sheep)', domain: 'LIVESTOCK', icon: 'Pets' },
            { id: 'cat-fin', name: 'Freshwater Finfish', domain: 'AQUACULTURE', icon: 'SetMeal' },
            { id: 'cat-bsf', name: 'BSF Bioconversion Biomass', domain: 'CIRCULAR', icon: 'Loop' },
            { id: 'cat-cmp', name: 'Bokashi & Biochar Compost', domain: 'CIRCULAR', icon: 'Yard' },
        ];
    }
    async createCategory(dto) {
        const homestead = await this.prisma.homestead.findFirst();
        if (!homestead)
            throw new common_1.NotFoundException('Homestead record not found');
        return this.prisma.productCategory.create({
            data: {
                homesteadId: homestead.id,
                name: dto.name,
                domain: dto.domain,
                icon: dto.icon || 'Grass',
            },
        });
    }
    async getProducts(categoryId) {
        try {
            const where = {};
            if (categoryId)
                where.categoryId = categoryId;
            const products = await this.prisma.productDefinition.findMany({
                where,
                include: { category: true, defaultUnit: true },
                orderBy: { name: 'asc' },
            });
            if (products.length > 0)
                return products;
        }
        catch (err) {
        }
        return [
            { id: 'p-bok', name: 'Bok Choy White Stem', sku: 'SKU-CUL-BOK-01', densityKgPerL: 0.95, defaultUnit: 'heads' },
            { id: 'p-til', name: 'Nile Tilapia (Table Size)', sku: 'SKU-AQU-TIL-01', densityKgPerL: 1.0, defaultUnit: 'kg' },
            { id: 'p-egg', name: 'Fresh Pastured Eggs', sku: 'SKU-LIV-EGG-01', densityKgPerL: 1.03, defaultUnit: 'pcs' },
            { id: 'p-bsf', name: 'Live 5-Instar BSF Larvae', sku: 'SKU-CIR-BSF-01', densityKgPerL: 0.65, defaultUnit: 'kg' },
        ];
    }
    async createProduct(dto) {
        return this.prisma.productDefinition.create({
            data: {
                name: dto.name,
                sku: dto.sku,
                categoryId: dto.categoryId,
                defaultUnitId: dto.defaultUnitId,
                densityKgPerL: dto.densityKgPerL,
            },
        });
    }
    async getUnits() {
        return STANDARD_UNITS;
    }
    async convertUnit(dto) {
        const src = STANDARD_UNITS.find((u) => u.symbol.toLowerCase() === dto.sourceUnit.toLowerCase());
        const tgt = STANDARD_UNITS.find((u) => u.symbol.toLowerCase() === dto.targetUnit.toLowerCase());
        if (!src)
            throw new common_1.NotFoundException(`Source unit '${dto.sourceUnit}' not recognized`);
        if (!tgt)
            throw new common_1.NotFoundException(`Target unit '${dto.targetUnit}' not recognized`);
        if (src.symbol === tgt.symbol) {
            return { convertedQuantity: dto.quantity, targetUnit: tgt.symbol, sourceUnit: src.symbol };
        }
        if (src.dimension === tgt.dimension && (src.dimension === 'MASS' || src.dimension === 'VOLUME')) {
            const baseValue = dto.quantity * src.factor;
            const convertedQuantity = baseValue / tgt.factor;
            return { convertedQuantity, targetUnit: tgt.symbol, sourceUnit: src.symbol, dimension: src.dimension };
        }
        if ((src.dimension === 'MASS' && tgt.dimension === 'VOLUME') ||
            (src.dimension === 'VOLUME' && tgt.dimension === 'MASS')) {
            if (!dto.densityKgPerL || dto.densityKgPerL <= 0) {
                throw new common_1.BadRequestException(`Cross-dimension conversion between ${src.dimension} and ${tgt.dimension} requires calibrated density (densityKgPerL > 0)`);
            }
            if (src.dimension === 'MASS') {
                const kg = dto.quantity * src.factor;
                const liters = kg / dto.densityKgPerL;
                const convertedQuantity = liters / tgt.factor;
                return { convertedQuantity, targetUnit: tgt.symbol, sourceUnit: src.symbol, densityApplied: dto.densityKgPerL };
            }
            else {
                const liters = dto.quantity * src.factor;
                const kg = liters * dto.densityKgPerL;
                const convertedQuantity = kg / tgt.factor;
                return { convertedQuantity, targetUnit: tgt.symbol, sourceUnit: src.symbol, densityApplied: dto.densityKgPerL };
            }
        }
        throw new common_1.BadRequestException(`Cannot convert between incompatible dimensions: ${src.dimension} (${src.symbol}) and ${tgt.dimension} (${tgt.symbol})`);
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogService);
