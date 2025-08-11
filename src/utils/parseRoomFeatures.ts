interface ParsedRoomFeatures {
  size: string;
  bedType: string;
  view: string;
  occupancy: string;
  tv?: string;
  bath?: string;
}

export function parseRoomFeatures(
  longDescription: string,
  amenities: string[]
): ParsedRoomFeatures {
  // 1. Extract room size
  const sizeMatch = longDescription.match(/(\d+)-sq-foot/);
  const size = sizeMatch ? `${sizeMatch[1]} sq ft` : 'Unknown size';

  // 2. Extract bed type
  const bedMatch = longDescription.match(/<strong>(.*?)<\/strong>/);
  const bedType = bedMatch ? bedMatch[1] : 'Unknown bed type';

  // 3. Extract view
  const viewMatch = longDescription.match(/room with (.*?)<\/p>/);
  const view = viewMatch ? viewMatch[1].trim() : 'Unknown view';

  // 4. Infer occupancy based on bed type
  const lowerBed = bedType.toLowerCase();
  let occupancy = 'Sleeps 2';
  if (lowerBed.includes('2 twin') || lowerBed.includes('2 double')) {
    occupancy = 'Sleeps 2';
  } else if (lowerBed.includes('1 king') && lowerBed.includes('sofa')) {
    occupancy = 'Sleeps 3–4';
  } else if (lowerBed.includes('1 king') || lowerBed.includes('1 double')) {
    occupancy = 'Sleeps 2';
  } else if (lowerBed.includes('or')) {
    occupancy = 'Sleeps 3';
  }

  // 5. TV size (e.g., "55-inch LCD TV")
  const tvMatch = longDescription.match(/(\d{2,})-inch LCD TV/);
  const tv = tvMatch ? `${tvMatch[1]}-inch TV` : undefined;

  // 6. Bath/shower check from amenities
  const hasBath = amenities.some(
    (a) => a.toLowerCase().includes('bathtub') || a.toLowerCase().includes('shower')
  );
  const bath = hasBath ? 'Private bath' : undefined;

  return {
    size,
    bedType,
    view,
    occupancy,
    tv,
    bath,
  };
}
