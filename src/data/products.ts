export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  description: string;
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
  isVegan?: boolean;
  allergens: string[];
  inStock: boolean;
  images: ProductImage[];
  sizes: CustomizationOption[];
  flavors: CustomizationOption[];
  ingredients: Ingredient[];
  nutrition: NutritionInfo;
  detailedDescription: string;
}

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

// Sample products data (Prices converted to INR at ~83 INR per USD)
export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Choco Chip Truffle Cake',
    price: 414,
    image: '/assets/images/choco-chip-truffle-cake.jpg',
    alt: 'Choco Chip Truffle Cake',
    category: 'Cakes',
    subcategory: 'Truffle Cakes',
    rating: 4.8,
    reviewCount: 124,
    description: 'Choco Chip Truffle Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Chocolate', 'Birthday'],
    isPopular: true,
    allergens: ['Gluten', 'Dairy', 'Chocolate'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/choco-chip-truffle-cake.jpg',
        alt: 'Choco Chip Truffle Cake'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 },
      { id: 'large', label: 'Large', priceModifier: 100 }
    ],
    flavors: [
      { id: 'dark', label: 'Dark Chocolate', priceModifier: 0 },
      { id: 'milk', label: 'Milk Chocolate', priceModifier: 0 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Dark Chocolate', allergen: true },
      { name: 'Eggs', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Milk', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (100g)',
      calories: 420,
      fat: '24g',
      carbs: '45g',
      protein: '6g',
      sugar: '32g'
    },
    detailedDescription: 'Our Choco Chip Truffle Cake is crafted with premium dark chocolate and chocolate chips throughout. Each bite delivers an intense chocolate experience with a moist, tender crumb. Perfect for chocolate lovers seeking indulgence.'
  },
  {
    id: '2',
    name: 'Classic Black Forest Cake',
    price: 746,
    image: '/assets/images/Class-black-forest-cake.jpg',
    alt: 'Classic Black Forest Cake',
    category: 'Cakes',
    subcategory: 'Black Forest Cakes',
    rating: 4.9,
    reviewCount: 89,
    description: 'Traditional Black Forest Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Chocolate', 'Birthday'],
    isPopular: true,
    allergens: ['Gluten', 'Dairy', 'Chocolate'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Class-black-forest-cake.jpg',
        alt: 'Classic Black Forest Cake'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 },
      { id: 'large', label: 'Large', priceModifier: 150 }
    ],
    flavors: [
      { id: 'classic', label: 'Classic', priceModifier: 0 },
      { id: 'extra-cherries', label: 'Extra Cherries', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Dark Chocolate', allergen: true },
      { name: 'Cherries', allergen: false },
      { name: 'Whipped Cream', allergen: true },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (120g)',
      calories: 380,
      fat: '22g',
      carbs: '42g',
      protein: '5g',
      sugar: '28g'
    },
    detailedDescription: 'Our Classic Black Forest Cake features layers of moist chocolate cake, whipped cream, and sour cherries. This traditional German dessert is a timeless favorite that combines rich chocolate with tart fruit for the perfect balance.'
  },
  {
    id: '3',
    name: 'Choco Ferrero Birthday Drip Cake',
    price: 290,
    originalPrice: 373,
    image: '/assets/images/Choco-Ferrero-Birthday-Drip-Cake.jpg',
    alt: 'Choco Ferrero Birthday Drip Cake',
    category: 'Cakes',
    subcategory: 'Birthday Cakes',
    rating: 4.7,
    reviewCount: 156,
    description: 'Choco Ferrero Birthday Drip Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Chocolate', 'Birthday'],
    isNew: true,
    allergens: ['Gluten', 'Dairy', 'Chocolate'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Choco-Ferrero-Birthday-Drip-Cake.jpg',
        alt: 'Choco Ferrero Birthday Drip Cake'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 },
      { id: 'large', label: 'Large', priceModifier: 80 }
    ],
    flavors: [
      { id: 'ferrero', label: 'Ferrero Rocher', priceModifier: 0 },
      { id: 'nutella', label: 'Nutella', priceModifier: 30 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Ferrero Rocher', allergen: true },
      { name: 'Dark Chocolate', allergen: true },
      { name: 'Eggs', allergen: true },
      { name: 'Milk', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (90g)',
      calories: 410,
      fat: '26g',
      carbs: '38g',
      protein: '6g',
      sugar: '30g'
    },
    detailedDescription: 'Celebrate with our Choco Ferrero Birthday Drip Cake! This decadent cake features Ferrero Rocher chocolates embedded in moist chocolate cake, topped with chocolate drip icing and more Ferrero Rocher pieces.'
  },
  {
    id: '4',
    name: 'Whipped Cream Pineapple Cake',
    price: 2739,
    image: '/assets/images/Whipped-Cream-Pineapple-Cake.jpg',
    alt: 'Whipped Cream Pineapple Cake',
    category: 'Cakes',
    subcategory: 'Pineapple Cakes',
    rating: 4.9,
    reviewCount: 203,
    description: 'Whipped Cream Pineapple Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Pineapple', 'Birthday'],
    isPopular: true,
    allergens: ['Gluten', 'Dairy', 'Pineapple'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Whipped-Cream-Pineapple-Cake.jpg',
        alt: 'Whipped Cream Pineapple Cake'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 },
      { id: 'large', label: 'Large', priceModifier: 200 }
    ],
    flavors: [
      { id: 'pineapple', label: 'Pineapple', priceModifier: 0 },
      { id: 'mixed-fruit', label: 'Mixed Fruit', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Pineapple', allergen: false },
      { name: 'Whipped Cream', allergen: true },
      { name: 'Eggs', allergen: true },
      { name: 'Sugar', allergen: false }
    ],
    nutrition: {
      servingSize: '1 slice (110g)',
      calories: 350,
      fat: '18g',
      carbs: '48g',
      protein: '4g',
      sugar: '35g'
    },
    detailedDescription: 'Our Whipped Cream Pineapple Cake offers a tropical escape with fresh pineapple chunks layered between moist vanilla cake and fluffy whipped cream. Light, refreshing, and perfect for any celebration.'
  },
  {
    id: '5',
    name: 'Strawberry Affair Cake',
    price: 497,
    image: '/assets/images/Strawberry-Affair-Cake.jpg',
    alt: 'Strawberry Affair Cake',
    category: 'Cakes',
    subcategory: 'Strawberry Cakes',
    rating: 4.8,
    reviewCount: 167,
    description: 'Strawberry Affair Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Strawberry', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Strawberry'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Strawberry-Affair-Cake.jpg',
        alt: 'Strawberry Affair Cake'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 },
      { id: 'large', label: 'Large', priceModifier: 120 }
    ],
    flavors: [
      { id: 'strawberry', label: 'Strawberry', priceModifier: 0 },
      { id: 'mixed-berries', label: 'Mixed Berries', priceModifier: 40 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Fresh Strawberries', allergen: false },
      { name: 'Whipped Cream', allergen: true },
      { name: 'Eggs', allergen: true },
      { name: 'Vanilla', allergen: false }
    ],
    nutrition: {
      servingSize: '1 slice (95g)',
      calories: 320,
      fat: '16g',
      carbs: '42g',
      protein: '4g',
      sugar: '28g'
    },
    detailedDescription: 'Our Strawberry Affair Cake is a celebration of summer! Fresh strawberries are layered throughout moist vanilla cake with strawberry-infused whipped cream, creating a light and fruity dessert experience.'
  },
  {
    id: '6',
    name: 'Crunchy Choco KitKat Cake',
    price: 580,
    image: '/assets/images/Crunchy-Choco-KitKat-Cake.jpg',
    alt: 'Crunchy Choco KitKat Cake',
    category: 'Cakes',
    subcategory: 'KitKat Cakes',
    rating: 4.6,
    reviewCount: 98,
    description: 'Crunchy Choco KitKat Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Chocolate', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Chocolate'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Crunchy-Choco-KitKat-Cake.jpg',
        alt: 'Crunchy Choco KitKat Cake'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 },
      { id: 'large', label: 'Large', priceModifier: 130 }
    ],
    flavors: [
      { id: 'kitkat', label: 'KitKat', priceModifier: 0 },
      { id: 'kitkat-dark', label: 'KitKat Dark', priceModifier: 20 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'KitKat Chocolate', allergen: true },
      { name: 'Dark Chocolate', allergen: true },
      { name: 'Eggs', allergen: true },
      { name: 'Milk', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (100g)',
      calories: 450,
      fat: '28g',
      carbs: '40g',
      protein: '6g',
      sugar: '35g'
    },
    detailedDescription: 'Indulge in the satisfying crunch of our KitKat Cake! Chocolate cake layered with chocolate buttercream and decorated with KitKat fingers creates the ultimate chocolate crunch experience.'
  },
  {
    id: '7',
    name: 'KitKat Bars Cake',
    price: 2407,
    image: '/assets/images/KitKat-Bars-Cake.jpg',
    alt: 'KitKat Bars Cake',
    category: 'Cakes',
    subcategory: 'KitKat Cakes',
    rating: 4.9,
    reviewCount: 145,
    description: 'KitKat Bars Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Chocolate', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Chocolate'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/KitKat-Bars-Cake.jpg',
        alt: 'KitKat Bars Cake'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 },
      { id: 'large', label: 'Large', priceModifier: 180 }
    ],
    flavors: [
      { id: 'kitkat', label: 'KitKat', priceModifier: 0 },
      { id: 'kitkat-gold', label: 'KitKat Gold', priceModifier: 50 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'KitKat Bars', allergen: true },
      { name: 'Dark Chocolate', allergen: true },
      { name: 'Eggs', allergen: true },
      { name: 'Milk', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (120g)',
      calories: 480,
      fat: '30g',
      carbs: '45g',
      protein: '7g',
      sugar: '38g'
    },
    detailedDescription: 'Our KitKat Bars Cake is a chocolate lover\'s dream! Multiple layers of chocolate cake are covered in chocolate buttercream and completely surrounded by KitKat bars for maximum crunch.'
  },
  {
    id: '8',
    name: 'Glazed German Black Forest Cake',
    price: 1079,
    image: '/assets/images/Glazed-German-Black-Forest-Cake.jpg',
    alt: 'Glazed German Black Forest Cake',
    category: 'Cakes',
    subcategory: 'Black Forest Cakes',
    rating: 4.7,
    reviewCount: 234,
    description: 'Glazed German Black Forest Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Chocolate', 'Birthday'],
    isPopular: true,
    allergens: ['Gluten', 'Dairy', 'Chocolate'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Glazed-German-Black-Forest-Cake.jpg',
        alt: 'Glazed German Black Forest Cake'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 },
      { id: 'large', label: 'Large', priceModifier: 160 }
    ],
    flavors: [
      { id: 'classic', label: 'Classic', priceModifier: 0 },
      { id: 'kirsch', label: 'With Kirsch', priceModifier: 70 }
    ],
    ingredients: [
      { name: 'Wheat Flour', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Dark Chocolate', allergen: true },
      { name: 'Morello Cherries', allergen: false },
      { name: 'Kirsch', allergen: false },
      { name: 'Whipped Cream', allergen: true }
    ],
    nutrition: {
      servingSize: '1 slice (110g)',
      calories: 400,
      fat: '24g',
      carbs: '44g',
      protein: '5g',
      sugar: '32g'
    },
    detailedDescription: 'Experience authentic German baking with our Glazed Black Forest Cake. Traditional Schwarzwälder Kirschtorte features chocolate cake, sour cherries, and whipped cream, finished with chocolate shavings and a glossy glaze.'
  },
  {
    id: '44',
    name: 'Classic Chocolate Truffle Pastry',
    price: 373,
    image: '/assets/images/Classic-Chocolate-Truffle-Pastry.jpg',
    alt: 'Classic Chocolate Truffle Pastry',
    category: 'Pastries',
    subcategory: 'Classic Chocolate Truffle Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Chocolate Truffle Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Classic Chocolate Truffle Pastries'],
    allergens: ['Gluten', 'Dairy', 'Classic Chocolate Truffle Pastries'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Classic-Chocolate-Truffle-Pastry.jpg',
        alt: 'Classic Chocolate Truffle Pastry'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 }
    ],
    flavors: [
      { id: 'dark', label: 'Dark Chocolate', priceModifier: 0 },
      { id: 'milk', label: 'Milk Chocolate', priceModifier: 0 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Dark Chocolate Truffle', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false },
      { name: 'Eggs', allergen: true }
    ],
    nutrition: {
      servingSize: '1 pastry (80g)',
      calories: 380,
      fat: '24g',
      carbs: '32g',
      protein: '5g',
      sugar: '22g'
    },
    detailedDescription: 'Our Classic Chocolate Truffle Pastry features buttery puff pastry filled with rich chocolate truffle cream. The perfect balance of flaky crust and decadent chocolate filling makes this an irresistible treat.'
  },
  {
    id: '45',
    name: 'Tropical Pineapple Pastry',
    price: 373,
    image: '/assets/images/Tropical-Pineapple-Pastry.jpg',
    alt: 'Tropical Pineapple Pastry',
    category: 'Pastries',
    subcategory: 'Tropical Pineapple Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Tropical Pineapple Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Tropical Pineapple Pastries'],
    allergens: ['Gluten', 'Dairy', 'Tropical Pineapple Pastries'],
    inStock: true,
    images: [
      {
        id: 'img1',
        url: '/assets/images/Tropical-Pineapple-Pastry.jpg',
        alt: 'Tropical Pineapple Pastry'
      }
    ],
    sizes: [
      { id: 'regular', label: 'Regular', priceModifier: 0 }
    ],
    flavors: [
      { id: 'pineapple', label: 'Pineapple', priceModifier: 0 },
      { id: 'coconut', label: 'Coconut Pineapple', priceModifier: 20 }
    ],
    ingredients: [
      { name: 'Puff Pastry', allergen: true },
      { name: 'Fresh Pineapple', allergen: false },
      { name: 'Cream Cheese', allergen: true },
      { name: 'Butter', allergen: true },
      { name: 'Sugar', allergen: false }
    ],
    nutrition: {
      servingSize: '1 pastry (85g)',
      calories: 320,
      fat: '18g',
      carbs: '38g',
      protein: '4g',
      sugar: '24g'
    },
    detailedDescription: 'Transport yourself to the tropics with our Pineapple Pastry! Fresh pineapple filling in buttery puff pastry creates a sweet, tangy, and utterly delicious pastry that\'s perfect for breakfast or dessert.'
  }
];