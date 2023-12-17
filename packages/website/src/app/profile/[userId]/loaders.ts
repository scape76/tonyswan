import { prisma } from "@tonyswan/db";

const userBiodataLoader = (userId: string) => {
  return prisma.bioData.findUnique({
    where: {
      userId,
    },
  });
};

export { userBiodataLoader };
