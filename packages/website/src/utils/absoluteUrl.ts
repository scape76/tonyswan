import { getEnvOrThrow } from "./getEnvOrThrow";

const absoluteUrl = (path?: string) => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000${path}`;
  }

  return `${getEnvOrThrow("BASE_URL")}${path}`;
};

export { absoluteUrl };
