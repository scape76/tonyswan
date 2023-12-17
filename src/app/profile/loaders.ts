import { prisma } from "@/lib/db";

const userBiodataLoader = (userId: string) => {
  return prisma.bioData.findUnique({
    where: {
      userId,
    },
  });
};

export { userBiodataLoader };
