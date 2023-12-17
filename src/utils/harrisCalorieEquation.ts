import { BioData } from "@/lib/db";

const harrisCalorieEquation = ({ weight, height, gender, age }: BioData) => {
  if (gender === "MALE") {
    return 13.397 * weight + 4.799 * height + 5.677 * age + 88.362;
  } else {
    return 9.247 * weight + 9.247 * height + 4.33 * age + 447.593;
  }
};

export { harrisCalorieEquation };
