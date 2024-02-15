export const numberToRoman = (n: number): string => {
  switch (n) {
    case 1:
      return 'Ⅰ';
    case 2:
      return 'Ⅱ';
    case 3:
      return 'Ⅲ';
    case 4:
      return 'Ⅳ';
    case 5:
      return 'Ⅴ';
    case 6:
      return 'Ⅵ';
    case 7:
      return 'Ⅶ';
    case 8:
      return 'Ⅷ';
    case 9:
      return 'Ⅸ';
    case 10:
      return 'Ⅹ';
    default:
      return '?';
  }
};
