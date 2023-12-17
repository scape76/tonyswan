import Link from "next/link";
import { ProfilePageProps } from "../page";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { AppRoutes } from "@/common/routes";
import { userBiodataLoader } from "../loaders";
import { CaloriesChart } from "./CaloriesChart";
import { harrisCalorieEquation } from "@/utils/harrisCalorieEquation";
import { getNutrientsByCalories } from "@/utils/getNutrientsByCalories";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DietPage({ params }: ProfilePageProps) {
  const session = await auth();

  if (!session?.user) redirect(AppRoutes.LOGIN);

  const { id: userId } = session.user;

  const data = await userBiodataLoader(userId);

  const maintanceCalories = data
    ? Math.round(harrisCalorieEquation(data))
    : null;

  const nutrients = maintanceCalories
    ? getNutrientsByCalories(maintanceCalories)
    : null;

  return (
    <div className="px-4 mb-8">
      <h1 className="text-xl md:text-3xl mt-4 text-center">Track your diet</h1>
      <CaloriesChart nutrients={nutrients} />
      {maintanceCalories && (
        <Table>
          <TableCaption>Table of your calories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Goal</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead className="text-right">Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Maintance</TableCell>
              <TableCell>{maintanceCalories}</TableCell>
              <TableCell className="text-right">100%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex flex-col justify-center">
                Mid weight loss{" "}
                <span className="text-xs text-muted-foreground">
                  0.25 kg/week
                </span>
              </TableCell>
              <TableCell>
                {Math.round(maintanceCalories * (90 / 100))}
              </TableCell>
              <TableCell className="text-right">90%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex flex-col justify-center">
                Weight loss
                <span className="text-xs text-muted-foreground">
                  0.5 kg/week
                </span>
              </TableCell>
              <TableCell>
                {Math.round(maintanceCalories * (79 / 100))}
              </TableCell>
              <TableCell className="text-right">79%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      <p className="mt-6 text-lg">
        You can adjust your weight and calories
        <Link href={`/profile/${userId}/biodata`} className="ml-2 underline">
          here
        </Link>
      </p>
    </div>
  );
}
