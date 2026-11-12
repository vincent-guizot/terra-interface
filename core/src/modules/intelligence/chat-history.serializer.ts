export interface ChatAuditRecord {
  sessionId: string;
  stewardId: string;
  query: string;
  assistantResponse: string;
  intentCategory: string;
  timestamp: string;
}

export function serializeChatAudit(records: ChatAuditRecord[]): string {
  return JSON.stringify(
    {
      homestead: "Vincent's Farm (300 m²)",
      exportedAt: new Date().toISOString(),
      totalInteractions: records.length,
      auditTrail: records,
    },
    null,
    2
  );
}
