import { getEnvOrThrow } from "./getEnvOrThrow";

const absoluteUrl = (path?: string) => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000${path}`;
  }

  if (typeof window === "undefined") {
    return `${getEnvOrThrow("BASE_URL")}${path}`;
  }

  return `${window.location.origin}${path}`;
};

export { absoluteUrl };
