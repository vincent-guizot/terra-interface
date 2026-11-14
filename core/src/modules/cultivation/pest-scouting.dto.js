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
exports.organicPestFormulas = exports.PestScoutingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PestScoutingDto {
}
exports.PestScoutingDto = PestScoutingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Homestead Zone code or ID where pest was observed', example: 'Z-01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PestScoutingDto.prototype, "zoneId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identified pest or plant pathogen',
        example: 'Aphids',
        enum: ['Aphids', 'Whiteflies', 'Spider Mites', 'Fungus Gnats', 'Powdery Mildew', 'Caterpillars'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Aphids', 'Whiteflies', 'Spider Mites', 'Fungus Gnats', 'Powdery Mildew', 'Caterpillars']),
    __metadata("design:type", String)
], PestScoutingDto.prototype, "identifiedPest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Infestation severity level',
        example: 'Low',
        enum: ['Low', 'Moderate', 'Severe'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['Low', 'Moderate', 'Severe']),
    __metadata("design:type", String)
], PestScoutingDto.prototype, "infestationLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Specific plants or benches affected', example: 'NFT Gully 2 - Bok Choy' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PestScoutingDto.prototype, "affectedArea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Organic recipe or biological control recommendation', example: 'Neem Oil Emulsion spray at dusk', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PestScoutingDto.prototype, "recommendedBioControl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scouting observations and environmental notes', example: 'Cluster on underside of younger foliage', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PestScoutingDto.prototype, "notes", void 0);
exports.organicPestFormulas = {
    neemOilEmulsion: {
        recipe: '5ml Cold-pressed Neem Oil + 2ml Pure Castile Soap per 1L Rainwater',
        targets: ['Aphids', 'Whiteflies', 'Spider Mites'],
        instructions: 'Emulsify oil and soap in warm water first, spray at dusk on foliage underside every 3 days until resolved.',
    },
    horsetailDecoction: {
        recipe: '50g Dried Equisetum arvense boiled in 1L Water for 30 min (Anti-fungal silica)',
        targets: ['Powdery Mildew', 'Damping Off', 'Leaf Spot'],
        instructions: 'Strain and dilute 1:5 with rainwater, spray early morning as prophylactic cell wall strengthener.',
    },
    garlicChiliExtract: {
        recipe: '3 cloves Garlic + 2 Hot Birdseye Chillies steeped in 1L warm water + 1ml dish soap',
        targets: ['Caterpillars', 'Grasshoppers', 'Beetles'],
        instructions: 'Steep 24 hours, strain through cheesecloth. Spray heavily on perimeter foliage.',
    },
    yellowStickyTraps: {
        recipe: 'Cadmium-free yellow card coated with non-drying petroleum jelly/entomological glue',
        targets: ['Fungus Gnats', 'Whiteflies', 'Leafminers'],
        instructions: 'Place 10cm above plant canopy at high-density points.',
    },
};
