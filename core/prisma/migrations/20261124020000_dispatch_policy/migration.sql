CREATE TABLE "DispatchPolicy" (
    "id" TEXT NOT NULL,
    "solarDumpMode" TEXT NOT NULL,
    "rainwaterPriority" TEXT NOT NULL,
    "batteryFloorReservePercent" DOUBLE PRECISION NOT NULL,
    "stewardName" TEXT NOT NULL,
    CONSTRAINT "DispatchPolicy_pkey" PRIMARY KEY ("id")
);
