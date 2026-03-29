-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "scenario" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "opening" TEXT NOT NULL,
    "closing" TEXT NOT NULL,
    "politeness" TEXT NOT NULL,
    "formality" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Template_scenario_key" ON "Template"("scenario");
