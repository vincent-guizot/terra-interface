import * as client_1 from "@prisma/client";
export const VALID_TRANSITIONS = {
  [client_1.BatchStatus.DRAFT]: [client_1.BatchStatus.PLANNED, client_1.BatchStatus.CANCELLED],
  [client_1.BatchStatus.PLANNED]: [client_1.BatchStatus.ACTIVE, client_1.BatchStatus.CANCELLED],
  [client_1.BatchStatus.ACTIVE]: [client_1.BatchStatus.ON_HOLD, client_1.BatchStatus.COMPLETED, client_1.BatchStatus.CANCELLED],
  [client_1.BatchStatus.ON_HOLD]: [client_1.BatchStatus.ACTIVE, client_1.BatchStatus.CANCELLED],
  [client_1.BatchStatus.COMPLETED]: [],
  [client_1.BatchStatus.CANCELLED]: []
};
