import getConfig from 'next/config';

export function getServerRuntimeEnv(
  key: string,
  defaultValue?: string
): string {
  return getConfig().serverRuntimeConfig[key as string] || defaultValue;
}

export function getRuntimeEnv(key: string, defaultValue?: string): string {
  return getConfig().publicRuntimeConfig[key as string] || defaultValue;
}
