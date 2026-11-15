"use strict";

function serializeChatAudit(records) {
  return JSON.stringify({
    homestead: "Vincent's Farm (300 m²)",
    exportedAt: new Date().toISOString(),
    totalInteractions: records.length,
    auditTrail: records
  }, null, 2);
}
export { serializeChatAudit };
