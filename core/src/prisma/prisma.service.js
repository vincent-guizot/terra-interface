"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.PrismaService = void 0;
const client_1 = require("@prisma/client");
class PrismaService extends client_1.PrismaClient {
    constructor() {
        super();
    }
    static getInstance() {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaService();
        }
        return PrismaService.instance;
    }
}
exports.PrismaService = PrismaService;
exports.prisma = PrismaService.getInstance();
