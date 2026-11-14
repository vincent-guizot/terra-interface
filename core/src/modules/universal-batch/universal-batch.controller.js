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
exports.UniversalBatchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const universal_batch_service_1 = require("./universal-batch.service");
const create_batch_dto_1 = require("./dto/create-batch.dto");
const transition_status_dto_1 = require("./dto/transition-status.dto");
const record_output_dto_1 = require("./dto/record-output.dto");
const batch_response_dto_1 = require("./dto/batch-response.dto");
const attach_detail_dto_1 = require("./dto/attach-detail.dto");
const record_event_dto_1 = require("./dto/record-event.dto");
let UniversalBatchController = class UniversalBatchController {
    constructor(batchService) {
        this.batchService = batchService;
    }
    async getBatches(domain, status) {
        return this.batchService.findAll(domain, status);
    }
    async getBatch(id) {
        return this.batchService.findOne(id);
    }
    async createBatch(body) {
        return this.batchService.create({
            ...body,
            startDate: new Date(body.startDate),
            expectedEndDate: body.expectedEndDate ? new Date(body.expectedEndDate) : undefined,
        });
    }
    async updateStatus(id, dto) {
        return this.batchService.transitionStatus(id, dto.status, dto.reason);
    }
    async recordOutput(id, body) {
        return this.batchService.addOutput(id, body);
    }
    async attachCultivation(id, dto) {
        return this.batchService.attachCultivationDetail(id, dto);
    }
    async attachLivestock(id, dto) {
        return this.batchService.attachLivestockDetail(id, dto);
    }
    async attachAquaculture(id, dto) {
        return this.batchService.attachAquacultureDetail(id, dto);
    }
    async attachBsf(id, dto) {
        return this.batchService.attachBsfDetail(id, dto);
    }
    async attachCompost(id, dto) {
        return this.batchService.attachCompostDetail(id, dto);
    }
    async recordEvent(id, dto) {
        return this.batchService.recordEvent(id, dto);
    }
    async getEvents(id) {
        return this.batchService.getEvents(id);
    }
    async getStatusHistory(id) {
        return this.batchService.getStatusHistory(id);
    }
};
exports.UniversalBatchController = UniversalBatchController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List all universal batches',
        description: 'Fetch batches across cultivation, livestock, aquaculture, and circular domains with optional filters.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'domain', required: false, enum: ['CULTIVATION', 'LIVESTOCK', 'AQUACULTURE', 'CIRCULAR'] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: universal_batch_service_1.BatchStatus }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of batches with outputs and audit logs', type: [batch_response_dto_1.BatchResponseDto] }),
    __param(0, (0, common_1.Query)('domain')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "getBatches", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get batch details by ID', description: 'Includes complete output records, events, and audit trail' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Batch details', type: batch_response_dto_1.BatchResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Batch not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "getBatch", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new universal batch',
        description: 'Creates a batch in PLANNED or ACTIVE lifecycle state and logs initialization audit event.',
    }),
    (0, swagger_1.ApiBody)({ type: create_batch_dto_1.CreateBatchDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Batch successfully registered', type: batch_response_dto_1.BatchResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_batch_dto_1.CreateBatchDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Transition universal batch lifecycle status',
        description: 'Enforces state machine: Draft -> Planned -> Active -> On Hold -> Completed / Cancelled with mandatory audit logging.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiBody)({ type: transition_status_dto_1.TransitionBatchStatusDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Batch status updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transition_status_dto_1.TransitionBatchStatusDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/outputs'),
    (0, swagger_1.ApiOperation)({
        summary: 'Record harvest or output yield for batch',
        description: 'Supports multiple harvests per batch (e.g. daily egg gathering, cut-and-come-again greens, flushes).',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiBody)({ type: record_output_dto_1.RecordBatchOutputDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Harvest record successfully logged' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, record_output_dto_1.RecordBatchOutputDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "recordOutput", null);
__decorate([
    (0, common_1.Post)(':id/detail/cultivation'),
    (0, swagger_1.ApiOperation)({ summary: 'Attach or update cultivation detail (NFT, medium, EC/pH targets)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiBody)({ type: attach_detail_dto_1.AttachCultivationDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cultivation detail saved' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attach_detail_dto_1.AttachCultivationDetailDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "attachCultivation", null);
__decorate([
    (0, common_1.Post)(':id/detail/livestock'),
    (0, swagger_1.ApiOperation)({ summary: 'Attach or update livestock detail (breed, housing, target FCR)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiBody)({ type: attach_detail_dto_1.AttachLivestockDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Livestock detail saved' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attach_detail_dto_1.AttachLivestockDetailDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "attachLivestock", null);
__decorate([
    (0, common_1.Post)(':id/detail/aquaculture'),
    (0, swagger_1.ApiOperation)({ summary: 'Attach or update aquaculture detail (species, volume, target density)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiBody)({ type: attach_detail_dto_1.AttachAquacultureDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Aquaculture detail saved' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attach_detail_dto_1.AttachAquacultureDetailDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "attachAquaculture", null);
__decorate([
    (0, common_1.Post)(':id/detail/bsf'),
    (0, swagger_1.ApiOperation)({ summary: 'Attach or update BSF detail (substrate, weight, tray count)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiBody)({ type: attach_detail_dto_1.AttachBsfDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'BSF detail saved' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attach_detail_dto_1.AttachBsfDetailDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "attachBsf", null);
__decorate([
    (0, common_1.Post)(':id/detail/compost'),
    (0, swagger_1.ApiOperation)({ summary: 'Attach or update compost detail (bay number, C:N ratio, biochar %)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiBody)({ type: attach_detail_dto_1.AttachCompostDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Compost detail saved' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attach_detail_dto_1.AttachCompostDetailDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "attachCompost", null);
__decorate([
    (0, common_1.Post)(':id/events'),
    (0, swagger_1.ApiOperation)({ summary: 'Record a typed observation, feeding, or calibration event' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiBody)({ type: record_event_dto_1.RecordBatchEventDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Event recorded' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, record_event_dto_1.RecordBatchEventDto]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "recordEvent", null);
__decorate([
    (0, common_1.Get)(':id/events'),
    (0, swagger_1.ApiOperation)({ summary: 'List chronological events for batch' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of events' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lifecycle status transition audit trail' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Batch UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of status changes' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalBatchController.prototype, "getStatusHistory", null);
exports.UniversalBatchController = UniversalBatchController = __decorate([
    (0, swagger_1.ApiTags)('Universal Batches'),
    (0, common_1.Controller)('batches'),
    __metadata("design:paramtypes", [universal_batch_service_1.UniversalBatchService])
], UniversalBatchController);
