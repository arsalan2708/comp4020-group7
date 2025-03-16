let index = 0;
/**
 * iterator that loops through grocery list names
 * @returns returns a name for a grocery list
 */
export function nameIteratorNext() {
    if (index < groceryListNames.length) {
        return groceryListNames[index++];
    }
    else
        index = 0;
    return groceryListNames[index++];
}
const groceryListNames = [
    "Trader Joe's Essentials",
    "Whole Foods Shopping List",
    "Saturday Morning Market",
    "Costco Bulk Buy",
    "Downtown Grocery Trip",
    "Sunday Fresh Picks",
    "Local Farmers Market Finds",
    "Whole Foods Weekly Haul",
    "April Grocery List",
    "Supermart Essentials",
    "Fresh Foods for the Week",
    "Target Grocery Run",
    "Weekly Shop at Aldi",
    "Grocery List for March 20th",
    "Fresh Finds at Walmart",
    "Midweek Grocery Stop",
    "Fresh Produce for the Week",
    "Grocery Trip to Safeway",
    "Neighborhood Grocery Stop",
];
