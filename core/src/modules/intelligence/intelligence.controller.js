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
exports.IntelligenceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const intelligence_service_1 = require("./intelligence.service");
const autonomy_response_dto_1 = require("./dto/autonomy-response.dto");
const query_assistant_dto_1 = require("./dto/query-assistant.dto");
const diagnose_plant_dto_1 = require("./dto/diagnose-plant.dto");
const apply_recommendation_dto_1 = require("./dto/apply-recommendation.dto");
let IntelligenceController = class IntelligenceController {
    constructor(intelligenceService) {
        this.intelligenceService = intelligenceService;
    }
    async getAutonomyScores() {
        return this.intelligenceService.getAutonomyScores();
    }
    async getInsights() {
        return this.intelligenceService.getInsights();
    }
    async applyRecommendation(id, dto) {
        return this.intelligenceService.applyRecommendation(id, dto.notes);
    }
    async dismissRecommendation(id) {
        return this.intelligenceService.dismissRecommendation(id);
    }
    async diagnosePlant(dto) {
        return this.intelligenceService.diagnosePlant(dto);
    }
    async processQuery(dto) {
        return this.intelligenceService.processQuery(dto);
    }
    async getForecast() {
        return this.intelligenceService.getForecast();
    }
    exportChatAudit() {
        return this.intelligenceService.exportChatAudit();
    }
};
exports.IntelligenceController = IntelligenceController;
__decorate([
    (0, common_1.Get)('autonomy'),
    (0, swagger_1.ApiOperation)({
        summary: 'Calculate food, water, and energy self-sufficiency scores',
        description: 'Computes real-time caloric, water, solar, and circularity indices along with composite homestead autonomy rating.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: autonomy_response_dto_1.AutonomyScoreResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IntelligenceController.prototype, "getAutonomyScores", null);
__decorate([
    (0, common_1.Get)('insights'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get active AI ecosystem recommendations',
        description: 'Retrieves all actionable insights and circular recommendations requiring steward attention.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of actionable recommendations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IntelligenceController.prototype, "getInsights", null);
__decorate([
    (0, common_1.Post)('insights/:id/apply'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Accept recommendation & schedule task',
        description: 'Marks an AI recommendation as APPLIED, triggering dynamic feedback loops and task automation.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Recommendation successfully applied' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, apply_recommendation_dto_1.ApplyRecommendationDto]),
    __metadata("design:returntype", Promise)
], IntelligenceController.prototype, "applyRecommendation", null);
__decorate([
    (0, common_1.Post)('insights/:id/dismiss'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Dismiss recommendation',
        description: 'Dismisses an AI recommendation from the active queue.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Recommendation dismissed' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IntelligenceController.prototype, "dismissRecommendation", null);
__decorate([
    (0, common_1.Post)('diagnose'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Plant visual deficiency diagnosis engine',
        description: 'Diagnoses probable macro/micronutrient deficiencies based on leaf zone and chlorosis pattern with organic remedies.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: diagnose_plant_dto_1.PlantDiagnosisResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [diagnose_plant_dto_1.DiagnosePlantDto]),
    __metadata("design:returntype", Promise)
], IntelligenceController.prototype, "diagnosePlant", null);
__decorate([
    (0, common_1.Post)('query'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Ask Terra AI Assistant',
        description: 'Consults the permaculture and closed-loop Home OS intelligence model regarding Vincent\'s Farm.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: query_assistant_dto_1.AssistantQueryResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_assistant_dto_1.QueryAssistantDto]),
    __metadata("design:returntype", Promise)
], IntelligenceController.prototype, "processQuery", null);
__decorate([
    (0, common_1.Get)('forecast'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get West Java microclimate & rainwater catchment forecast',
        description: 'Computes estimated precipitation, roof catchment liters, and weather mitigation advisories.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Microclimate weather forecast and catchment projection' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IntelligenceController.prototype, "getForecast", null);
__decorate([
    (0, common_1.Get)('audit'),
    (0, swagger_1.ApiOperation)({
        summary: 'Export chat audit trail',
        description: 'Returns serialized JSON history of steward interactions and AI inferences.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Serialized JSON chat audit history' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], IntelligenceController.prototype, "exportChatAudit", null);
exports.IntelligenceController = IntelligenceController = __decorate([
    (0, swagger_1.ApiTags)('Intelligence Domain'),
    (0, common_1.Controller)('intelligence'),
    __metadata("design:paramtypes", [intelligence_service_1.IntelligenceService])
], IntelligenceController);
