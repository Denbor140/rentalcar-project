export interface PriceRange {
  min: number;
  max: number;
}

export const generatePriceOptions = ({ min, max }: PriceRange): string[] => {
  const step = 10;
  const options: string[] = [];

  for (let i = min; i <= max; i += step) {
    options.push(String(i));
  }

  return options;
};
