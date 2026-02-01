export type GenderFilter = "All" | "Boys" | "Girls"
export type PriceFilter = "Any" | "8k" | "10k" | "12k"
export type DistanceFilter = "Any" | "<1km" | "<3km" | "<5km"

export const PRICE_THRESHOLDS: Record<PriceFilter, number> = {
  Any: Infinity,
  "8k": 8000,
  "10k": 10000,
  "12k": 12000,
}

/** Numeric values for distance tags: <1km=1, <3km=3, <5km=5. Used for cumulative "max distance" filtering. */
export const DISTANCE_VALUES: Record<string, number> = {
  "<1km": 1,
  "<3km": 3,
  "<5km": 5,
}
