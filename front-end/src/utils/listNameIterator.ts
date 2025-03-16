let index = 0;

/**
 * iterator that loops through grocery list names
 * @returns returns a name for a grocery list
 */
export function nameIteratorNext() {
  if (index < groceryListNames.length) {
    return groceryListNames[index++];
  } else index = 0;
  return groceryListNames[index++];
}

const groceryListNames = [
  "TJ's Essentials",
  "Whole Foods List",
  "Saturday Market",
  "Costco Bulk Buy",
  "Downtown Trip",
  "Sunday Picks",
  "Farmers Market",
  "Whole Foods Haul",
  "April Grocery",
  "Supermart List",
  "Fresh Foods Week",
  "Target Run",
  "Aldi Weekly Shop",
  "March 20th List",
  "Walmart Finds",
  "Midweek Stop",
  "Fresh Produce",
  "Safeway Trip",
  "Neighborhood Stop",
];
