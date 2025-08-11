export function getHiresCount(hires_string: string): number {
  // separate the string by commas
  const hiresArray = hires_string.split(',');
  // return the length of the array
  return hiresArray.length;
}
