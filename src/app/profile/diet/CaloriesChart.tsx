"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getNutrientsByCalories } from "@/utils/getNutrientsByCalories";

ChartJS.register(ArcElement, Tooltip, Legend);

function CaloriesChart({
  nutrients,
}: {
  nutrients?: ReturnType<typeof getNutrientsByCalories> | null;
}) {
  if (!nutrients) {
    return null;
  }

  const { fats, carbs, protein } = nutrients;

  return (
    <Doughnut
      className="max-h-[400px] my-4"
      data={{
        labels: ["Protein", "Fat", "Carbs"],
        datasets: [
          {
            label: "grams",
            data: [Math.round(protein), Math.round(fats), Math.round(carbs)],
            backgroundColor: ["#7e2181", "#ecaa53", "#64b6ec"],
            borderColor: ["#7e2181", "#ecaa53", "#64b6ec"],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

export { CaloriesChart };
