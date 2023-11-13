function getEnvOrThrow(name: string) {
  const variable =
    process.env[name] ??
    process.env[`NX_${name}`] ??
    process.env[`NEXT_PUBLIC_${name}`];

  if (!variable) {
    throw new Error(`${name} VARIABLE IS NOT SET!`);
  }

  return variable;
}

export { getEnvOrThrow };
