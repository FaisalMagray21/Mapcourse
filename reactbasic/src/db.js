import Dexie from "dexie";

// Create database
export const db = new Dexie("ProductDB");

// Define tables
db.version(1).stores({
  products: "++id, name, categoryId, price, quantity, description,image",
  categories: "++id, name"
});

// Seed categories if not exist
async function seedCategories() {
  const count = await db.categories.count();
  if (count === 0) {
    await db.categories.bulkAdd([
      { name: "Electronics" },
      { name: "Groceries" },
      { name: "Clothing" },
      { name: "Stationery" },
      { name: "Beverages" }
    ]);
    console.log("Categories seeded successfully!");
  }
}

seedCategories();