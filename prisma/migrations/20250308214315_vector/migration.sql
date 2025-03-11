-- CreateTable
CREATE TABLE "VectorStore" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "a_user_id" TEXT,
    "api_key" TEXT,
    "knowledge_base_id" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "VectorStore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VectorStore" ADD CONSTRAINT "VectorStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
