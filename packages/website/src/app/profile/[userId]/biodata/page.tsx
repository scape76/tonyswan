import { Label, Switch } from "@tonyswan/ui";
import { ProfilePageProps } from "../page";
import { BiodataForm } from "./BiodataForm";
import { auth } from "@/utils/auth/auth";
import { redirect } from "next/navigation";
import { AppRoutes } from "@/common/routes";
import { prisma } from "@tonyswan/db";
import { userBiodataLoader } from "../loaders";

export default async function BiodataPage({ params }: ProfilePageProps) {
  const session = await auth();

  if (!session?.user) redirect(AppRoutes.LOGIN);

  const data = await userBiodataLoader(session.user.id);

  return (
    <div className="px-6">
      <h1 className="text-xl md:text-3xl text-center mt-4">Your biodata</h1>
      <BiodataForm data={data} />
    </div>
  );
}
