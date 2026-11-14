"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 4000;
app_1.app.listen(PORT, () => {
    console.log('================================================================');
    console.log(`🌿 Terra Interface Core Express Engine running at http://localhost:${PORT}/api/v1`);
    console.log(`📡 Health Check endpoint available at http://localhost:${PORT}/api/health`);
    console.log("   Target: Vincent's Farm (300 m² Homestead, West Java, ID)");
    console.log('================================================================');
});
