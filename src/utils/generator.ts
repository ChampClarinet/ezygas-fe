/**
 * Generates color from input string
 * @param string input
 * @returns color hex string
 */
export const stringToColor = (string: string) => {
  let hash = 0;
  Array.from(string, char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });

  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }
  return color;
}

/**
 * Generate string params in URL from params object
 * @param params params object
 * @returns string params
 */
export const paramsObjectToString = (params: object) => (
  Object.keys(params).reduce((str, key, i) => {
    const item = (params as any)[key];
    str += `${i === 0 ? '' : '&'}${key}=${item == null ? 'null' : item}`;
    return str;
  }, '?')
);