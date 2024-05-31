export function isNumeric(value: number) {
  if (typeof value !== 'string') return false;

  return !isNaN(value) && !isNaN(parseFloat(value));
}

export const formatPoints = (pts: number) => (Math.round(pts * 100) / 100).toFixed(2);
