let index = 0;

/**
 * iterator that loops through grocery list names
 * @returns returns a name for a grocery list
 */
export function itemIteratorNext() {
  if (index < groceryItems.length) {
    return groceryItems[index++];
  } else index = 0;
  return groceryItems[index++];
}

const groceryItems = [
  "Golden Harvest Granola",
  "Purely Organic Almond Butter",
  "Mountain Valley Trail Mix",
  "Crispy Sea Salt Popcorn",
  "Sunshine Citrus Marmalade",
  "Rustic Farmhouse Bread",
  "Velvet Creamy Hummus",
  "Heritage Blend Rice",
  "Fresh Meadow Herb Dressing",
  "Wildberry Infused Jam",
  "Wholesome Grain Cereal",
  "Spicy Honey Mustard Sauce",
  "Country Fresh Yogurt",
  "Cocoa Infused Oatmeal",
  "Natural Maple Syrup",
];
