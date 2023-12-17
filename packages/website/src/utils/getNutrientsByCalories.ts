const getNutrientsByCalories = (calories: number) => {
  const fats = (0.28 * calories) / 9;
  const protein = (0.25 * calories) / 4;
  const carbs = (0.47 * calories) / 4;

  return { protein, fats, carbs };
};

export { getNutrientsByCalories };
