export function serialize<T>(data: T, excludeKeys: string[] = []): string {
  const cache = new Set();

  try {
    return JSON.stringify(data, (key, value) => {
      if (excludeKeys.includes(key)) {
        return undefined;
      }
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return '[Circular]';
        }
        cache.add(value);
      }
      return value;
    });
  } catch (error) {
    console.error('Serialization error:', error);
    return '{"error": "Failed to serialize data"}';
  }
}
