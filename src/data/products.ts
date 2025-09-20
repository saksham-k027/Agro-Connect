
// All product images now use reliable Unsplash URLs

export const products = [
  {
    id: 1,
    name: "Organic Red Apples",
    category: "Fruits",
    price: 180,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    discount: true,
    oldPrice: 220,
    badge: "Sale",
    organic: true,
    description: "Sweet and crisp organic red apples from local orchards. Perfect for snacking, baking, or adding to salads."
  },
  {
    id: 2,
    name: "Fresh Garden Spinach",
    category: "Vegetables",
    price: 45,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Nutrient-rich organic spinach leaves, freshly harvested from our sustainable farm. Great for salads, smoothies, or cooking."
  },
  {
    id: 3,
    name: "Free Range Eggs",
    category: "Dairy",
    price: 150,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    description: "Farm-fresh eggs from free-range chickens. These eggs have bright yellow yolks and exceptional flavor."
  },
  {
    id: 4,
    name: "Heirloom Tomatoes",
    category: "Vegetables",
    price: 120,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Colorful mix of heirloom tomato varieties, each with unique flavor profiles. Perfect for salads and gourmet dishes."
  },
  {
    id: 5,
    name: "Raw Wildflower Honey",
    category: "Honey",
    price: 320,
    unit: "jar",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Pure, unfiltered wildflower honey collected from local bee farms. Rich in flavor and natural enzymes."
  },
  {
    id: 6,
    name: "Fresh Basil",
    category: "Herbs",
    price: 40,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Aromatic fresh basil with vibrant green leaves. Essential for Italian cooking, pesto, and summer salads."
  },
  {
    id: 7,
    name: "Whole Grain Bread",
    category: "Bread",
    price: 140,
    unit: "loaf",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80",
    description: "Freshly baked whole grain bread made with organic flour. Hearty and delicious with a perfect crust."
  },
  {
    id: 8,
    name: "Grass-Fed Mutton",
    category: "Meat",
    price: 450,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80",
    badge: "Premium",
    discount: true,
    oldPrice: 520,
    description: "Ethically raised grass-fed mutton from local farms. Lean, tender, and full of flavor without antibiotics or hormones."
  },
  {
    id: 9,
    name: "Organic Blueberries",
    category: "Fruits",
    price: 280,
    unit: "pint",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Sweet, plump organic blueberries packed with antioxidants. Perfect for snacking, baking, or topping cereals and yogurt."
  },
  {
    id: 10,
    name: "Artisan Goat Cheese",
    category: "Dairy",
    price: 260,
    unit: "8oz",
    image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=600&q=80",
    badge: "Local",
    description: "Creamy, tangy goat cheese made in small batches from a local dairy farm. Delicious in salads or on crackers."
  },
  {
    id: 11,
    name: "Fresh Carrots",
    category: "Vegetables",
    price: 50,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=600&q=80",
    organic: true,
    discount: true,
    oldPrice: 70,
    description: "Sweet and crunchy organic carrots with tops. Versatile for snacking, cooking, or juicing."
  },
  {
    id: 12,
    name: "Maple Syrup",
    category: "Pantry",
    price: 480,
    unit: "16oz",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Pure maple syrup harvested and produced locally. Rich amber color with complex, sweet flavor perfect for breakfast."
  },
  {
    id: 13,
    name: "Organic Lemons",
    category: "Fruits",
    price: 120,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Bright, juicy organic lemons perfect for cooking, baking, and beverages. High in vitamin C and natural citrus oils."
  },
  {
    id: 14,
    name: "Wild Salmon Fillet",
    category: "Fish",
    price: 650,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80",
    badge: "Fresh",
    description: "Premium wild-caught salmon fillet, rich in omega-3 fatty acids. Sustainably sourced and perfect for grilling or baking."
  },
  {
    id: 15,
    name: "Organic Avocados",
    category: "Fruits",
    price: 80,
    unit: "each",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Creamy, ripe organic avocados perfect for toast, salads, or guacamole. Packed with healthy fats and nutrients."
  },
  {
    id: 16,
    name: "Farm Fresh Milk",
    category: "Dairy",
    price: 120,
    unit: "half gallon",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    description: "Creamy, fresh milk from local grass-fed cows. Non-homogenized and minimally processed for maximum flavor."
  },
  {
    id: 17,
    name: "Organic Kale",
    category: "Vegetables",
    price: 80,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Superfood",
    description: "Nutrient-dense organic kale leaves, perfect for salads, smoothies, or sautéing. High in vitamins A, C, and K."
  },
  {
    id: 18,
    name: "Artisan Sourdough",
    category: "Bread",
    price: 180,
    unit: "loaf",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    description: "Traditional sourdough bread with a tangy flavor and perfect crust. Made with natural fermentation and organic flour."
  },
  {
    id: 19,
    name: "Sweet Bell Peppers",
    category: "Vegetables",
    price: 90,
    unit: "3-pack",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Colorful mix of red, yellow, and orange bell peppers. Sweet and crunchy, perfect for cooking or eating raw."
  },
  {
    id: 20,
    name: "Raw Almonds",
    category: "Nuts",
    price: 280,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Premium raw almonds, perfect for snacking or baking. Rich in healthy fats, protein, and vitamin E."
  },
  {
    id: 21,
    name: "Organic Strawberries",
    category: "Fruits",
    price: 200,
    unit: "pint",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=600&q=80",
    organic: true,
    discount: true,
    oldPrice: 250,
    badge: "Sale",
    description: "Sweet, juicy organic strawberries at peak ripeness. Perfect for desserts, smoothies, or enjoying fresh."
  },
  {
    id: 22,
    name: "Free-Range Chicken",
    category: "Meat",
    price: 320,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80",
    description: "Tender, flavorful free-range chicken raised without antibiotics or hormones. Ethically sourced from local farms."
  },
  {
    id: 23,
    name: "Organic Quinoa",
    category: "Grains",
    price: 240,
    unit: "2lb bag",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Protein-Rich",
    description: "Premium organic quinoa, a complete protein grain. Fluffy texture and nutty flavor, perfect for salads and bowls."
  },
  {
    id: 24,
    name: "Greek Yogurt",
    category: "Dairy",
    price: 180,
    unit: "32oz",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    description: "Thick, creamy Greek yogurt made from local milk. High in protein and probiotics for digestive health."
  },
  {
    id: 25,
    name: "Organic Brown Rice",
    category: "Grains",
    price: 160,
    unit: "2lb bag",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Nutty, whole grain brown rice packed with fiber and nutrients. Perfect for healthy meals and meal prep."
  },
  {
    id: 26,
    name: "Steel Cut Oats",
    category: "Grains",
    price: 180,
    unit: "32oz canister",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Heart Healthy",
    description: "Premium steel cut oats with a hearty texture and nutty flavor. Rich in fiber and perfect for breakfast."
  },
  {
    id: 27,
    name: "Organic Barley",
    category: "Grains",
    price: 130,
    unit: "1.5lb bag",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Chewy, nutritious barley perfect for soups, stews, and pilafs. High in fiber and protein."
  },
  {
    id: 28,
    name: "Wild Rice Blend",
    category: "Grains",
    price: 280,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Premium",
    description: "Exotic blend of wild and brown rice with a distinctive nutty flavor and beautiful presentation."
  },
  {
    id: 29,
    name: "Organic Bulgur Wheat",
    category: "Grains",
    price: 100,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Quick-cooking bulgur wheat, perfect for tabbouleh, pilafs, and Mediterranean dishes."
  },
  {
    id: 30,
    name: "Black Beans",
    category: "Grains",
    price: 80,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Protein-rich organic black beans, perfect for Mexican dishes, soups, and salads."
  },
  {
    id: 31,
    name: "Red Lentils",
    category: "Grains",
    price: 90,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Quick-cooking red lentils that break down beautifully in curries and soups. High in protein and fiber."
  },
  {
    id: 32,
    name: "Organic Chickpeas",
    category: "Grains",
    price: 100,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Versatile chickpeas perfect for hummus, curries, roasting, and Mediterranean cuisine."
  },
  {
    id: 33,
    name: "Organic Farro",
    category: "Grains",
    price: 220,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Ancient Grain",
    description: "Ancient grain farro with a chewy texture and nutty flavor. Perfect for grain bowls and risottos."
  },
  {
    id: 34,
    name: "Organic Millet",
    category: "Grains",
    price: 120,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Gluten-free millet with a mild, corn-like flavor. Great for porridge, pilafs, and baking."
  },
  {
    id: 35,
    name: "Organic Spelt Flour",
    category: "Grains",
    price: 200,
    unit: "2lb bag",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Ancient grain spelt flour with a nutty flavor, perfect for artisan breads and baking."
  },
  {
    id: 36,
    name: "Jasmine Rice",
    category: "Grains",
    price: 140,
    unit: "2lb bag",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    description: "Fragrant jasmine rice with a delicate floral aroma. Perfect for Asian cuisine and side dishes."
  },
  {
    id: 37,
    name: "Organic Amaranth",
    category: "Grains",
    price: 260,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Superfood",
    description: "Protein-rich amaranth grain with a slightly peppery flavor. Great for porridge and gluten-free baking."
  },
  {
    id: 38,
    name: "Organic Sweet Potatoes",
    category: "Vegetables",
    price: 70,
    unit: "2lb bag",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Sweet, creamy orange sweet potatoes packed with vitamins and antioxidants. Perfect for roasting or baking."
  },
  {
    id: 39,
    name: "Organic Broccoli",
    category: "Vegetables",
    price: 60,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Fresh organic broccoli crowns with vibrant green color. High in vitamins C and K, perfect for steaming or stir-frying."
  },
  {
    id: 40,
    name: "Organic Cauliflower",
    category: "Vegetables",
    price: 80,
    unit: "head",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Crisp white cauliflower head, versatile for roasting, mashing, or making cauliflower rice."
  },
  {
    id: 41,
    name: "Organic Brussels Sprouts",
    category: "Vegetables",
    price: 90,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Mini cabbages with a slightly bitter, nutty flavor. Delicious roasted with olive oil and seasonings."
  },
  {
    id: 42,
    name: "Organic Zucchini",
    category: "Vegetables",
    price: 80,
    unit: "2lb bag",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Tender organic zucchini perfect for grilling, baking into bread, or spiralizing into noodles."
  },
  {
    id: 43,
    name: "Organic Corn on the Cob",
    category: "Vegetables",
    price: 120,
    unit: "6-pack",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Summer Special",
    description: "Sweet, juicy corn on the cob perfect for grilling or boiling. Non-GMO and naturally sweet."
  },
  {
    id: 44,
    name: "Purple Cabbage",
    category: "Vegetables",
    price: 50,
    unit: "head",
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Vibrant purple cabbage rich in antioxidants. Great for slaws, salads, or fermented vegetables."
  },
  {
    id: 45,
    name: "Organic Asparagus",
    category: "Vegetables",
    price: 140,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Spring Harvest",
    description: "Tender spring asparagus spears with a delicate flavor. Perfect for grilling, roasting, or steaming."
  },
  {
    id: 46,
    name: "Organic Beets",
    category: "Vegetables",
    price: 80,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Earthy, sweet beets with leafy greens attached. Rich in folate and perfect for roasting or juicing."
  },
  {
    id: 47,
    name: "Organic Cucumber",
    category: "Vegetables",
    price: 60,
    unit: "3-pack",
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Crisp, refreshing cucumbers perfect for salads, pickling, or infused water."
  },
  {
    id: 48,
    name: "Organic Radishes",
    category: "Vegetables",
    price: 40,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Peppery radishes with a crisp texture. Great for salads, roasting, or as a crunchy snack."
  },
  {
    id: 49,
    name: "Organic Eggplant",
    category: "Vegetables",
    price: 90,
    unit: "each",
    image: "https://images.unsplash.com/photo-1589621316382-008455b857cd?auto=format&fit=crop&w=600&q=80",
    organic: true,
    description: "Glossy purple eggplant with creamy flesh. Perfect for Mediterranean dishes, grilling, or baba ganoush."
  },
  {
    id: 50,
    name: "Organic Mushroom Mix",
    category: "Vegetables",
    price: 180,
    unit: "8oz package",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
    organic: true,
    badge: "Gourmet",
    description: "Mix of shiitake, oyster, and cremini mushrooms. Rich umami flavor perfect for cooking and sautéing."
  }
];
