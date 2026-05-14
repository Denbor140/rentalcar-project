export const getArticleCar = (img: string): string => {
  return img.match(/\/(\d+)-/)?.[1] ?? '';
};
