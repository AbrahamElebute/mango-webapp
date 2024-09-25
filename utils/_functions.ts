export const convertObjectToArray = <T extends Record<string, unknown>>(
  data: T
): Array<T[keyof T]> => {
  return Object.values(data) as Array<T[keyof T]>;
};
