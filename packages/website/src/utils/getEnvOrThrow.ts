function getEnvOrThrow(name: string) {
  const env = process.env[name];
  
  if (!env) {
    throw new Error(`${name} VARIABLE IS NOT SET!`);
  }

  return env;
}

export { getEnvOrThrow };
