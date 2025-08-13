export function getHiresCount(hires_string: string): number {
  // separate the string by commas
  const hiresArray = hires_string
    .split(',')
    // filter out any empty strings
    .filter((value) => value.trim() !== '');
  // return the length of the array
  return hiresArray.length;
}
