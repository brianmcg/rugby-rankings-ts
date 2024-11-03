export const isNumeric = (str: string): boolean => {
  if (typeof str !== 'string') {
    return false;
  }
  return !isNaN(parseFloat(str));
};

export const formatPoints = (pts: number): string =>
  (Math.round(pts * 100) / 100).toFixed(2);
