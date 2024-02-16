/**
 * 和python中的range一样。包左不包右
 * @param a
 * @param b
 */
export function range(a: number, b: number): number[] {
  const res = [];
  for (let i = a; i < b; i++) {
    res.push(i);
  }
  return res;
}
