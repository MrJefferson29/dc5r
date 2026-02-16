/**
 * Inventory category structure for the platform.
 * Every spare part falls under one main category and (when applicable) one subcategory.
 */
export const INVENTORY_MAIN_CATEGORIES = [
  "Integra & RSX parts",
  "Honda S2000",
  "Nissan Silvia",
  "NSX",
  "Carbon fiber parts",
];

/** Subcategories per main category. Carbon fiber parts has no subcategories. */
export const SUBCATEGORIES_BY_MAIN = {
  "Integra & RSX parts": ["performance parts", "interior parts", "exterior parts"],
  "Honda S2000": ["performance parts", "interior parts", "exterior parts"],
  "Nissan Silvia": ["performance parts", "interior parts", "exterior parts"],
  "NSX": ["performance parts", "interior parts", "exterior parts"],
  "Carbon fiber parts": [],
};

/** All subcategory values used for filtering (no duplicates). */
export const ALL_SUBCATEGORIES = ["performance parts", "interior parts", "exterior parts"];

/** Check if a main category has subcategories. */
export function hasSubcategories(mainCategory) {
  const subs = SUBCATEGORIES_BY_MAIN[mainCategory];
  return Array.isArray(subs) && subs.length > 0;
}
