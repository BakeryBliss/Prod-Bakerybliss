export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface CustomizationOption {
  id: string;
  label: string;
  priceModifier: number;
}

export interface Ingredient {
  name: string;
  allergen: boolean;
}

export interface NutritionInfo {
  servingSize: string;
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
  sugar: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  inStock: boolean;
  images: ProductImage[];
  sizes: CustomizationOption[];
  flavors: CustomizationOption[];
  ingredients: Ingredient[];
  nutrition: NutritionInfo;
  detailedDescription: string;
  subcategory?: string;
  tags?: string[];
  isNew?: boolean;
  isPopular?: boolean;
  isVegan?: boolean;
  allergens?: string[];
}

export interface CustomizationOption {
  id: string;
  label: string;
  priceModifier: number;
}

export interface Ingredient {
  name: string;
  allergen: boolean;
}

export interface NutritionInfo {
  servingSize: string;
  calories: number;
  fat: string;
  carbs: string;
  protein: string;
  sugar: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Choco Chip Truffle Cake',
    price: 414,
    originalPrice: 497,
    rating: 4.8,
    reviewCount: 124,
    description: 'Delicious chocolate cake with rich truffle filling and choco chip toppings. Perfect for chocolate lovers seeking indulgence.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/choco-chip-truffle-cake.jpg',
        alt: 'Choco Chip Truffle Cake with rich chocolate layers'
      },
      {
        id: 'img2',
        url: '/assets/images/choco-chip-truffle-cake.jpg',
        alt: 'Close-up of Choco Chip Truffle Cake showing chocolate chips'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 100 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 200 }
    ],
    flavors: [
      { id: 'chocolate', label: 'Dark Chocolate', priceModifier: 0 },
      { id: 'milk-chocolate', label: 'Milk Chocolate', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Milk', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (100g)',
      calories: 380,
      fat: '22g',
      carbs: '42g',
      protein: '6g',
      sugar: '28g'
    },
    detailedDescription: 'Indulge in our signature Choco Chip Truffle Cake, a decadent masterpiece that combines the richness of dark chocolate with crunchy chocolate chips. Each layer is carefully crafted with premium cocoa and fresh cream, creating a moist, fluffy texture that melts in your mouth. The truffle filling adds an extra layer of luxurious chocolate flavor that will satisfy even the most discerning chocolate connoisseur.',
    subcategory: 'Truffle Cakes',
    tags: ['Vegetarian', 'Chocolate', 'Birthday'],
    isPopular: true,
    allergens: ['Gluten', 'Dairy', 'Chocolate']
  },
  {
    id: '2',
    name: 'Classic Black Forest Cake',
    price: 746,
    rating: 4.9,
    reviewCount: 89,
    description: 'Traditional German Black Forest Cake with layers of chocolate sponge, cherries, and whipped cream.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Class-black-forest-cake.jpg',
        alt: 'Classic Black Forest Cake with chocolate and cherries'
      },
      {
        id: 'img2',
        url: '/assets/images/Class-black-forest-cake.jpg',
        alt: 'Traditional Black Forest Cake cross-section'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 150 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 300 }
    ],
    flavors: [
      { id: 'traditional', label: 'Traditional', priceModifier: 0 },
      { id: 'extra-cherries', label: 'Extra Cherries', priceModifier: 75 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Cherries', allergen: false },
      { name: 'Whipped Cream', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (120g)',
      calories: 420,
      fat: '25g',
      carbs: '48g',
      protein: '7g',
      sugar: '32g'
    },
    detailedDescription: 'Experience the timeless elegance of our Classic Black Forest Cake, inspired by the traditional German Schwarzwälder Kirschtorte. This multi-layered masterpiece features moist chocolate sponge cake alternating with layers of fresh whipped cream and tart Morello cherries. Each cake is hand-decorated with chocolate shavings and maraschino cherries, creating a visual and culinary delight that has been pleasing palates for generations.',
    subcategory: 'Black Forest Cakes',
    tags: ['Vegetarian', 'Chocolate', 'Birthday'],
    isPopular: true,
    allergens: ['Gluten', 'Dairy', 'Chocolate']
  },
  {
    id: '3',
    name: 'Choco Ferrero Birthday Drip Cake',
    price: 290,
    originalPrice: 373,
    rating: 4.7,
    reviewCount: 156,
    description: 'Stunning birthday cake with Ferrero Rocher chocolates and chocolate drip decoration.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Choco-Ferrero-Birthday-Drip-Cake.jpg',
        alt: 'Choco Ferrero Birthday Drip Cake with Ferrero Rocher decorations'
      },
      {
        id: 'img2',
        url: '/assets/images/Choco-Ferrero-Birthday-Drip-Cake.jpg',
        alt: 'Birthday drip cake with chocolate ganache'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 120 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 240 }
    ],
    flavors: [
      { id: 'ferrero', label: 'Ferrero Rocher', priceModifier: 0 },
      { id: 'nutella', label: 'Nutella Filling', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Ferrero Rocher', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (110g)',
      calories: 450,
      fat: '28g',
      carbs: '52g',
      protein: '8g',
      sugar: '35g'
    },
    detailedDescription: 'Make birthdays unforgettable with our Choco Ferrero Birthday Drip Cake. This showstopper features rich chocolate cake layered with Nutella and Ferrero Rocher pieces, topped with smooth chocolate ganache that drips elegantly down the sides. Each cake is decorated with whole Ferrero Rocher chocolates and edible gold dust for that extra special touch. Perfect for celebrating life\'s special moments with loved ones.'
  },
  {
    id: '4',
    name: 'Whipped Cream Pineapple Cake',
    price: 2739,
    rating: 4.9,
    reviewCount: 203,
    description: 'Light and fluffy cake with fresh pineapple chunks and whipped cream frosting.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Whipped-Cream-Pineapple-Cake.jpg',
        alt: 'Whipped Cream Pineapple Cake with fresh pineapple toppings'
      },
      {
        id: 'img2',
        url: '/assets/images/Whipped-Cream-Pineapple-Cake.jpg',
        alt: 'Pineapple cake with whipped cream layers'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 500 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 1000 }
    ],
    flavors: [
      { id: 'pineapple', label: 'Fresh Pineapple', priceModifier: 0 },
      { id: 'mixed-fruit', label: 'Mixed Tropical Fruits', priceModifier: 150 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Pineapple', allergen: false },
      { name: 'Whipped Cream', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (130g)',
      calories: 380,
      fat: '18g',
      carbs: '55g',
      protein: '6g',
      sugar: '38g'
    },
    detailedDescription: 'Transport yourself to a tropical paradise with our Whipped Cream Pineapple Cake. This refreshing delight features light vanilla sponge cake layered with fresh pineapple chunks and stabilized whipped cream. Each bite offers the perfect balance of sweet, tangy pineapple and creamy frosting. The cake is decorated with fresh pineapple slices and edible flowers for a vibrant, tropical presentation that\'s perfect for summer celebrations.'
  },
  {
    id: '5',
    name: 'Strawberry Affair Cake',
    price: 497,
    rating: 4.8,
    reviewCount: 167,
    description: 'Romantic cake filled with fresh strawberries and cream cheese frosting.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Strawberry-Affair-Cake.jpg',
        alt: 'Strawberry Affair Cake with fresh strawberry decorations'
      },
      {
        id: 'img2',
        url: '/assets/images/Strawberry-Affair-Cake.jpg',
        alt: 'Strawberry cake with cream cheese layers'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 120 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 240 }
    ],
    flavors: [
      { id: 'strawberry', label: 'Fresh Strawberry', priceModifier: 0 },
      { id: 'mixed-berries', label: 'Mixed Berries', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Strawberries', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (115g)',
      calories: 340,
      fat: '16g',
      carbs: '48g',
      protein: '5g',
      sugar: '35g'
    },
    detailedDescription: 'Fall in love with our Strawberry Affair Cake, a romantic masterpiece that celebrates the sweet, juicy essence of fresh strawberries. Tender vanilla cake layers are filled with strawberry compote and cream cheese frosting, topped with fresh strawberry halves and edible flowers. Each cake is made with seasonal strawberries for optimal flavor and natural color. Perfect for anniversaries, Valentine\'s Day, or simply celebrating the joy of fresh berries.'
  },
  {
    id: '6',
    name: 'Crunchy Choco KitKat Cake',
    price: 580,
    rating: 4.6,
    reviewCount: 98,
    description: 'Fun and crunchy cake made with KitKat bars and chocolate wafer pieces.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Crunchy-Choco-KitKat-Cake.jpg',
        alt: 'Crunchy Choco KitKat Cake with KitKat bar decorations'
      },
      {
        id: 'img2',
        url: '/assets/images/Crunchy-Choco-KitKat-Cake.jpg',
        alt: 'KitKat cake with chocolate wafer layers'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 150 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 300 }
    ],
    flavors: [
      { id: 'kitkat', label: 'Classic KitKat', priceModifier: 0 },
      { id: 'dark-kitkat', label: 'Dark KitKat', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'KitKat Chocolate', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (125g)',
      calories: 460,
      fat: '26g',
      carbs: '58g',
      protein: '8g',
      sugar: '42g'
    },
    detailedDescription: 'Satisfy your chocolate cravings with our Crunchy Choco KitKat Cake, a fun and indulgent treat that brings together the iconic crunch of KitKat bars with rich chocolate cake. Each layer is embedded with crushed KitKat pieces and chocolate wafers, creating delightful texture in every bite. The cake is topped with whole KitKat bars and chocolate ganache for that extra crunch factor. Perfect for kids\' parties, birthdays, or any celebration that calls for chocolatey fun.'
  },
  {
    id: '7',
    name: 'KitKat Bars Cake',
    price: 2407,
    rating: 4.9,
    reviewCount: 145,
    description: 'Massive cake covered with KitKat bars arranged in a decorative pattern.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/KitKat-Bars-Cake.jpg',
        alt: 'KitKat Bars Cake covered with KitKat chocolate bars'
      },
      {
        id: 'img2',
        url: '/assets/images/KitKat-Bars-Cake.jpg',
        alt: 'Large KitKat cake with decorative bar arrangement'
      }
    ],
    sizes: [
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 0 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 400 },
      { id: 'extra-large', label: 'Extra Large (12 inch)', priceModifier: 800 }
    ],
    flavors: [
      { id: 'kitkat', label: 'Classic KitKat', priceModifier: 0 },
      { id: 'variety', label: 'KitKat Variety Pack', priceModifier: 200 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'KitKat Chocolate', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (140g)',
      calories: 520,
      fat: '32g',
      carbs: '65g',
      protein: '9g',
      sugar: '48g'
    },
    detailedDescription: 'Make a grand statement with our KitKat Bars Cake, a spectacular centerpiece that combines the beloved crunch of KitKat bars with premium chocolate cake. This impressive dessert features chocolate cake covered with meticulously arranged KitKat bars, creating a unique textured surface that\'s as fun to look at as it is to eat. Inside, find layers of chocolate cake with KitKat pieces and chocolate ganache. Ideal for large celebrations, corporate events, or when you want to impress with chocolate extravagance.'
  },
  {
    id: '8',
    name: 'Glazed German Black Forest Cake',
    price: 1079,
    rating: 4.7,
    reviewCount: 234,
    description: 'Authentic German-style Black Forest Cake with cherry glaze and chocolate shavings.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Glazed-German-Black-Forest-Cake.jpg',
        alt: 'Glazed German Black Forest Cake with cherry glaze'
      },
      {
        id: 'img2',
        url: '/assets/images/Glazed-German-Black-Forest-Cake.jpg',
        alt: 'Authentic Black Forest Cake with traditional decorations'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 200 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 400 }
    ],
    flavors: [
      { id: 'german', label: 'Authentic German', priceModifier: 0 },
      { id: 'kirsch', label: 'Kirsch Cherry', priceModifier: 120 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Cherries', allergen: false },
      { name: 'Kirsch Liqueur', allergen: false },
      { name: 'Whipped Cream', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (135g)',
      calories: 480,
      fat: '28g',
      carbs: '55g',
      protein: '8g',
      sugar: '38g'
    },
    detailedDescription: 'Experience authentic German craftsmanship with our Glazed German Black Forest Cake. This traditional Schwarzwälder Kirschtorte features layers of moist chocolate sponge cake soaked in kirsch liqueur, alternating with whipped cream and Morello cherries. The cake is finished with a glossy cherry glaze and chocolate shavings for an authentic presentation. Each bite captures the perfect balance of chocolate, cherry, and cream that has made this cake a German classic for generations.'
  },
  {
    id: '9',
    name: 'Red Velvet Cream Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic red velvet cake with smooth cream cheese frosting.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Red-Velvet-Cream-Cake.jpg',
        alt: 'Red Velvet Cream Cake with cream cheese frosting'
      },
      {
        id: 'img2',
        url: '/assets/images/Red-Velvet-Cream-Cake.jpg',
        alt: 'Classic red velvet cake slice'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 100 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 200 }
    ],
    flavors: [
      { id: 'classic', label: 'Classic Red Velvet', priceModifier: 0 },
      { id: 'marble', label: 'Red Velvet Marble', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Red Food Coloring', allergen: false }
    ],
    nutrition: {
      servingSize: '1 slice (105g)',
      calories: 360,
      fat: '20g',
      carbs: '45g',
      protein: '6g',
      sugar: '32g'
    },
    detailedDescription: 'Delight in the timeless elegance of our Red Velvet Cream Cake. This Southern classic features tender red velvet cake with its signature slight chocolate flavor, topped with smooth cream cheese frosting. The natural red color comes from beets, and each layer is perfectly moist and fluffy. Decorated with cream cheese frosting roses and edible pearls, this cake is perfect for weddings, anniversaries, or any special occasion that deserves a touch of Southern charm.'
  },
  {
    id: '10',
    name: 'Classic Red Velvet Cream Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Traditional red velvet cake with classic cream cheese frosting and elegant decoration.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Red-Velvet-Cream-Cake.jpg',
        alt: 'Classic Red Velvet Cream Cake with elegant decoration'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Red-Velvet-Cream-Cake.jpg',
        alt: 'Traditional red velvet cake with cream cheese'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 100 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 200 }
    ],
    flavors: [
      { id: 'classic', label: 'Classic Red Velvet', priceModifier: 0 },
      { id: 'southern', label: 'Southern Style', priceModifier: 75 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Red Food Coloring', allergen: false }
    ],
    nutrition: {
      servingSize: '1 slice (105g)',
      calories: 360,
      fat: '20g',
      carbs: '45g',
      protein: '6g',
      sugar: '32g'
    },
    detailedDescription: 'Embrace tradition with our Classic Red Velvet Cream Cake, a Southern favorite that has been delighting taste buds for generations. The moist red velvet cake with its subtle chocolate and vanilla notes is perfectly complemented by tangy cream cheese frosting. Each cake is hand-decorated with elegant piping and fresh berries for a sophisticated presentation. Whether for a family gathering or special celebration, this cake brings the warmth of Southern hospitality to your table.'
  },
  {
    id: '11',
    name: 'Tropical Fruit n Almond Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Exotic cake combining tropical fruits with crunchy almond topping.',
    category: 'Cakes',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Tropical-Fruit-n-Almond-Cake.jpg',
        alt: 'Tropical Fruit n Almond Cake with mixed fruits'
      },
      {
        id: 'img2',
        url: '/assets/images/Tropical-Fruit-n-Almond-Cake.jpg',
        alt: 'Cake with tropical fruits and almond crunch'
      }
    ],
    sizes: [
      { id: 'small', label: 'Small (6 inch)', priceModifier: 0 },
      { id: 'medium', label: 'Medium (8 inch)', priceModifier: 100 },
      { id: 'large', label: 'Large (10 inch)', priceModifier: 200 }
    ],
    flavors: [
      { id: 'tropical', label: 'Mixed Tropical', priceModifier: 0 },
      { id: 'mango', label: 'Mango Focus', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Almonds', allergen: true },
      { name: 'Tropical Fruits', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (120g)',
      calories: 380,
      fat: '18g',
      carbs: '52g',
      protein: '8g',
      sugar: '35g'
    },
    detailedDescription: 'Escape to paradise with our Tropical Fruit n Almond Cake, a vibrant celebration of exotic flavors and textures. Light vanilla cake is layered with fresh tropical fruits like mango, pineapple, and kiwi, topped with a crunchy almond streusel. The combination of juicy fruits and nutty crunch creates a delightful contrast in every bite. Each cake is decorated with fresh fruit slices and toasted almonds for a naturally beautiful presentation perfect for summer gatherings.'
  },
  {
    id: '12',
    name: 'Red Velvet Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Individual red velvet cake served in a decorative jar with cream cheese frosting.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Red-Velvet-Jar-Cake.jpg',
        alt: 'Red Velvet Jar Cake in decorative glass jar'
      },
      {
        id: 'img2',
        url: '/assets/images/Red-Velvet-Jar-Cake.jpg',
        alt: 'Individual red velvet cake in jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'red-velvet', label: 'Classic Red Velvet', priceModifier: 0 },
      { id: 'chocolate', label: 'Chocolate Red Velvet', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 480,
      fat: '24g',
      carbs: '65g',
      protein: '7g',
      sugar: '46g'
    },
    detailedDescription: 'Enjoy the convenience and charm of our Red Velvet Jar Cake, perfect for individual servings or gifting. Layers of moist red velvet cake alternate with cream cheese frosting in a decorative glass jar. The jar format keeps the cake fresh and moist, making it ideal for picnics, parties, or personal indulgence. Each jar is beautifully decorated with red velvet crumbs and edible flowers. Perfect for those who want the full cake experience in a portable, mess-free format.'
  },
  {
    id: '13',
    name: 'Chocolate Mud Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Rich chocolate mud cake in a jar with chocolate ganache and fudge pieces.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Chocolate-Mud-Jar-Cake.jpg',
        alt: 'Chocolate Mud Jar Cake with rich chocolate layers'
      },
      {
        id: 'img2',
        url: '/assets/images/Chocolate-Mud-Jar-Cake.jpg',
        alt: 'Mud cake in decorative jar with ganache'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'dark-mud', label: 'Dark Chocolate Mud', priceModifier: 0 },
      { id: 'milk-mud', label: 'Milk Chocolate Mud', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Dark Chocolate', allergen: false },
      { name: 'Chocolate Ganache', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (220g)',
      calories: 520,
      fat: '32g',
      carbs: '58g',
      protein: '8g',
      sugar: '42g'
    },
    detailedDescription: 'Dive into decadence with our Chocolate Mud Jar Cake, where dense, fudgy chocolate cake meets rich chocolate ganache in perfect harmony. This Australian-inspired dessert features slow-baked mud cake that\'s incredibly moist and rich, layered with chocolate fudge pieces and topped with glossy ganache. The jar format ensures each layer stays distinct and moist, making it perfect for savoring over several days. Perfect for serious chocolate lovers who crave intense, velvety chocolate flavor in every spoonful.'
  },
  {
    id: '14',
    name: 'Choco Mousse Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Light and airy chocolate mousse layered with chocolate cake in a jar.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Choco-Mousse-Jar-Cake.jpg',
        alt: 'Choco Mousse Jar Cake with mousse layers'
      },
      {
        id: 'img2',
        url: '/assets/images/Choco-Mousse-Jar-Cake.jpg',
        alt: 'Chocolate mousse and cake in jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'dark-mousse', label: 'Dark Chocolate Mousse', priceModifier: 0 },
      { id: 'white-mousse', label: 'White Chocolate Mousse', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Heavy Cream', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (180g)',
      calories: 420,
      fat: '28g',
      carbs: '42g',
      protein: '6g',
      sugar: '35g'
    },
    detailedDescription: 'Experience ethereal lightness with our Choco Mousse Jar Cake, a sophisticated dessert that combines moist chocolate cake with fluffy chocolate mousse. Each jar contains alternating layers of tender chocolate cake and airy mousse made from premium chocolate and fresh cream. The mousse is stabilized to maintain its perfect texture, creating a dessert that\'s both indulgent and surprisingly light. Topped with chocolate shavings and fresh berries for an elegant finish.'
  },
  {
    id: '15',
    name: 'Blueberry Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Fresh blueberry cake with blueberry compote and cream cheese filling in a jar.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Blueberry-Jar-Cake.jpg',
        alt: 'Blueberry Jar Cake with fresh blueberries'
      },
      {
        id: 'img2',
        url: '/assets/images/Blueberry-Jar-Cake.jpg',
        alt: 'Blueberry cake layers in decorative jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'blueberry', label: 'Fresh Blueberry', priceModifier: 0 },
      { id: 'mixed-berry', label: 'Mixed Berry', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Blueberries', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (190g)',
      calories: 380,
      fat: '18g',
      carbs: '55g',
      protein: '6g',
      sugar: '38g'
    },
    detailedDescription: 'Burst into berry bliss with our Blueberry Jar Cake, where the natural sweetness of fresh blueberries shines through in every layer. Tender vanilla cake is layered with homemade blueberry compote and cream cheese filling, topped with fresh blueberries. The jar format keeps the berries fresh and prevents sogginess, ensuring each bite is perfectly moist and flavorful. A delightful summer treat that celebrates the simple joy of fresh, seasonal berries.'
  },
  {
    id: '16',
    name: 'Classic Choco Mud Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Traditional chocolate mud cake with dense, dense texture served in a jar.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Choco-Mud-Jar-Cake.jpg',
        alt: 'Classic Choco Mud Jar Cake with dense chocolate'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Choco-Mud-Jar-Cake.jpg',
        alt: 'Traditional mud cake in jar format'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'classic-mud', label: 'Classic Mud', priceModifier: 0 },
      { id: 'premium-mud', label: 'Premium Dark', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Dark Chocolate', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Cocoa Powder', allergen: false }
    ],
    nutrition: {
      servingSize: '1 jar (210g)',
      calories: 500,
      fat: '30g',
      carbs: '56g',
      protein: '7g',
      sugar: '40g'
    },
    detailedDescription: 'Master the art of indulgence with our Classic Choco Mud Jar Cake, a timeless Australian dessert that has been delighting chocolate lovers for generations. This dense, fudgy cake is slow-baked to perfection, resulting in an incredibly moist texture that borders on pudding-like. Each jar contains generous portions of mud cake topped with chocolate ganache and chocolate shavings. The jar format ensures the cake stays moist and fresh, making it perfect for make-ahead desserts.'
  },
  {
    id: '17',
    name: 'Choco Crunch Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Chocolate cake with crunchy chocolate pieces and wafer layers in a jar.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Choco-Crunch-Jar-Cake.jpg',
        alt: 'Choco Crunch Jar Cake with crunchy toppings'
      },
      {
        id: 'img2',
        url: '/assets/images/Choco-Crunch-Jar-Cake.jpg',
        alt: 'Chocolate cake with crunch elements in jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'choco-crunch', label: 'Chocolate Crunch', priceModifier: 0 },
      { id: 'cookie-crunch', label: 'Cookie Crunch', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Chocolate Wafers', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 460,
      fat: '26g',
      carbs: '58g',
      protein: '7g',
      sugar: '42g'
    },
    detailedDescription: 'Get the ultimate texture experience with our Choco Crunch Jar Cake, where smooth chocolate cake meets satisfying crunch in every bite. Layers of moist chocolate cake alternate with chocolate wafers and crunchy chocolate pieces, creating a delightful contrast of textures. Each jar is topped with more crunch elements and chocolate ganache for that extra satisfying finish. Perfect for those who love the combination of smooth and crunchy chocolate experiences.'
  },
  {
    id: '18',
    name: 'Choco Mud Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Dense chocolate mud cake with fudge pieces served in a convenient jar.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Choco-Mud-Jar-Cake.jpg',
        alt: 'Choco Mud Jar Cake with fudge pieces'
      },
      {
        id: 'img2',
        url: '/assets/images/Choco-Mud-Jar-Cake.jpg',
        alt: 'Mud cake in jar with chocolate toppings'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'mud-cake', label: 'Classic Mud', priceModifier: 0 },
      { id: 'fudge-mud', label: 'Extra Fudge', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Dark Chocolate', allergen: false },
      { name: 'Chocolate Fudge', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (215g)',
      calories: 510,
      fat: '31g',
      carbs: '57g',
      protein: '8g',
      sugar: '41g'
    },
    detailedDescription: 'Indulge in pure chocolate decadence with our Choco Mud Jar Cake, featuring dense, fudgy mud cake loaded with chocolate fudge pieces. This Australian classic is slow-baked for maximum moisture and richness, resulting in a cake that\'s almost brownie-like in texture. Each jar contains generous portions topped with more fudge pieces and chocolate ganache. The jar format keeps the cake incredibly moist and fresh, making it the perfect make-ahead dessert for any occasion.'
  },
  {
    id: '19',
    name: 'Personalised Bday Red Velvet Jar Cakes',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Customizable red velvet jar cakes perfect for birthday celebrations.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Personalised-Bday-Red-Velvet-Jar-Cakes.jpg',
        alt: 'Personalised Bday Red Velvet Jar Cakes with personalization'
      },
      {
        id: 'img2',
        url: '/assets/images/Personalised-Bday-Red-Velvet-Jar-Cakes.jpg',
        alt: 'Custom birthday jar cakes'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'birthday', label: 'Birthday Special', priceModifier: 0 },
      { id: 'anniversary', label: 'Anniversary Special', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (195g)',
      calories: 460,
      fat: '22g',
      carbs: '62g',
      protein: '7g',
      sugar: '44g'
    },
    detailedDescription: 'Make birthdays unforgettable with our Personalised Bday Red Velvet Jar Cakes, where classic red velvet meets creative customization. Each jar contains layers of moist red velvet cake with cream cheese frosting, topped with personalized decorations like edible images, custom messages, and themed toppings. The jar format makes them perfect for parties and gifting, while keeping the cake fresh and moist. Available with various personalization options to make each celebration truly special and memorable.'
  },
  {
    id: '20',
    name: 'Eggless Biscoff Cheesecake Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Delicious eggless cheesecake with Biscoff cookie crust and caramel sauce.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Eggless-Biscoff-Cheesecake-Jar-Cake.jpg',
        alt: 'Eggless Biscoff Cheesecake Jar Cake with cookie crust'
      },
      {
        id: 'img2',
        url: '/assets/images/Eggless-Biscoff-Cheesecake-Jar-Cake.jpg',
        alt: 'Biscoff cheesecake in jar format'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'biscoff', label: 'Classic Biscoff', priceModifier: 0 },
      { id: 'caramel', label: 'Extra Caramel', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Biscoff Cookies', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Caramel Sauce', allergen: false }
    ],
    nutrition: {
      servingSize: '1 jar (185g)',
      calories: 420,
      fat: '26g',
      carbs: '48g',
      protein: '6g',
      sugar: '35g'
    },
    detailedDescription: 'Satisfy your sweet tooth with our Eggless Biscoff Cheesecake Jar Cake, a delightful dessert that combines the iconic flavor of Biscoff cookies with creamy cheesecake. Each jar features a crunchy Biscoff cookie crust topped with smooth, eggless cheesecake filling and drizzled with caramel sauce. The jar format ensures perfect portioning and freshness, making it ideal for those with egg allergies or anyone who loves the warm, spiced flavor of Biscoff. A comforting treat that tastes like home-baked goodness.'
  },
  {
    id: '21',
    name: 'Caramel Cheese Verrine Cup',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Elegant verrine cup with layers of caramel, cheese cream, and biscuit.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Caramel-Cheese-Verrine-Jar-Cake.jpg',
        alt: 'Caramel Cheese Verrine Cup with layered dessert'
      },
      {
        id: 'img2',
        url: '/assets/images/Caramel-Cheese-Verrine-Jar-Cake.jpg',
        alt: 'French verrine cup dessert'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Cup', priceModifier: 0 },
      { id: 'double', label: 'Two Cups', priceModifier: 300 },
      { id: 'triple', label: 'Three Cups', priceModifier: 600 }
    ],
    flavors: [
      { id: 'caramel', label: 'Classic Caramel', priceModifier: 0 },
      { id: 'salted', label: 'Salted Caramel', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Biscuit', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Caramel Sauce', allergen: false },
      { name: 'Heavy Cream', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Butter', allergen: true }
    ],
    nutrition: {
      servingSize: '1 cup (150g)',
      calories: 380,
      fat: '24g',
      carbs: '42g',
      protein: '5g',
      sugar: '32g'
    },
    detailedDescription: 'Experience French elegance with our Caramel Cheese Verrine Cup, a sophisticated layered dessert that showcases the perfect harmony of sweet caramel and creamy cheese. Each verrine cup contains alternating layers of buttery biscuit, smooth cheese cream, and rich caramel sauce. This traditional French dessert is light yet indulgent, perfect for ending a meal on a high note. The individual cup format makes it ideal for dinner parties and elegant gatherings.'
  },
  {
    id: '22',
    name: 'Classic Red Velvet Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Traditional red velvet cake in jar format with cream cheese frosting.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Red-Velvet-Jar-Cake.jpg',
        alt: 'Classic Red Velvet Jar Cake with traditional appeal'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Red-Velvet-Jar-Cake.jpg',
        alt: 'Red velvet cake in classic jar presentation'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'classic', label: 'Classic Red Velvet', priceModifier: 0 },
      { id: 'premium', label: 'Premium Red Velvet', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 460,
      fat: '22g',
      carbs: '64g',
      protein: '7g',
      sugar: '46g'
    },
    detailedDescription: 'Relive the classic with our Classic Red Velvet Jar Cake, bringing the timeless Southern favorite to convenient jar format. Each jar contains moist red velvet cake with its signature tender crumb and subtle chocolate notes, layered with tangy cream cheese frosting. The jar keeps the cake perfectly fresh and moist, making it ideal for gifting or personal enjoyment. Decorated with red velvet crumbs and fresh berries, this dessert captures the essence of traditional red velvet in a modern, portable package.'
  },
  {
    id: '23',
    name: 'Nutella Hazelnut Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Decadent jar cake filled with Nutella and crunchy hazelnut pieces.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Nutella-Hazelnut-Jar.jpg',
        alt: 'Nutella Hazelnut Jar Cake with hazelnut toppings'
      },
      {
        id: 'img2',
        url: '/assets/images/Nutella-Hazelnut-Jar.jpg',
        alt: 'Nutella and hazelnut layered cake in jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'nutella', label: 'Classic Nutella', priceModifier: 0 },
      { id: 'gianduja', label: 'Gianduja Chocolate', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Nutella', allergen: true },
      { name: 'Hazelnuts', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (205g)',
      calories: 480,
      fat: '28g',
      carbs: '56g',
      protein: '8g',
      sugar: '42g'
    },
    detailedDescription: 'Surrender to temptation with our Nutella Hazelnut Jar Cake, where the beloved spread meets premium chocolate cake in perfect harmony. Each jar features layers of moist chocolate cake filled with generous amounts of Nutella and crunchy hazelnut pieces. The combination creates a luxurious texture experience with the smooth spread, tender cake, and satisfying nut crunch. Topped with more Nutella and toasted hazelnuts, this jar cake is a hazelnut lover\'s dream come true.'
  },
  {
    id: '24',
    name: 'Blueberry Jar Cakes',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Fresh blueberry cakes in jars, perfect for individual servings.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Blueberry-Jar-Cakes.jpg',
        alt: 'Blueberry Jar Cakes with fresh berry toppings'
      },
      {
        id: 'img2',
        url: '/assets/images/Blueberry-Jar-Cakes.jpg',
        alt: 'Multiple blueberry jar cakes'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'blueberry', label: 'Fresh Blueberry', priceModifier: 0 },
      { id: 'wild-blueberry', label: 'Wild Blueberry', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Blueberries', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (190g)',
      calories: 380,
      fat: '18g',
      carbs: '55g',
      protein: '6g',
      sugar: '38g'
    },
    detailedDescription: 'Celebrate the simple joy of fresh berries with our Blueberry Jar Cakes, where the natural sweetness of blueberries takes center stage. Each jar contains tender vanilla cake layered with homemade blueberry compote and cream cheese filling, topped with fresh blueberries. The jar format keeps the berries vibrant and prevents sogginess, ensuring each serving is as fresh as the day it was made. Perfect for summer entertaining or as a thoughtful, homemade-style gift that looks professionally crafted.'
  },
  {
    id: '25',
    name: 'Choco Chip N Fruit Jar Combo',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Delicious combination of chocolate chip cake and fresh fruits in jar format.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/choco-chips-Cruit-jar-cake-combo-jar.jpg',
        alt: 'Choco Chip N Fruit Jar Combo with mixed fruits and chocolate'
      },
      {
        id: 'img2',
        url: '/assets/images/choco-chips-Cruit-jar-cake-combo-jar.jpg',
        alt: 'Chocolate chip and fruit combination in jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'mixed-fruit', label: 'Mixed Seasonal Fruits', priceModifier: 0 },
      { id: 'tropical', label: 'Tropical Fruits', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate Chips', allergen: true },
      { name: 'Mixed Fruits', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (210g)',
      calories: 440,
      fat: '22g',
      carbs: '60g',
      protein: '7g',
      sugar: '42g'
    },
    detailedDescription: 'Experience the perfect marriage of chocolate and fruit with our Choco Chip N Fruit Jar Combo, where crunchy chocolate chips meet the freshness of seasonal fruits. Each jar features moist vanilla cake studded with chocolate chips, layered with fresh fruit compote and cream. The combination of warm chocolate and cool, juicy fruits creates a delightful contrast that\'s both comforting and refreshing. Topped with more chocolate chips and fresh fruit slices for a beautiful, appetizing presentation.'
  },
  {
    id: '26',
    name: 'Classic Chocolate Jar',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Traditional chocolate cake in jar format with rich chocolate frosting.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Chocolate-Jar-Cake.jpg',
        alt: 'Classic Chocolate Jar with rich chocolate layers'
      },
      {
        id: 'img2',
        url: '/assets/images/Chocolate-Jar-Cake.jpg',
        alt: 'Traditional chocolate cake in jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'classic', label: 'Classic Chocolate', priceModifier: 0 },
      { id: 'belgian', label: 'Belgian Chocolate', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Chocolate Frosting', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 470,
      fat: '26g',
      carbs: '58g',
      protein: '7g',
      sugar: '42g'
    },
    detailedDescription: 'Return to chocolate basics with our Classic Chocolate Jar, a timeless dessert that celebrates the pure joy of rich, traditional chocolate cake. Each jar contains layers of moist chocolate cake with chocolate frosting, topped with chocolate shavings and ganache. The jar format ensures the cake stays incredibly moist and fresh, making it perfect for savoring over time. This is chocolate cake at its most comforting and familiar, perfect for those who appreciate the classics done right.'
  },
  {
    id: '27',
    name: 'Set Of Two Custom Chocolate Jar Cakes',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Pair of customizable chocolate jar cakes with personalized decorations.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/set-of-two-custom-chocolate-jar-cakes.jpg',
        alt: 'Set Of Two Custom Chocolate Jar Cakes with personalization'
      },
      {
        id: 'img2',
        url: '/assets/images/set-of-two-custom-chocolate-jar-cakes.jpg',
        alt: 'Two custom chocolate jar cakes'
      }
    ],
    sizes: [
      { id: 'double', label: 'Two Jars', priceModifier: 0 },
      { id: 'triple', label: 'Three Jars', priceModifier: 300 },
      { id: 'four', label: 'Four Jars', priceModifier: 500 }
    ],
    flavors: [
      { id: 'custom', label: 'Custom Flavors', priceModifier: 0 },
      { id: 'assorted', label: 'Assorted Mix', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Various Fillings', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 470,
      fat: '26g',
      carbs: '58g',
      protein: '7g',
      sugar: '42g'
    },
    detailedDescription: 'Share the joy of chocolate with our Set Of Two Custom Chocolate Jar Cakes, perfect for couples, friends, or family celebrations. Each jar can be customized with different flavors, fillings, and decorations to suit individual preferences. Whether you want both jars the same or completely different, the possibilities are endless. The jar format makes them perfect for sharing special moments, and the customization options allow you to create a truly personal gift that shows you care about the details.'
  },
  {
    id: '28',
    name: 'Banoffee Jar Cake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Irresistible combination of banana, toffee, and cream in jar format.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/banoffee-jar-cake-jar.jpg',
        alt: 'Banoffee Jar Cake with banana and toffee layers'
      },
      {
        id: 'img2',
        url: '/assets/images/banoffee-jar-cake-jar.jpg',
        alt: 'Banana toffee jar cake'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'banoffee', label: 'Classic Banoffee', priceModifier: 0 },
      { id: 'salted', label: 'Salted Caramel', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Bananas', allergen: false },
      { name: 'Toffee Sauce', allergen: false },
      { name: 'Whipped Cream', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false }
    ],
    nutrition: {
      servingSize: '1 jar (195g)',
      calories: 430,
      fat: '22g',
      carbs: '58g',
      protein: '5g',
      sugar: '42g'
    },
    detailedDescription: 'Discover the irresistible charm of our Banoffee Jar Cake, a British classic that combines sweet bananas, rich toffee sauce, and fresh cream in perfect harmony. Each jar features layers of moist vanilla cake, sliced bananas, homemade toffee sauce, and stabilized whipped cream. The combination of soft banana, crunchy cake, and silky toffee creates a symphony of textures and flavors. Perfect for those who love the comforting, nostalgic taste of classic British desserts with a modern twist.'
  },
  {
    id: '29',
    name: 'Finger Licking Red Velvet Jar Cake: 2pcs',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Two pieces of delicious red velvet jar cake with finger-licking goodness.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/red-velvet-single-jar-cake-jar.jpg',
        alt: 'Finger Licking Red Velvet Jar Cake: 2pcs with tempting presentation'
      },
      {
        id: 'img2',
        url: '/assets/images/red-velvet-single-jar-cake-jar.jpg',
        alt: 'Two red velvet jar cakes'
      }
    ],
    sizes: [
      { id: 'double', label: 'Two Jars', priceModifier: 0 },
      { id: 'triple', label: 'Three Jars', priceModifier: 300 },
      { id: 'four', label: 'Four Jars', priceModifier: 500 }
    ],
    flavors: [
      { id: 'red-velvet', label: 'Classic Red Velvet', priceModifier: 0 },
      { id: 'cream-cheese', label: 'Extra Cream Cheese', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 460,
      fat: '22g',
      carbs: '64g',
      protein: '7g',
      sugar: '46g'
    },
    detailedDescription: 'Indulge in finger-licking goodness with our Finger Licking Red Velvet Jar Cake, where two perfectly portioned jars bring the irresistible Southern classic to your table. Each jar contains moist red velvet cake with tangy cream cheese frosting, topped with red velvet crumbs and fresh berries. The "finger licking" name says it all - this cake is so delicious, you won\'t want to leave a crumb behind. Perfect for sharing with a loved one or keeping both jars for yourself (we won\'t tell!).'
  },
  {
    id: '30',
    name: 'Romantic Red Velvet Anniversary Photo Jar Cakes',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Romantic anniversary jar cakes with personalized photo decorations.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/romantic-red-velvet-anniversary-jar-cakes-jar.jpg',
        alt: 'Romantic Red Velvet Anniversary Photo Jar Cakes with personalized touch'
      },
      {
        id: 'img2',
        url: '/assets/images/romantic-red-velvet-anniversary-jar-cakes-jar.jpg',
        alt: 'Anniversary photo jar cakes'
      }
    ],
    sizes: [
      { id: 'double', label: 'Two Jars', priceModifier: 0 },
      { id: 'triple', label: 'Three Jars', priceModifier: 300 },
      { id: 'four', label: 'Four Jars', priceModifier: 500 }
    ],
    flavors: [
      { id: 'romantic', label: 'Romantic Red Velvet', priceModifier: 0 },
      { id: 'celebration', label: 'Celebration Mix', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 460,
      fat: '22g',
      carbs: '64g',
      protein: '7g',
      sugar: '46g'
    },
    detailedDescription: 'Celebrate love and milestones with our Romantic Red Velvet Anniversary Photo Jar Cakes, where cherished memories meet delicious dessert. Each jar features moist red velvet cake with cream cheese frosting, decorated with edible photos of your special moments. The jar format makes these perfect for anniversary celebrations, allowing couples to enjoy a personalized treat together. Whether it\'s a wedding anniversary, dating milestone, or just a romantic gesture, these photo cakes transform ordinary desserts into extraordinary keepsakes that tell your unique love story.'
  },
  {
    id: '31',
    name: 'Twin Chocolate Mousse Jars',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Pair of luxurious chocolate mousse jars with rich, creamy texture.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/chocolate-mousse-jar-cake-jar.jpg',
        alt: 'Twin Chocolate Mousse Jars with creamy chocolate layers'
      },
      {
        id: 'img2',
        url: '/assets/images/chocolate-mousse-jar-cake-jar.jpg',
        alt: 'Two chocolate mousse jars'
      }
    ],
    sizes: [
      { id: 'double', label: 'Two Jars', priceModifier: 0 },
      { id: 'triple', label: 'Three Jars', priceModifier: 300 },
      { id: 'four', label: 'Four Jars', priceModifier: 500 }
    ],
    flavors: [
      { id: 'dark-mousse', label: 'Dark Chocolate Mousse', priceModifier: 0 },
      { id: 'milk-mousse', label: 'Milk Chocolate Mousse', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Chocolate', allergen: false },
      { name: 'Heavy Cream', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Gelatin', allergen: false }
    ],
    nutrition: {
      servingSize: '1 jar (160g)',
      calories: 380,
      fat: '28g',
      carbs: '32g',
      protein: '5g',
      sugar: '28g'
    },
    detailedDescription: 'Experience pure decadence with our Twin Chocolate Mousse Jars, where silky smooth chocolate mousse reaches new heights of luxury. Each jar contains layers of rich, airy chocolate mousse made with premium chocolate and fresh cream, stabilized to perfection for the ultimate light-yet-rich experience. The twin format makes them ideal for sharing romantic moments or special occasions. Topped with chocolate shavings and fresh berries, these mousse jars offer an elegant, sophisticated dessert experience that\'s both light and intensely chocolatey.'
  },
  {
    id: '32',
    name: 'Birthday Chocolate Jar Cakes',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Festive birthday jar cakes with chocolate decorations and celebratory flair.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/two-birthday-personalised-chocolate-jar-cakes-jar.jpg',
        alt: 'Birthday Chocolate Jar Cakes with festive decorations'
      },
      {
        id: 'img2',
        url: '/assets/images/two-birthday-personalised-chocolate-jar-cakes-jar.jpg',
        alt: 'Birthday themed jar cakes'
      }
    ],
    sizes: [
      { id: 'double', label: 'Two Jars', priceModifier: 0 },
      { id: 'triple', label: 'Three Jars', priceModifier: 300 },
      { id: 'four', label: 'Four Jars', priceModifier: 500 }
    ],
    flavors: [
      { id: 'birthday-choco', label: 'Birthday Chocolate', priceModifier: 0 },
      { id: 'celebration', label: 'Celebration Mix', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Chocolate Frosting', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 470,
      fat: '26g',
      carbs: '58g',
      protein: '7g',
      sugar: '42g'
    },
    detailedDescription: 'Make birthdays magical with our Birthday Chocolate Jar Cakes, where festive celebration meets delicious chocolate indulgence. Each jar contains moist chocolate cake with chocolate frosting, decorated with colorful sprinkles, edible glitter, and birthday-themed toppings. The jar format makes them perfect for birthday parties, allowing guests to enjoy individual portions of celebratory goodness. Available in various birthday themes and customizations for truly special celebrations.'
  },
  {
    id: '33',
    name: 'Decadent Chocolate Jar Cake Duo',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Luxurious pair of chocolate jar cakes with premium ingredients and presentation.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/decadent-chocolate-jar-cake-duo-jar.jpg',
        alt: 'Decadent Chocolate Jar Cake Duo with premium presentation'
      },
      {
        id: 'img2',
        url: '/assets/images/decadent-chocolate-jar-cake-duo-jar.jpg',
        alt: 'Two decadent chocolate jar cakes'
      }
    ],
    sizes: [
      { id: 'double', label: 'Two Jars', priceModifier: 0 },
      { id: 'triple', label: 'Three Jars', priceModifier: 300 },
      { id: 'four', label: 'Four Jars', priceModifier: 500 }
    ],
    flavors: [
      { id: 'decadent', label: 'Decadent Chocolate', priceModifier: 0 },
      { id: 'premium', label: 'Premium Belgian', priceModifier: 100 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Belgian Chocolate', allergen: false },
      { name: 'Chocolate Ganache', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (210g)',
      calories: 500,
      fat: '30g',
      carbs: '56g',
      protein: '8g',
      sugar: '44g'
    },
    detailedDescription: 'Elevate your chocolate experience with our Decadent Chocolate Jar Cake Duo, where premium ingredients meet masterful presentation. Each jar features rich chocolate cake layered with Belgian chocolate ganache and premium chocolate fillings, topped with gold-dusted chocolate shavings and fresh berries. The duo format makes them perfect for sharing special moments with someone special. Crafted with the finest Belgian chocolate and fresh cream, these jar cakes represent the pinnacle of chocolate indulgence and elegant dessert presentation.'
  },
  {
    id: '34',
    name: 'Sweet Red Velvet Jar Cake Duo',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Delicious pair of red velvet jar cakes with sweet cream cheese frosting.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/sweet-red-velvet-jar-cake-duo-jar.jpg',
        alt: 'Sweet Red Velvet Jar Cake Duo with sweet presentation'
      },
      {
        id: 'img2',
        url: '/assets/images/sweet-red-velvet-jar-cake-duo-jar.jpg',
        alt: 'Two sweet red velvet jar cakes'
      }
    ],
    sizes: [
      { id: 'double', label: 'Two Jars', priceModifier: 0 },
      { id: 'triple', label: 'Three Jars', priceModifier: 300 },
      { id: 'four', label: 'Four Jars', priceModifier: 500 }
    ],
    flavors: [
      { id: 'sweet-red', label: 'Sweet Red Velvet', priceModifier: 0 },
      { id: 'berry-red', label: 'Berry Red Velvet', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 jar (200g)',
      calories: 460,
      fat: '22g',
      carbs: '64g',
      protein: '7g',
      sugar: '46g'
    },
    detailedDescription: 'Share the sweetness with our Sweet Red Velvet Jar Cake Duo, where the classic Southern favorite comes in perfectly portioned jars for two. Each jar contains moist red velvet cake with extra sweet cream cheese frosting, topped with red velvet crumbs and fresh berries. The duo format makes them ideal for couples, friends, or anyone who wants to enjoy red velvet without leftovers. With their sweet flavor profile and charming presentation, these jar cakes bring joy and indulgence to any occasion.'
  },
  {
    id: '35',
    name: 'Belgian Chocolate Mousse Jar',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Luxurious Belgian chocolate mousse in jar format with premium quality.',
    category: 'Jar Cake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/belgian-chocolate-mousse-jar-cake-jar.jpg',
        alt: 'Belgian Chocolate Mousse Jar with premium chocolate'
      },
      {
        id: 'img2',
        url: '/assets/images/belgian-chocolate-mousse-jar-cake-jar.jpg',
        alt: 'Belgian chocolate mousse in jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'belgian-dark', label: 'Belgian Dark', priceModifier: 0 },
      { id: 'belgian-milk', label: 'Belgian Milk', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Belgian Chocolate', allergen: false },
      { name: 'Heavy Cream', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Vanilla', allergen: false }
    ],
    nutrition: {
      servingSize: '1 jar (150g)',
      calories: 380,
      fat: '30g',
      carbs: '28g',
      protein: '4g',
      sugar: '24g'
    },
    detailedDescription: 'Indulge in Belgian luxury with our Belgian Chocolate Mousse Jar, where the world\'s finest chocolate meets ethereal mousse texture. Each jar contains silky smooth mousse made with premium Belgian chocolate and fresh cream, stabilized to perfection for the ultimate light-yet-rich experience. The single jar format makes it perfect for personal indulgence or elegant entertaining. Topped with Belgian chocolate shavings and served in a decorative jar, this dessert represents the pinnacle of chocolate sophistication and European craftsmanship.'
  },
  {
    id: '36',
    name: 'Blueberry Cheesecake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Creamy blueberry cheesecake with graham cracker crust and fresh berries.',
    category: 'Cheesecake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/viscous-blueberry-cheesecake-cake.jpg',
        alt: 'Blueberry Cheesecake with fresh blueberry toppings'
      },
      {
        id: 'img2',
        url: '/assets/images/viscous-blueberry-cheesecake-cake.jpg',
        alt: 'Creamy blueberry cheesecake slice'
      }
    ],
    sizes: [
      { id: 'slice', label: 'Single Slice', priceModifier: 0 },
      { id: 'half', label: 'Half Cake', priceModifier: 400 },
      { id: 'whole', label: 'Whole Cake', priceModifier: 800 }
    ],
    flavors: [
      { id: 'blueberry', label: 'Fresh Blueberry', priceModifier: 0 },
      { id: 'wild-blueberry', label: 'Wild Blueberry', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Graham Crackers', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Blueberries', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (140g)',
      calories: 420,
      fat: '28g',
      carbs: '42g',
      protein: '8g',
      sugar: '32g'
    },
    detailedDescription: 'Savor the perfect balance of tart and sweet with our Blueberry Cheesecake, where creamy cheesecake meets the vibrant flavor of fresh blueberries. Each slice features a buttery graham cracker crust topped with smooth cream cheese filling and fresh blueberry compote. The combination of tangy cream cheese, crunchy crust, and juicy blueberries creates a symphony of textures and flavors. Perfect for those who appreciate the classic cheesecake experience elevated by the natural sweetness and color of seasonal blueberries.'
  },
  {
    id: '37',
    name: 'Biscoff Baked Cheesecake',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Rich Biscoff cheesecake with spiced cookie crust and caramel drizzle.',
    category: 'Cheesecake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/biscolicious-cheesecake-cake.jpg',
        alt: 'Biscoff Baked Cheesecake with Biscoff cookie crust'
      },
      {
        id: 'img2',
        url: '/assets/images/biscolicious-cheesecake-cake.jpg',
        alt: 'Biscoff cheesecake with caramel'
      }
    ],
    sizes: [
      { id: 'slice', label: 'Single Slice', priceModifier: 0 },
      { id: 'half', label: 'Half Cake', priceModifier: 400 },
      { id: 'whole', label: 'Whole Cake', priceModifier: 800 }
    ],
    flavors: [
      { id: 'biscoff', label: 'Classic Biscoff', priceModifier: 0 },
      { id: 'salted', label: 'Salted Caramel Biscoff', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Biscoff Cookies', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Biscoff Spread', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (150g)',
      calories: 480,
      fat: '32g',
      carbs: '48g',
      protein: '8g',
      sugar: '36g'
    },
    detailedDescription: 'Satisfy your spice craving with our Biscoff Baked Cheesecake, where the beloved spiced cookie meets creamy cheesecake perfection. Each slice features a thick Biscoff cookie crust topped with smooth cream cheese filling swirled with Biscoff spread and finished with caramel drizzle. The combination of crunchy cookies and creamy filling creates the ultimate texture experience. Perfect for spice lovers who want their cheesecake with a distinctive, caramelized cookie crunch.'
  },
  {
    id: '38',
    name: 'Blueberry Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Individual slice of blueberry cheesecake with fresh berry topping.',
    category: 'Cheesecake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/blueberry-cheese-pastry-past.jpg',
        alt: 'Blueberry Cheesecake Slice with fresh berries'
      },
      {
        id: 'img2',
        url: '/assets/images/blueberry-cheese-pastry-past.jpg',
        alt: 'Individual blueberry cheesecake slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'blueberry', label: 'Fresh Blueberry', priceModifier: 0 },
      { id: 'mixed-berry', label: 'Mixed Berry', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Graham Crackers', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Blueberries', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (140g)',
      calories: 420,
      fat: '28g',
      carbs: '42g',
      protein: '8g',
      sugar: '32g'
    },
    detailedDescription: 'Enjoy the perfect portion with our Blueberry Cheesecake Slice, where classic cheesecake meets fresh berry delight in individual portion perfection. Each slice features a buttery graham cracker crust topped with smooth cream cheese filling and generous fresh blueberry topping. The individual slice format ensures you get the perfect ratio of crust, filling, and topping. Perfect for those who want cheesecake without committing to a whole cake, or for portion control. The fresh blueberries add natural sweetness and vibrant color to this timeless dessert.'
  },
  {
    id: '39',
    name: 'Classic Oreo Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Creamy cheesecake slice with Oreo cookie crust and chocolate cookie pieces.',
    category: 'Cheesecake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/oreo-bake-cheesecake-slice-past.jpg',
        alt: 'Classic Oreo Cheesecake Slice with cookie pieces'
      },
      {
        id: 'img2',
        url: '/assets/images/oreo-bake-cheesecake-slice-past.jpg',
        alt: 'Oreo cheesecake individual slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'oreo', label: 'Classic Oreo', priceModifier: 0 },
      { id: 'double-stuf', label: 'Double Stuf Oreo', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Oreo Cookies', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (145g)',
      calories: 460,
      fat: '30g',
      carbs: '46g',
      protein: '8g',
      sugar: '34g'
    },
    detailedDescription: 'Create cookie magic with our Classic Oreo Cheesecake Slice, where America\'s favorite cookie transforms cheesecake into an irresistible treat. Each slice features a thick Oreo cookie crust topped with smooth cream cheese filling studded with crushed Oreo pieces and finished with whole Oreo cookies. The individual portion format ensures you get the perfect ratio of cookie crust to creamy filling. Perfect for Oreo fans who want their cheesecake experience elevated with that distinctive chocolate cookie crunch.'
  },
  {
    id: '40',
    name: 'Biscoff Baked Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Individual slice of Biscoff cheesecake with spiced cookie crust.',
    category: 'Cheesecake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/biscoff-baked-cheesecake-slice-past.jpg',
        alt: 'Biscoff Baked Cheesecake Slice with cookie crust'
      },
      {
        id: 'img2',
        url: '/assets/images/biscoff-baked-cheesecake-slice-past.jpg',
        alt: 'Individual Biscoff cheesecake slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'biscoff', label: 'Classic Biscoff', priceModifier: 0 },
      { id: 'lotus', label: 'Lotus Biscoff', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Biscoff Cookies', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Biscoff Spread', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (150g)',
      calories: 480,
      fat: '32g',
      carbs: '48g',
      protein: '8g',
      sugar: '36g'
    },
    detailedDescription: 'Experience spiced perfection with our Biscoff Baked Cheesecake Slice, where Belgian cookie perfection meets creamy cheesecake in individual slice format. Each slice features a thick Biscoff cookie crust topped with smooth cream cheese filling swirled with Biscoff spread and finished with caramel drizzle. The individual portion ensures you get the perfect ratio of spiced crust to creamy filling without waste. Perfect for Biscoff enthusiasts who want their favorite cookie in cheesecake form.'
  },
  {
    id: '41',
    name: 'Nutella Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Decadent cheesecake slice with Nutella filling and hazelnut crunch.',
    category: 'Cheesecake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/spongy-nutella-pastry-past.jpg',
        alt: 'Nutella Cheesecake Slice with hazelnut toppings'
      },
      {
        id: 'img2',
        url: '/assets/images/spongy-nutella-pastry-past.jpg',
        alt: 'Individual Nutella cheesecake slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'nutella', label: 'Classic Nutella', priceModifier: 0 },
      { id: 'gianduja', label: 'Gianduja Nutella', priceModifier: 90 }
    ],
    ingredients: [
      { name: 'Graham Crackers', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Nutella', allergen: true },
      { name: 'Hazelnuts', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false }
    ],
    nutrition: {
      servingSize: '1 slice (155g)',
      calories: 500,
      fat: '34g',
      carbs: '50g',
      protein: '9g',
      sugar: '38g'
    },
    detailedDescription: 'Indulge in hazelnut paradise with our Nutella Cheesecake Slice, where the world\'s favorite chocolate-hazelnut spread meets creamy cheesecake perfection. Each slice features a graham cracker crust topped with smooth cream cheese filling swirled with generous amounts of Nutella and finished with crunchy hazelnut pieces. The individual portion format ensures you get the perfect balance of crust, filling, and topping. Perfect for Nutella lovers who want their cheesecake experience transformed by the distinctive flavor and texture of roasted hazelnuts.'
  },
  {
    id: '42',
    name: 'Eggless Biscoff Cheesecake Jar',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Egg-free Biscoff cheesecake in jar format with spiced cookie crust.',
    category: 'Cheesecake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/biscofflicious-cheese-jar-delight-jar.jpg',
        alt: 'Eggless Biscoff Cheesecake Jar with cookie crust'
      },
      {
        id: 'img2',
        url: '/assets/images/biscofflicious-cheese-jar-delight-jar.jpg',
        alt: 'Eggless Biscoff cheesecake in jar'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Jar', priceModifier: 0 },
      { id: 'double', label: 'Double Jar', priceModifier: 300 },
      { id: 'triple', label: 'Triple Jar', priceModifier: 600 }
    ],
    flavors: [
      { id: 'eggless-biscoff', label: 'Eggless Biscoff', priceModifier: 0 },
      { id: 'caramel-biscoff', label: 'Caramel Biscoff', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Biscoff Cookies', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Biscoff Spread', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Cornstarch', allergen: false }
    ],
    nutrition: {
      servingSize: '1 jar (180g)',
      calories: 460,
      fat: '30g',
      carbs: '48g',
      protein: '6g',
      sugar: '34g'
    },
    detailedDescription: 'Enjoy guilt-free indulgence with our Eggless Biscoff Cheesecake Jar, where classic Biscoff flavor meets egg-free cheesecake perfection. Each jar features a thick Biscoff cookie crust topped with smooth, eggless cheesecake filling swirled with Biscoff spread and finished with caramel drizzle. The eggless recipe uses cornstarch and other stabilizers to achieve the same creamy texture without compromising on flavor. Perfect for those with egg allergies or anyone who prefers their cheesecake without eggs, while still enjoying the warm, spiced goodness of Biscoff.'
  },
  {
    id: '43',
    name: 'New York Baked Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Authentic New York-style cheesecake slice with rich, dense texture.',
    category: 'Cheesecake',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/new-york-bake-cheesecake-slice-past.jpg',
        alt: 'New York Baked Cheesecake Slice with classic style'
      },
      {
        id: 'img2',
        url: '/assets/images/new-york-bake-cheesecake-slice-past.jpg',
        alt: 'Individual New York cheesecake slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'classic-ny', label: 'Classic New York', priceModifier: 0 },
      { id: 'premium-ny', label: 'Premium New York', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Graham Crackers', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Sour Cream', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (160g)',
      calories: 480,
      fat: '35g',
      carbs: '40g',
      protein: '9g',
      sugar: '30g'
    },
    detailedDescription: 'Master the classic with our New York Baked Cheesecake Slice, bringing the Big Apple\'s most famous dessert to individual portion perfection. Each slice features a thick graham cracker crust topped with rich, dense cream cheese filling made with extra cream cheese for that signature New York texture. The individual portion format ensures you get the perfect portion of this iconic dessert. Known for its creamy richness and slight tang from sour cream, this cheesecake represents the gold standard that has made New York cheesecake famous worldwide.'
  },
  {
    id: '44',
    name: 'Classic Chocolate Truffle Pastry',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Elegant chocolate truffle pastry with rich ganache filling.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Chocolate-Truffle-Pastry.jpg',
        alt: 'Classic Chocolate Truffle Pastry with elegant design'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Chocolate-Truffle-Pastry.jpg',
        alt: 'Chocolate truffle pastry close-up'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'dark-truffle', label: 'Dark Chocolate Truffle', priceModifier: 0 },
      { id: 'milk-truffle', label: 'Milk Chocolate Truffle', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Dark Chocolate', allergen: false },
      { name: 'Heavy Cream', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Cocoa Powder', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (85g)',
      calories: 380,
      fat: '26g',
      carbs: '35g',
      protein: '5g',
      sugar: '22g'
    },
    detailedDescription: 'Indulge in sophistication with our Classic Chocolate Truffle Pastry, where French pastry artistry meets Italian truffle tradition. Each pastry features flaky puff pastry filled with rich chocolate ganache and topped with chocolate glaze. The combination of buttery, crisp pastry and smooth, intense chocolate creates an elegant dessert experience. Perfect for special occasions or when you want to treat yourself to something truly luxurious. The dark chocolate provides deep, complex flavor notes that chocolate connoisseurs will appreciate.'
  },
  {
    id: '45',
    name: 'Tropical Pineapple Pastry',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Fresh pineapple pastry with tropical flavors and flaky crust.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Tropical-Pineapple-Pastry.jpg',
        alt: 'Tropical Pineapple Pastry with fresh pineapple'
      },
      {
        id: 'img2',
        url: '/assets/images/Tropical-Pineapple-Pastry.jpg',
        alt: 'Pineapple pastry with tropical presentation'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'pineapple', label: 'Fresh Pineapple', priceModifier: 0 },
      { id: 'coconut-pineapple', label: 'Coconut Pineapple', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Pineapple', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Cinnamon', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 pastry (90g)',
      calories: 340,
      fat: '18g',
      carbs: '42g',
      protein: '4g',
      sugar: '25g'
    },
    detailedDescription: 'Transport yourself to paradise with our Tropical Pineapple Pastry, where fresh pineapple meets buttery pastry perfection. Each pastry features flaky puff pastry filled with sweet pineapple compote and topped with pineapple slices. The natural sweetness of fresh pineapple is enhanced by a hint of cinnamon, creating a delightful tropical flavor profile. Perfect for breakfast, brunch, or as a light dessert. The combination of juicy fruit and crisp pastry creates a refreshing contrast that\'s both satisfying and surprisingly light.'
  },
  {
    id: '46',
    name: 'Happy Birthday Chocolate Pastries',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Festive chocolate pastries perfect for birthday celebrations.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Happy-Birthday-Chocolate-Pastries.jpg',
        alt: 'Happy Birthday Chocolate Pastries with festive decorations'
      },
      {
        id: 'img2',
        url: '/assets/images/Happy-Birthday-Chocolate-Pastries.jpg',
        alt: 'Birthday chocolate pastries'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'birthday-choco', label: 'Birthday Chocolate', priceModifier: 0 },
      { id: 'sprinkle-choco', label: 'Sprinkle Chocolate', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Chocolate Filling', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Sprinkles', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (80g)',
      calories: 360,
      fat: '22g',
      carbs: '38g',
      protein: '5g',
      sugar: '24g'
    },
    detailedDescription: 'Make birthdays magical with our Happy Birthday Chocolate Pastries, where festive celebration meets delicious chocolate indulgence. Each pastry features flaky puff pastry filled with rich chocolate and decorated with colorful sprinkles, edible glitter, and birthday-themed toppings. The chocolate filling is perfectly balanced - not too sweet, with deep cocoa flavor. Perfect for birthday parties, allowing guests to enjoy individual portions of celebratory goodness. Available in various birthday themes and customizations for truly special celebrations.'
  },
  {
    id: '47',
    name: 'Assorted Pastry Box',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Curated selection of assorted pastries in a beautiful gift box.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Assorted-Pastry-Box.jpg',
        alt: 'Assorted Pastry Box with variety of pastries'
      },
      {
        id: 'img2',
        url: '/assets/images/Assorted-Pastry-Box.jpg',
        alt: 'Beautiful pastry assortment box'
      }
    ],
    sizes: [
      { id: 'small-box', label: 'Small Box (4 pieces)', priceModifier: 0 },
      { id: 'medium-box', label: 'Medium Box (6 pieces)', priceModifier: 400 },
      { id: 'large-box', label: 'Large Box (8 pieces)', priceModifier: 800 }
    ],
    flavors: [
      { id: 'mixed-selection', label: 'Mixed Selection', priceModifier: 0 },
      { id: 'themed-assortment', label: 'Themed Assortment', priceModifier: 120 }
    ],
    ingredients: [
      { name: 'Various Pastries', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Flour', allergen: true },
      { name: 'Various Fillings', allergen: true }
    ],
    nutrition: {
      servingSize: '1 pastry (85g avg)',
      calories: 350,
      fat: '20g',
      carbs: '40g',
      protein: '5g',
      sugar: '22g'
    },
    detailedDescription: 'Experience variety and delight with our Assorted Pastry Box, a carefully curated selection of our finest pastries in a beautiful presentation box. Each box contains a mix of classic favorites and seasonal specialties, from chocolate croissants to fruit danishes, ensuring there\'s something for every taste preference. The assortment includes both sweet and savory options, all freshly baked that morning. Perfect for gifting, corporate events, or when you want to sample our full range of pastry excellence. Each pastry is individually wrapped to maintain freshness and quality.'
  },
  {
    id: '48',
    name: 'Classic Butterscotch Pastry',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Traditional butterscotch pastry with caramelized sugar and butter.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Butterscotch-Pastry.jpg',
        alt: 'Classic Butterscotch Pastry with golden caramel'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Butterscotch-Pastry.jpg',
        alt: 'Butterscotch pastry close-up'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'classic-butterscotch', label: 'Classic Butterscotch', priceModifier: 0 },
      { id: 'salted-butterscotch', label: 'Salted Butterscotch', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Brown Sugar', allergen: false },
      { name: 'Cream', allergen: true },
      { name: 'Vanilla', allergen: false },
      { name: 'Salt', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (85g)',
      calories: 380,
      fat: '24g',
      carbs: '38g',
      protein: '4g',
      sugar: '28g'
    },
    detailedDescription: 'Relive nostalgic comfort with our Classic Butterscotch Pastry, where rich caramelized butter and brown sugar create pure indulgence. Each pastry features flaky puff pastry filled with homemade butterscotch sauce made from slowly caramelized butter and brown sugar. The butterscotch is cooked to perfection, creating a sauce that\'s both smooth and deeply flavorful, with notes of vanilla and a hint of salt to balance the sweetness. Perfect for those who love the comforting, caramel-like taste of traditional butterscotch in a sophisticated pastry format.'
  },
  {
    id: '49',
    name: 'Classic Red Velvet Pastry',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Red velvet pastry with cream cheese filling and chocolate notes.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Red-Velvet-Pastry.jpg',
        alt: 'Classic Red Velvet Pastry with cream cheese'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Red-Velvet-Pastry.jpg',
        alt: 'Red velvet pastry presentation'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'classic-red', label: 'Classic Red Velvet', priceModifier: 0 },
      { id: 'chocolate-red', label: 'Chocolate Red Velvet', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Red Food Coloring', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (90g)',
      calories: 370,
      fat: '22g',
      carbs: '40g',
      protein: '5g',
      sugar: '26g'
    },
    detailedDescription: 'Celebrate Southern charm with our Classic Red Velvet Pastry, bringing the beloved red velvet flavor to flaky pastry perfection. Each pastry features tender red velvet dough filled with cream cheese and topped with a light glaze. The signature subtle chocolate flavor and tangy cream cheese create a sophisticated breakfast or dessert option. Perfect for those who love red velvet but want it in a different format. The natural red color comes from careful balance of cocoa and food coloring, resulting in that distinctive red velvet appearance and flavor.'
  },
  {
    id: '50',
    name: 'Blueberry Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Cheesecake slice with blueberry topping, perfect individual portion.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Blueberry-Cheesecake-Slice.jpg',
        alt: 'Blueberry Cheesecake Slice with fresh berries'
      },
      {
        id: 'img2',
        url: '/assets/images/Blueberry-Cheesecake-Slice.jpg',
        alt: 'Cheesecake slice with blueberry topping'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'blueberry', label: 'Fresh Blueberry', priceModifier: 0 },
      { id: 'mixed-berry', label: 'Mixed Berry', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Graham Crackers', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Blueberries', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (140g)',
      calories: 420,
      fat: '28g',
      carbs: '42g',
      protein: '8g',
      sugar: '32g'
    },
    detailedDescription: 'Enjoy the best of both worlds with our Blueberry Cheesecake Slice, where classic cheesecake meets fresh berry delight in individual portion perfection. Each slice features a buttery graham cracker crust topped with smooth cream cheese filling and generous fresh blueberry topping. The individual slice format ensures you get the perfect ratio of crust, filling, and topping. Perfect for those who want cheesecake without committing to a whole cake, or for portion control. The fresh blueberries add natural sweetness and vibrant color, creating a beautiful and delicious dessert experience.'
  },
  {
    id: '51',
    name: 'Rose Tres Leches',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Elegant tres leches cake with rose flavor and traditional soaking.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Rose-Tres-Leches.jpg',
        alt: 'Rose Tres Leches with elegant rose decoration'
      },
      {
        id: 'img2',
        url: '/assets/images/Rose-Tres-Leches.jpg',
        alt: 'Rose flavored tres leches cake'
      }
    ],
    sizes: [
      { id: 'slice', label: 'Single Slice', priceModifier: 0 },
      { id: 'half', label: 'Half Cake', priceModifier: 400 },
      { id: 'whole', label: 'Whole Cake', priceModifier: 800 }
    ],
    flavors: [
      { id: 'rose', label: 'Classic Rose', priceModifier: 0 },
      { id: 'lavender-rose', label: 'Lavender Rose', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Three Milks', allergen: true },
      { name: 'Rose Water', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (130g)',
      calories: 380,
      fat: '18g',
      carbs: '52g',
      protein: '8g',
      sugar: '38g'
    },
    detailedDescription: 'Experience floral elegance with our Rose Tres Leches, where the traditional Latin American tres leches cake meets delicate rose flavor. Each slice features light vanilla sponge cake soaked in three types of milk (evaporated, condensed, and heavy cream) and infused with rose water. The result is a moist, tender cake with subtle floral notes that\'s both refreshing and indulgent. Topped with rose petals and served chilled, this dessert offers a sophisticated twist on a classic. Perfect for romantic occasions or when you want something light yet luxurious.'
  },
  {
    id: '52',
    name: 'Choco Truffle Pastry Made With KitKat',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Chocolate truffle pastry featuring KitKat bars and rich ganache.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Choco-Truffle-Pastry-Made-With-KitKat.jpg',
        alt: 'Choco Truffle Pastry Made With KitKat bars'
      },
      {
        id: 'img2',
        url: '/assets/images/Choco-Truffle-Pastry-Made-With-KitKat.jpg',
        alt: 'KitKat chocolate truffle pastry'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'kitkat-truffle', label: 'KitKat Truffle', priceModifier: 0 },
      { id: 'dark-kitkat', label: 'Dark KitKat', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'KitKat Chocolate', allergen: true },
      { name: 'Chocolate Ganache', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Cream', allergen: true }
    ],
    nutrition: {
      servingSize: '1 pastry (95g)',
      calories: 420,
      fat: '28g',
      carbs: '42g',
      protein: '6g',
      sugar: '28g'
    },
    detailedDescription: 'Combine beloved chocolate treats with pastry perfection in our Choco Truffle Pastry Made With KitKat, where the iconic wafer crunch meets rich truffle filling. Each pastry features flaky puff pastry filled with chocolate ganache and pieces of KitKat bars, topped with more KitKat pieces for that satisfying crunch. The combination of smooth chocolate truffle and crispy wafer creates an irresistible texture experience. Perfect for KitKat lovers who want their favorite chocolate bar elevated to pastry status. Each bite delivers the perfect balance of creamy truffle and crunchy wafer chocolate.'
  },
  {
    id: '53',
    name: 'Biscoff Baked Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Cheesecake slice with Biscoff crust and spiced caramel filling.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Biscoff-Baked-Cheesecake-Slice.jpg',
        alt: 'Biscoff Baked Cheesecake Slice with cookie crust'
      },
      {
        id: 'img2',
        url: '/assets/images/Biscoff-Baked-Cheesecake-Slice.jpg',
        alt: 'Biscoff cheesecake individual slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'biscoff', label: 'Classic Biscoff', priceModifier: 0 },
      { id: 'salted', label: 'Salted Caramel Biscoff', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Biscoff Cookies', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Biscoff Spread', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (150g)',
      calories: 480,
      fat: '32g',
      carbs: '48g',
      protein: '8g',
      sugar: '36g'
    },
    detailedDescription: 'Satisfy your spice craving with our Biscoff Baked Cheesecake Slice, where the beloved spiced cookie meets creamy cheesecake in individual slice format. Each slice features a thick Biscoff cookie crust topped with smooth cream cheese filling swirled with Biscoff spread and finished with caramel drizzle. The individual portion format ensures you get the perfect ratio of spiced crust to creamy filling without waste. Perfect for spice lovers who want their cheesecake with a distinctive, caramelized cookie crunch.'
  },
  {
    id: '54',
    name: 'New York Baked Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Authentic New York cheesecake slice with dense, creamy texture.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/New-York-Baked-Cheesecake-Slice.jpg',
        alt: 'New York Baked Cheesecake Slice with classic style'
      },
      {
        id: 'img2',
        url: '/assets/images/New-York-Baked-Cheesecake-Slice.jpg',
        alt: 'Individual New York cheesecake slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'classic-ny', label: 'Classic New York', priceModifier: 0 },
      { id: 'premium-ny', label: 'Premium New York', priceModifier: 90 }
    ],
    ingredients: [
      { name: 'Graham Crackers', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Sour Cream', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (160g)',
      calories: 480,
      fat: '35g',
      carbs: '40g',
      protein: '9g',
      sugar: '30g'
    },
    detailedDescription: 'Master the classic with our New York Baked Cheesecake Slice, bringing the Big Apple\'s most famous dessert to individual portion perfection. Each slice features a thick graham cracker crust topped with rich, dense cream cheese filling made with extra cream cheese for that signature New York texture. The individual portion format ensures you get the perfect portion of this iconic dessert. Known for its creamy richness and slight tang from sour cream, this cheesecake represents the gold standard that has made New York cheesecake famous worldwide.'
  },
  {
    id: '55',
    name: 'Classic Oreo Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Cheesecake slice with Oreo crust and chocolate cookie pieces throughout.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Oreo-Cheesecake-Slice.jpg',
        alt: 'Classic Oreo Cheesecake Slice with cookie pieces'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Oreo-Cheesecake-Slice.jpg',
        alt: 'Oreo cheesecake individual slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'oreo', label: 'Classic Oreo', priceModifier: 0 },
      { id: 'double-stuf', label: 'Double Stuf Oreo', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Oreo Cookies', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Chocolate', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (145g)',
      calories: 460,
      fat: '30g',
      carbs: '46g',
      protein: '8g',
      sugar: '34g'
    },
    detailedDescription: 'Create cookie magic with our Classic Oreo Cheesecake Slice, where America\'s favorite cookie transforms cheesecake into an irresistible treat. Each slice features a thick Oreo cookie crust topped with smooth cream cheese filling studded with crushed Oreo pieces and finished with whole Oreo cookies. The individual portion format ensures you get the perfect ratio of cookie crust to creamy filling. Perfect for Oreo fans who want their cheesecake experience elevated with that distinctive chocolate cookie crunch.'
  },
  {
    id: '56',
    name: 'Classic Choco Chip Pastry',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Traditional chocolate chip pastry with buttery dough and chocolate chunks.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Choco-Chip-Pastry.jpg',
        alt: 'Classic Choco Chip Pastry with chocolate chips'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Choco-Chip-Pastry.jpg',
        alt: 'Chocolate chip pastry close-up'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'milk-choco', label: 'Milk Chocolate Chips', priceModifier: 0 },
      { id: 'dark-choco', label: 'Dark Chocolate Chips', priceModifier: 60 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Chocolate Chips', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Vanilla', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (85g)',
      calories: 380,
      fat: '24g',
      carbs: '38g',
      protein: '5g',
      sugar: '22g'
    },
    detailedDescription: 'Celebrate the simple joy of chocolate chips with our Classic Choco Chip Pastry, where buttery pastry meets generous chocolate chip filling. Each pastry features flaky puff pastry filled with melted chocolate chips and topped with more chocolate chips for that signature crunch. The chocolate chips are evenly distributed throughout, ensuring chocolate in every bite. Perfect for breakfast, brunch, or as a comforting snack. The combination of warm, buttery pastry and melty chocolate creates a nostalgic treat that reminds you of homemade cookies but in elegant pastry form.'
  },
  {
    id: '57',
    name: 'Black Forest Pastry',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'German-inspired pastry with chocolate, cherries, and cream.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Black-Forest-Pastry.jpg',
        alt: 'Black Forest Pastry with chocolate and cherries'
      },
      {
        id: 'img2',
        url: '/assets/images/Black-Forest-Pastry.jpg',
        alt: 'Black Forest pastry presentation'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'traditional', label: 'Traditional Black Forest', priceModifier: 0 },
      { id: 'kirsch', label: 'Kirsch Black Forest', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Dark Chocolate', allergen: false },
      { name: 'Cherries', allergen: false },
      { name: 'Whipped Cream', allergen: true },
      { name: 'Kirsch Liqueur', allergen: false },
      { name: 'Sugar', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (95g)',
      calories: 400,
      fat: '26g',
      carbs: '42g',
      protein: '6g',
      sugar: '28g'
    },
    detailedDescription: 'Experience German tradition with our Black Forest Pastry, bringing the iconic Schwarzwälder Kirschtorte flavors to elegant pastry form. Each pastry features flaky puff pastry filled with chocolate ganache, tart cherries, and whipped cream, finished with chocolate shavings. The combination of rich chocolate, juicy cherries, and light cream creates a sophisticated dessert experience. Perfect for special occasions or when you want something classically European. The kirsch liqueur adds authentic depth, while fresh cherries provide natural sweetness and vibrant color. A timeless combination that has delighted dessert lovers for generations.'
  },
  {
    id: '58',
    name: 'Nutella Cheesecake Slice',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Cheesecake slice with Nutella filling and hazelnut crunch topping.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Nutella-Cheesecake-Slice.jpg',
        alt: 'Nutella Cheesecake Slice with hazelnut toppings'
      },
      {
        id: 'img2',
        url: '/assets/images/Nutella-Cheesecake-Slice.jpg',
        alt: 'Individual Nutella cheesecake slice'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Slice', priceModifier: 0 },
      { id: 'double', label: 'Two Slices', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Slices', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'nutella', label: 'Classic Nutella', priceModifier: 0 },
      { id: 'gianduja', label: 'Gianduja Nutella', priceModifier: 100 }
    ],
    ingredients: [
      { name: 'Graham Crackers', allergen: true },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Nutella', allergen: true },
      { name: 'Hazelnuts', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false }
    ],
    nutrition: {
      servingSize: '1 slice (155g)',
      calories: 500,
      fat: '34g',
      carbs: '50g',
      protein: '9g',
      sugar: '38g'
    },
    detailedDescription: 'Indulge in hazelnut paradise with our Nutella Cheesecake Slice, where the world\'s favorite chocolate-hazelnut spread meets creamy cheesecake perfection. Each slice features a graham cracker crust topped with smooth cream cheese filling swirled with generous amounts of Nutella and finished with crunchy hazelnut pieces. The individual portion format ensures you get the perfect balance of crust, filling, and topping. Perfect for Nutella lovers who want their cheesecake experience transformed by the distinctive flavor and texture of roasted hazelnuts.'
  },
  {
    id: '59',
    name: 'Red Velvet Anniversary Pastries',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Romantic red velvet pastries perfect for anniversary celebrations.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Red-Velvet-Anniversary-Pastries.jpg',
        alt: 'Red Velvet Anniversary Pastries with romantic design'
      },
      {
        id: 'img2',
        url: '/assets/images/Red-Velvet-Anniversary-Pastries.jpg',
        alt: 'Anniversary red velvet pastries'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'anniversary', label: 'Anniversary Red Velvet', priceModifier: 0 },
      { id: 'celebration', label: 'Celebration Red Velvet', priceModifier: 90 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Red Food Coloring', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (90g)',
      calories: 370,
      fat: '22g',
      carbs: '40g',
      protein: '5g',
      sugar: '26g'
    },
    detailedDescription: 'Celebrate love with our Red Velvet Anniversary Pastries, where romantic red velvet meets elegant pastry presentation. Each pastry features tender red velvet dough filled with cream cheese and decorated with anniversary-themed toppings like hearts, edible glitter, and personalized messages. The subtle chocolate flavor and tangy cream cheese create a sophisticated treat perfect for romantic occasions. Available with various anniversary customizations to make your celebration truly special. Perfect for sharing intimate moments or surprising your loved one with a thoughtful, delicious gesture that combines tradition with personalization.'
  },
  {
    id: '60',
    name: 'Six Pineapple Chocolate and Red Velvet Anniversary Pastries',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Assortment of six anniversary pastries with pineapple, chocolate, and red velvet.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Six-Pineapple-Chocolate-and-Red-Velvet-Anniversary-Pastries.jpg',
        alt: 'Six Pineapple Chocolate and Red Velvet Anniversary Pastries assortment'
      },
      {
        id: 'img2',
        url: '/assets/images/Six-Pineapple-Chocolate-and-Red-Velvet-Anniversary-Pastries.jpg',
        alt: 'Assorted anniversary pastry collection'
      }
    ],
    sizes: [
      { id: 'six-pack', label: 'Six Pack Assortment', priceModifier: 0 },
      { id: 'twelve-pack', label: 'Twelve Pack Assortment', priceModifier: 900 },
      { id: 'eighteen-pack', label: 'Eighteen Pack Assortment', priceModifier: 1800 }
    ],
    flavors: [
      { id: 'mixed-anniversary', label: 'Mixed Anniversary', priceModifier: 0 },
      { id: 'custom-anniversary', label: 'Custom Anniversary', priceModifier: 180 }
    ],
    ingredients: [
      { name: 'Various Pastries', allergen: true },
      { name: 'Pineapple', allergen: false },
      { name: 'Chocolate', allergen: false },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true }
    ],
    nutrition: {
      servingSize: '1 pastry (90g avg)',
      calories: 375,
      fat: '22g',
      carbs: '42g',
      protein: '5g',
      sugar: '26g'
    },
    detailedDescription: 'Create unforgettable anniversary celebrations with our Six Pineapple Chocolate and Red Velvet Anniversary Pastries, a perfectly curated assortment for romantic occasions. This collection includes pineapple pastries for tropical sweetness, rich chocolate pastries for indulgence, and red velvet pastries for classic romance - all beautifully decorated with anniversary themes. The variety ensures there\'s something for every taste preference while maintaining the celebratory spirit. Perfect for larger gatherings, corporate events, or when you want to offer your guests a memorable assortment of anniversary treats. Each pastry is individually decorated and presented for maximum visual and culinary impact.'
  },
  {
    id: '61',
    name: 'Filter Coffee Mousse Verrine Cup',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Elegant verrine cup with coffee mousse and biscuit layers.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Filter-Coffee-Mousse-Verrine-Cup.jpg',
        alt: 'Filter Coffee Mousse Verrine Cup with coffee layers'
      },
      {
        id: 'img2',
        url: '/assets/images/Filter-Coffee-Mousse-Verrine-Cup.jpg',
        alt: 'Coffee mousse verrine dessert'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Cup', priceModifier: 0 },
      { id: 'double', label: 'Two Cups', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Cups', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'filter-coffee', label: 'Filter Coffee', priceModifier: 0 },
      { id: 'espresso', label: 'Espresso', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Coffee', allergen: false },
      { name: 'Biscuit', allergen: true },
      { name: 'Heavy Cream', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Gelatin', allergen: false }
    ],
    nutrition: {
      servingSize: '1 cup (140g)',
      calories: 320,
      fat: '22g',
      carbs: '32g',
      protein: '6g',
      sugar: '24g'
    },
    detailedDescription: 'Awaken your senses with our Filter Coffee Mousse Verrine Cup, where rich South Indian filter coffee meets elegant French mousse tradition. Each verrine cup contains alternating layers of coffee-infused mousse and buttery biscuit, creating a sophisticated dessert that\'s both comforting and refined. The strong, aromatic coffee flavor is perfectly balanced with the light, airy mousse texture. Perfect for coffee lovers who want their caffeine fix in dessert form. The individual cup format makes it ideal for dinner parties, and the authentic filter coffee flavor brings a taste of South Indian coffee culture to your table.'
  },
  {
    id: '62',
    name: 'Choco Truffle N Butterscotch Pastries',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Assortment of chocolate truffle and butterscotch pastries.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Choco-Truffle-N-Butterscotch-Pastries.jpg',
        alt: 'Choco Truffle N Butterscotch Pastries assortment'
      },
      {
        id: 'img2',
        url: '/assets/images/Choco-Truffle-N-Butterscotch-Pastries.jpg',
        alt: 'Chocolate and butterscotch pastry mix'
      }
    ],
    sizes: [
      { id: 'single-each', label: 'One of Each', priceModifier: 0 },
      { id: 'double-mix', label: 'Two Mixed', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Mixed', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'assorted', label: 'Assorted Mix', priceModifier: 0 },
      { id: 'premium-assorted', label: 'Premium Assorted', priceModifier: 100 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Dark Chocolate', allergen: false },
      { name: 'Butterscotch', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Cream', allergen: true }
    ],
    nutrition: {
      servingSize: '1 pastry (90g avg)',
      calories: 395,
      fat: '25g',
      carbs: '40g',
      protein: '5g',
      sugar: '26g'
    },
    detailedDescription: 'Indulge in the best of both worlds with our Choco Truffle N Butterscotch Pastries, where rich chocolate truffle meets caramelized butterscotch in perfect pastry harmony. Each assortment includes flaky pastries filled with smooth chocolate ganache alongside butterscotch-filled pastries with their distinctive caramel flavor. The combination offers both deep, intense chocolate and sweet, buttery caramel notes. Perfect for those who can\'t decide between chocolate and butterscotch, or for sharing with friends who have different preferences. Each pastry is crafted with premium ingredients to ensure both flavors shine through beautifully.'
  },
  {
    id: '63',
    name: 'Candied Caramel Mousse',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Light mousse with candied caramel pieces and smooth texture.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Candied-Caramel-Mousse.jpg',
        alt: 'Candied Caramel Mousse with caramel pieces'
      },
      {
        id: 'img2',
        url: '/assets/images/Candied-Caramel-Mousse.jpg',
        alt: 'Caramel mousse dessert'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Serving', priceModifier: 0 },
      { id: 'double', label: 'Two Servings', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Servings', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'candied-caramel', label: 'Candied Caramel', priceModifier: 0 },
      { id: 'salted-caramel', label: 'Salted Caramel', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Heavy Cream', allergen: true },
      { name: 'Caramel Sauce', allergen: false },
      { name: 'Sugar', allergen: false },
      { name: 'Butter', allergen: true },
      { name: 'Gelatin', allergen: false },
      { name: 'Vanilla', allergen: false }
    ],
    nutrition: {
      servingSize: '1 serving (130g)',
      calories: 380,
      fat: '28g',
      carbs: '35g',
      protein: '4g',
      sugar: '32g'
    },
    detailedDescription: 'Experience caramel perfection with our Candied Caramel Mousse, where smooth, airy mousse meets delightful candied caramel pieces. Each serving features light-as-air mousse made with fresh cream and homemade caramel sauce, studded with crunchy candied caramel pieces for texture contrast. The mousse is stabilized to maintain its perfect consistency, creating a dessert that\'s both elegant and indulgent. Perfect for caramel lovers who appreciate the balance of smooth and crunchy textures. The rich, buttery caramel flavor is perfectly complemented by the light mousse base, making each spoonful a moment of pure indulgence.'
  },
  {
    id: '64',
    name: 'Square Shaped Delicious Butterscotch Pastry',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Square butterscotch pastry with rich caramel filling and buttery crust.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Square-Shaped-Delicious-Butterscotch-Pastry.jpg',
        alt: 'Square Shaped Delicious Butterscotch Pastry with caramel'
      },
      {
        id: 'img2',
        url: '/assets/images/Square-Shaped-Delicious-Butterscotch-Pastry.jpg',
        alt: 'Square butterscotch pastry'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Square', priceModifier: 0 },
      { id: 'double', label: 'Two Squares', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Squares', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'butterscotch', label: 'Classic Butterscotch', priceModifier: 0 },
      { id: 'premium-butterscotch', label: 'Premium Butterscotch', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Brown Sugar', allergen: false },
      { name: 'Cream', allergen: true },
      { name: 'Vanilla', allergen: false },
      { name: 'Salt', allergen: false }
    ],
    nutrition: {
      servingSize: '1 square (95g)',
      calories: 420,
      fat: '28g',
      carbs: '42g',
      protein: '4g',
      sugar: '30g'
    },
    detailedDescription: 'Savor the unique square shape of our Square Shaped Delicious Butterscotch Pastry, where generous portions meet rich caramel flavor. Each square features flaky puff pastry filled with homemade butterscotch sauce made from slowly caramelized butter and brown sugar. The square format provides more surface area for the rich filling, ensuring every bite is filled with butterscotch goodness. Perfect for those who love generous portions of their favorite flavors. The butterscotch is cooked to perfection, creating a sauce that\'s both smooth and deeply flavorful, with notes of vanilla and a hint of salt to balance the sweetness.'
  },
  {
    id: '65',
    name: 'Signature Assorted Pastries',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Curated selection of our signature pastries in elegant presentation.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Signature-Assorted-Pastries.jpg',
        alt: 'Signature Assorted Pastries with elegant arrangement'
      },
      {
        id: 'img2',
        url: '/assets/images/Signature-Assorted-Pastries.jpg',
        alt: 'Assorted signature pastry collection'
      }
    ],
    sizes: [
      { id: 'small-assortment', label: 'Small Assortment (4 pieces)', priceModifier: 0 },
      { id: 'medium-assortment', label: 'Medium Assortment (6 pieces)', priceModifier: 500 },
      { id: 'large-assortment', label: 'Large Assortment (8 pieces)', priceModifier: 1000 }
    ],
    flavors: [
      { id: 'signature-mix', label: 'Signature Mix', priceModifier: 0 },
      { id: 'seasonal-signature', label: 'Seasonal Signature', priceModifier: 130 }
    ],
    ingredients: [
      { name: 'Various Premium Pastries', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true },
      { name: 'Various Fillings', allergen: true },
      { name: 'Fresh Fruits', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (85g avg)',
      calories: 360,
      fat: '22g',
      carbs: '38g',
      protein: '5g',
      sugar: '24g'
    },
    detailedDescription: 'Experience the best of our pastry collection with our Signature Assorted Pastries, a carefully curated selection showcasing our most popular and innovative creations. Each assortment includes a mix of classic favorites and seasonal specialties, from chocolate croissants to fruit danishes, ensuring there\'s something for every taste preference. The assortment includes both sweet and savory options, all freshly baked that morning. Perfect for gifting, corporate events, or when you want to sample our full range of pastry excellence. Each pastry is individually wrapped to maintain freshness and quality.'
  },
  {
    id: '66',
    name: 'Choco Trio Mousse',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Three-layer chocolate mousse with varying chocolate intensities.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Choco-Trio-Mousse.jpg',
        alt: 'Choco Trio Mousse with three chocolate layers'
      },
      {
        id: 'img2',
        url: '/assets/images/Choco-Trio-Mousse.jpg',
        alt: 'Three-layer chocolate mousse'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Serving', priceModifier: 0 },
      { id: 'double', label: 'Two Servings', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen Servings', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'choco-trio', label: 'Chocolate Trio', priceModifier: 0 },
      { id: 'premium-trio', label: 'Premium Trio', priceModifier: 100 }
    ],
    ingredients: [
      { name: 'Dark Chocolate', allergen: false },
      { name: 'Milk Chocolate', allergen: true },
      { name: 'White Chocolate', allergen: true },
      { name: 'Heavy Cream', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Gelatin', allergen: false }
    ],
    nutrition: {
      servingSize: '1 serving (140g)',
      calories: 420,
      fat: '32g',
      carbs: '38g',
      protein: '6g',
      sugar: '32g'
    },
    detailedDescription: 'Journey through chocolate paradise with our Choco Trio Mousse, featuring three distinct layers of chocolate mousse in one elegant serving. Each dessert includes dark chocolate mousse for intense cocoa depth, milk chocolate mousse for creamy sweetness, and white chocolate mousse for silky lightness. The layers are carefully separated to maintain distinct flavors and textures, creating a sophisticated tasting experience. Perfect for chocolate connoisseurs who want to explore the full spectrum of chocolate flavors. Topped with chocolate shavings and served chilled, this mousse offers both visual appeal and culinary delight in every spoonful.'
  },
  {
    id: '67',
    name: 'Tiramisu Pastry',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Italian-inspired pastry with coffee-soaked layers and mascarpone.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Tiramisu-Pastry.jpg',
        alt: 'Tiramisu Pastry with coffee and mascarpone'
      },
      {
        id: 'img2',
        url: '/assets/images/Tiramisu-Pastry.jpg',
        alt: 'Italian tiramisu pastry'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'classic-tiramisu', label: 'Classic Tiramisu', priceModifier: 0 },
      { id: 'espresso-tiramisu', label: 'Espresso Tiramisu', priceModifier: 80 }
    ],
    ingredients: [
      { name: 'Ladyfinger Biscuits', allergen: true },
      { name: 'Mascarpone Cheese', allergen: true },
      { name: 'Coffee', allergen: false },
      { name: 'Cocoa Powder', allergen: false },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 pastry (120g)',
      calories: 380,
      fat: '24g',
      carbs: '36g',
      protein: '8g',
      sugar: '24g'
    },
    detailedDescription: 'Transport yourself to Italy with our Tiramisu Pastry, bringing the beloved Italian dessert to elegant pastry form. Each pastry features coffee-soaked ladyfinger biscuits layered with rich mascarpone cream and finished with cocoa powder dusting. The combination of strong espresso, creamy mascarpone, and crunchy biscuits creates the authentic tiramisu experience. Perfect for coffee lovers and Italian food enthusiasts. The flavors are perfectly balanced - not too sweet, with the coffee providing a pleasant bitterness that contrasts beautifully with the creamy filling. A sophisticated dessert that captures the essence of Italian café culture.'
  },
  {
    id: '68',
    name: 'Classic Chocolate Pastries',
    price: 373,
    rating: 4.8,
    reviewCount: 112,
    description: 'Traditional chocolate pastries with rich filling and flaky crust.',
    category: 'Pastries',
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Chocolate-Pastries.jpg',
        alt: 'Classic Chocolate Pastries with rich chocolate'
      },
      {
        id: 'img2',
        url: '/assets/images/Classic-Chocolate-Pastries.jpg',
        alt: 'Traditional chocolate pastry'
      }
    ],
    sizes: [
      { id: 'single', label: 'Single Pastry', priceModifier: 0 },
      { id: 'double', label: 'Two Pastries', priceModifier: 250 },
      { id: 'half-dozen', label: 'Half Dozen', priceModifier: 1200 }
    ],
    flavors: [
      { id: 'classic-chocolate', label: 'Classic Chocolate', priceModifier: 0 },
      { id: 'belgian-chocolate', label: 'Belgian Chocolate', priceModifier: 90 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Dark Chocolate', allergen: false },
      { name: 'Chocolate Filling', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 pastry (85g)',
      calories: 380,
      fat: '24g',
      carbs: '36g',
      protein: '5g',
      sugar: '22g'
    },
    detailedDescription: 'Return to chocolate basics with our Classic Chocolate Pastries, where traditional pastry meets timeless chocolate indulgence. Each pastry features flaky puff pastry filled with rich chocolate filling and topped with chocolate glaze. The chocolate is perfectly balanced - deep and complex without being overpowering. Perfect for those who appreciate the simple elegance of classic chocolate desserts. The buttery pastry provides the perfect crisp contrast to the smooth chocolate filling, creating a harmonious bite that satisfies both texture and flavor preferences. A comforting, familiar treat that never goes out of style.'
  }
];

export default products;