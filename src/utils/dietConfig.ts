const dietConfig = {
  inchesInCantimeter: 0.3937,
  poundsInKg: 2.20462262,
  inchesInFeet: 12,
};

const cantimeresToInches = (cm: number) => {
  return cm * dietConfig.inchesInCantimeter;
};

const kgsToPounds = (kgs: number) => {
  return kgs * dietConfig.poundsInKg;
};

const poundsToKgs = (pounds: number) => {
  return pounds / dietConfig.poundsInKg;
};

const feetAndInchesToCantimeters = (feet: number, inches: number) => {
  return (
    (feet * dietConfig.inchesInFeet + inches) / dietConfig.inchesInCantimeter
  );
};

export {
  kgsToPounds,
  cantimeresToInches,
  feetAndInchesToCantimeters,
  poundsToKgs,
  dietConfig,
};
