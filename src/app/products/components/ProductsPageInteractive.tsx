'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import CategorySidebar from './CategorySidebar';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import Icon from '@/components/ui/AppIcon';

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
}

// Sample products data (Prices converted to INR at ~83 INR per USD)
const sampleProducts: Product[] = [
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
    allergens: ['Gluten', 'Dairy', 'Chocolate']
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
    allergens: ['Gluten', 'Dairy', 'Chocolate']
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
    allergens: ['Gluten', 'Dairy', 'Chocolate']
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
    allergens: ['Gluten', 'Dairy', 'Pineapple']
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
    allergens: ['Gluten', 'Dairy', 'Strawberry']
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
    allergens: ['Gluten', 'Dairy', 'Chocolate']
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
    allergens: ['Gluten', 'Dairy', 'Chocolate']
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
    allergens: ['Gluten', 'Dairy', 'Chocolate']
  },
  {
    id: '9',
    name: 'Red Velvet Cream Cake',
    price: 373,
    image: '/assets/images/Red-Velvet-Cream-Cake.jpg',
    alt: 'Red Velvet Cream Cake',
    category: 'Cakes',
    subcategory: 'Red Velvet Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Red Velvet Cream Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Red Velvet', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Red Velvet']
  },
  {
    id: '10',
    name: 'Classic Red Velvet Cream Cake',
    price: 373,
    image: '/assets/images/Classic-Red-Velvet-Cream-Cake.jpg',
    alt: 'Classic Red Velvet Cream Cake',
    category: 'Cakes',
    subcategory: 'Red Velvet Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Red Velvet Cream Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Red Velvet', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Red Velvet']
  },
  {
    id: '11',
    name: 'Tropical Fruit n Almond Cake',
    price: 373,
    image: '/assets/images/Tropical-Fruit-n-Almond-Cake.jpg',
    alt: 'Tropical Fruit n Almond Cake',
    category: 'Cakes',
    subcategory: 'Tropical Fruit Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Tropical Fruit n Almond Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Tropical Fruit', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Almond']
  },
  {
    id: '12',
    name: 'Red Velvet Jar Cake',
    price: 373,
    image: '/assets/images/Red-Velvet-Jar-Cake.jpg',
    alt: 'Red Velvet Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Red Velvet Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Red Velvet Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Jar Cakes'],
    allergens: ['Gluten', 'Dairy', 'Red Velvet']
  },
  {
    id: '13',
    name: 'Chocolate Mud Jar Cake',
    price: 373,
    image: '/assets/images/Chocolate-Mud-Jar-Cake.jpg',
    alt: 'Chocolate Mud Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Chocolate Mud Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Chocolate Mud Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Jar Cakes'],
    allergens: ['Gluten', 'Dairy', 'Chocolate']
  },
  {
    id: '14',
    name: 'Choco Mousse Jar Cake',
    price: 373,
    image: '/assets/images/Choco-Mousse-Jar-Cake.jpg',
    alt: 'Choco Mousse Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Choco Mousse Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Choco Mousse Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Choco Mousse', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Chocolate']
  },
  {
    id: '15',
    name: 'Blueberry Jar Cake',
    price: 373,
    image: '/assets/images/Blueberry-Jar-Cake.jpg',
    alt: 'Blueberry Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Blueberry Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Blueberry Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Blueberry', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Blueberry']
  },
  {
    id: '16',
    name: 'Classic Choco Mud Jar Cake',
    price: 373,
    image: '/assets/images/Classic-Choco-Mud-Jar-Cake.jpg',
    alt: 'Classic Choco Mud Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Choco Mud Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Choco Mud Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Choco Mud', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Chocolate']
  },
  {
    id: '17',
    name: 'Choco Crunch Jar Cake',
    price: 373,
    image: '/assets/images/Choco-Crunch-Jar-Cake.jpg',
    alt: 'Choco Crunch Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Choco Crunch Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Choco Crunch Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Choco Crunch', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Chocolate']
  },
  {
    id: '18',
    name: 'Choco Mud Jar Cake',
    price: 373,
    image: '/assets/images/Choco-Mud-Jar-Cake.jpg',
    alt: 'Choco Mud Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Choco Mud Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Choco Mud Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Choco Mud', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Chocolate']
  },
  {
    id: '19',
    name: 'Personalised Bday Red Velvet Jar Cakes',
    price: 373,
    image: '/assets/images/Personalised-Bday-Red-Velvet-Jar-Cakes.jpg',
    alt: 'Personalised Bday Red Velvet Jar Cakes',
    category: 'Jar Cake',
    subcategory: 'Personalised Bday Red Velvet Jar Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Personalised Bday Red Velvet Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Personalised Bday Red Velvet Jar Cakes', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Red Velvet']
  },
  {
    id: '20',
    name: 'Eggless Biscoff Cheesecake Jar Cake',
    price: 373,
    image: '/assets/images/Eggless-Biscoff-Cheesecake-Jar-Cake.jpg',
    alt: 'Eggless Biscoff Cheesecake Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Eggless Biscoff Cheesecake Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Eggless Biscoff Cheesecake Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Eggless Biscoff Cheesecake', 'Birthday'], 
    allergens: ['Gluten', 'Dairy', 'Eggless Biscoff Cheesecake']
  },
  {
    id: '21',
    name: 'Caramel Cheese Verrine Cup',
    price: 373, 
    image: '/assets/images/Caramel-Cheese-Verrine-Jar-Cake.jpg',
    alt: 'Caramel Cheese Verrine Cup',
    category: 'Jar Cake',
    subcategory: 'Caramel Cheese Verrine Cake',
    rating: 4.8,
    reviewCount: 112,
    description: 'Caramel Cheese Verrine Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Caramel Cheese Verrine', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Caramel Cheese Verrine']
  },
  {
    id: '22',
    name: 'Classic Red Velvet Jar Cake',
    price: 373,
    image: '/assets/images/Classic-Red-Velvet-Jar-Cake.jpg',
    alt: 'Classic Red Velvet Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Red Velvet Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Red Velvet Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Classic Red Velvet', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Red Velvet']
  },
  {
    id: '23',
    name: 'Nutella Hazelnut Jar Cake',
    price: 373,
    image: '/assets/images/Nutella-Hazelnut-Jar.jpg',
    alt: 'Nutella Hazelnut Jar Cake',
    category: 'Jar Cake',
    subcategory: 'Nutella Hazelnut Cakes',
    rating: 4.8,
    reviewCount: 112,
    description: 'Nutella Hazelnut Jar Cake with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Nutella Hazelnut', 'Birthday'],
    allergens: ['Gluten', 'Dairy', 'Nutella Hazelnut']
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
    allergens: ['Gluten', 'Dairy', 'Classic Chocolate Truffle Pastries']
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
    allergens: ['Gluten', 'Dairy', 'Tropical Pineapple Pastries']
  },
  {
    id: '46',
    name: 'Happy Birthday Chocolate Pastries',
    price: 373,
    image: '/assets/images/Happy-Birthday-Chocolate-Pastries.jpg',
    alt: 'Happy Birthday Chocolate Pastries',
    category: 'Pastries',
    subcategory: 'Happy Birthday Chocolate Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Happy Birthday Chocolate Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Happy Birthday Chocolate Pastries'],
    allergens: ['Gluten', 'Dairy', 'Happy Birthday Chocolate Pastries']
  },
  {
    id: '47',
    name: 'Assorted Pastry Box',
    price: 373,
    image: '/assets/images/Assorted-Pastry-Box.jpg',
    alt: 'Assorted Pastry Box',
    category: 'Pastries',
    subcategory: 'Assorted Pastry Box',
    rating: 4.8,
    reviewCount: 112,
    description: 'Assorted Pastry Box with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Assorted Pastry Box'],
    allergens: ['Gluten', 'Dairy', 'Assorted Pastry Box']
  },
  {
    id: '48',
    name: 'Classic Butterscotch Pastry',
    price: 373,
    image: '/assets/images/Classic-Butterscotch-Pastry.jpg',
    alt: 'Classic Butterscotch Pastry',
    category: 'Pastries',
    subcategory: 'Classic Butterscotch Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Butterscotch Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Classic Butterscotch Pastries'],
    allergens: ['Gluten', 'Dairy', 'Classic Butterscotch Pastries']
  },
  {
    id: '49',
    name: 'Classic Red Velvet Pastry',
    price: 373,
    image: '/assets/images/Classic-Red-Velvet-Pastry.jpg',
    alt: 'Classic Red Velvet Pastry',
    category: 'Pastries',
    subcategory: 'Classic Red Velvet Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Red Velvet Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Red Velvet'],
    allergens: ['Gluten', 'Dairy', 'Red Velvet']
  },
  {
    id: '50',
    name: 'Blueberry Cheesecake Slice',
    price: 373,
    image: '/assets/images/Blueberry-Cheesecake-Slice.jpg',
    alt: 'Blueberry Cheesecake Slice',
    category: 'Pastries',
    subcategory: 'Blueberry Cheesecake Slices',
    rating: 4.8,
    reviewCount: 112,
    description: 'Blueberry Cheesecake Slice with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Blueberry Cheesecake Slices'],
    allergens: ['Gluten', 'Dairy', 'Blueberry Cheesecake Slices']
  },
  {
    id: '51',
    name: 'Rose Tres Leches',
    price: 373,
    image: '/assets/images/Rose-Tres-Leches.jpg',
    alt: 'Rose Tres Leches',
    category: 'Pastries',
    subcategory: 'Rose Tres Leches',
    rating: 4.8,
    reviewCount: 112,
    description: 'Rose Tres Leches with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Rose Tres Leches'],
    allergens: ['Gluten', 'Dairy', 'Rose Tres Leches']
  },
  {
    id: '52',
    name: 'Choco Truffle Pastry Made With KitKat',
    price: 373,
    image: '/assets/images/Choco-Truffle-Pastry-Made-With-KitKat.jpg',
    alt: 'Choco Truffle Pastry Made With KitKat',
    category: 'Pastries',
    subcategory: 'Choco Truffle Pastry Made With KitKat',
    rating: 4.8,
    reviewCount: 112,
    description: 'Choco Truffle Pastry Made With KitKat with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Choco Truffle Pastry Made With KitKat'],
    allergens: ['Gluten', 'Dairy', 'Choco Truffle Pastry Made With KitKat']
  },
  {
    id: '53',
    name: 'Biscoff Baked Cheesecake Slice',
    price: 373,
    image: '/assets/images/Biscoff-Baked-Cheesecake-Slice.jpg',
    alt: 'Biscoff Baked Cheesecake Slice',
    category: 'Pastries',
    subcategory: 'Biscoff Baked Cheesecake Slices',
    rating: 4.8,
    reviewCount: 112,
    description: 'Biscoff Baked Cheesecake Slice with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Biscoff Baked Cheesecake Slices'],
    allergens: ['Gluten', 'Dairy', 'Biscoff Baked Cheesecake Slices']
  },
  {
    id: '54',
    name: 'New York Baked Cheesecake Slice',
    price: 373,
    image: '/assets/images/New-York-Baked-Cheesecake-Slice.jpg',
    alt: 'New York Baked Cheesecake Slice',
    category: 'Pastries',
    subcategory: 'New York Baked Cheesecake Slices',
    rating: 4.8,
    reviewCount: 112,
    description: 'New York Baked Cheesecake Slice with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'New York Baked Cheesecake Slices'],
    allergens: ['Gluten', 'Dairy', 'New York Baked Cheesecake Slices']
  },
  {
    id: '55',
    name: 'Classic Oreo Cheesecake Slice',
    price: 373,
    image: '/assets/images/Classic-Oreo-Cheesecake-Slice.jpg',
    alt: 'Classic Oreo Cheesecake Slice',
    category: 'Pastries',
    subcategory: 'Classic Oreo Cheesecake Slices',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Oreo Cheesecake Slice with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Classic Oreo Cheesecake Slices'],
    allergens: ['Gluten', 'Dairy', 'Classic Oreo Cheesecake Slices']
  },
  {
    id: '56',
    name: 'Classic Choco Chip Pastry',
    price: 373,
    image: '/assets/images/Classic-Choco-Chip-Pastry.jpg',
    alt: 'Classic Choco Chip Pastry',
    category: 'Pastries',
    subcategory: 'Classic Choco Chip Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Choco Chip Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Classic Choco Chip Pastries'],
    allergens: ['Gluten', 'Dairy', 'Classic Choco Chip Pastries']
  },
  {
    id: '57',
    name: 'Black Forest Pastry',
    price: 373,
    image: '/assets/images/Black-Forest-Pastry.jpg',
    alt: 'Black Forest Pastry',
    category: 'Pastries',
    subcategory: 'Black Forest Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Black Forest Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Black Forest Pastries'],
    allergens: ['Gluten', 'Dairy', 'Black Forest Pastries']
  },
  {
    id: '58',
    name: 'Nutella Cheesecake Slice',
    price: 373,
    image: '/assets/images/Nutella-Cheesecake-Slice.jpg',
    alt: 'Nutella Cheesecake Slice',
    category: 'Pastries',
    subcategory: 'Nutella Cheesecake Slices',
    rating: 4.8,
    reviewCount: 112,
    description: 'Nutella Cheesecake Slice with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Nutella Cheesecake Slices'],
    allergens: ['Gluten', 'Dairy', 'Nutella Cheesecake Slices']
  },
  {
    id: '59',
    name: 'Red Velvet Anniversary Pastries',
    price: 373,
    image: '/assets/images/Red-Velvet-Anniversary-Pastries.jpg',
    alt: 'Red Velvet Anniversary Pastries',
    category: 'Pastries',
    subcategory: 'Red Velvet Anniversary Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Red Velvet Anniversary Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Red Velvet Anniversary Pastries'],
    allergens: ['Gluten', 'Dairy', 'Red Velvet Anniversary Pastries']
  },
  {
    id: '60',
    name: 'Six Pineapple Chocolate and Red Velvet Anniversary Pastries',
    price: 373,
    image: '/assets/images/Six-Pineapple-Chocolate-and-Red-Velvet-Anniversary-Pastries.jpg',
    alt: 'Six Pineapple Chocolate and Red Velvet Anniversary Pastries',
    category: 'Pastries',
    subcategory: 'Six Pineapple Chocolate and Red Velvet Anniversary Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Six Pineapple Chocolate and Red Velvet Anniversary Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Six Pineapple Chocolate and Red Velvet Anniversary Pastries'],
    allergens: ['Gluten', 'Dairy', 'Six Pineapple Chocolate and Red Velvet Anniversary Pastries']
  },
  {
    id: '61',
    name: 'Filter Coffee Mousse Verrine Cup',
    price: 373,
    image: '/assets/images/Filter-Coffee-Mousse-Verrine-Cup.jpg',
    alt: 'Filter Coffee Mousse Verrine Cup',
    category: 'Pastries',
    subcategory: 'Filter Coffee Mousse Verrine Cups',
    rating: 4.8,
    reviewCount: 112,
    description: 'Filter Coffee Mousse Verrine Cup with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Filter Coffee Mousse Verrine Cups'],
    allergens: ['Gluten', 'Dairy', 'Filter Coffee Mousse Verrine Cups']
  },
  {
    id: '62',
    name: 'Choco Truffle N Butterscotch Pastries',
    price: 373,
    image: '/assets/images/Choco-Truffle-N-Butterscotch-Pastries.jpg',
    alt: 'Choco Truffle N Butterscotch Pastries',
    category: 'Pastries',
    subcategory: 'Choco Truffle N Butterscotch Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Choco Truffle N Butterscotch Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Choco Truffle N Butterscotch Pastries'],
    allergens: ['Gluten', 'Dairy', 'Choco Truffle N Butterscotch Pastries']
  },
  {
    id: '63',
    name: 'Candied Caramel Mousse',
    price: 373,
    image: '/assets/images/Candied-Caramel-Mousse.jpg',
    alt: 'Candied Caramel Mousse',
    category: 'Pastries',
    subcategory: 'Candied Caramel Mousse',
    rating: 4.8,
    reviewCount: 112,
    description: 'Candied Caramel Mousse with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Candied Caramel Mousse'],
    allergens: ['Gluten', 'Dairy', 'Candied Caramel Mousse']
  },
  {
    id: '64',
    name: 'Square Shaped Delicious Butterscotch Pastry',
    price: 373,
    image: '/assets/images/Square-Shaped-Delicious-Butterscotch-Pastry.jpg',
    alt: 'Square Shaped Delicious Butterscotch Pastry',
    category: 'Pastries',
    subcategory: 'Square Shaped Delicious Butterscotch Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Square Shaped Delicious Butterscotch Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Square Shaped Delicious Butterscotch Pastries'],
    allergens: ['Gluten', 'Dairy', 'Square Shaped Delicious Butterscotch Pastries']
  },
  {
    id: '65',
    name: 'Signature Assorted Pastries',
    price: 373,
    image: '/assets/images/Signature-Assorted-Pastries.jpg',
    alt: 'Signature Assorted Pastries',
    category: 'Pastries',
    subcategory: 'Signature Assorted Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Signature Assorted Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Signature Assorted Pastries'],
    allergens: ['Gluten', 'Dairy', 'Signature Assorted Pastries']
  },
  {
    id: '66',
    name: 'Choco Trio Mousse',
    price: 373,
    image: '/assets/images/Choco-Trio-Mousse.jpg',
    alt: 'Choco Trio Mousse',
    category: 'Pastries',
    subcategory: 'Choco Trio Mousse',
    rating: 4.8,
    reviewCount: 112,
    description: 'Choco Trio Mousse with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Choco Trio Mousse'],
    allergens: ['Gluten', 'Dairy', 'Choco Trio Mousse']
  },
  {
    id: '67',
    name: 'Tiramisu Pastry',
    price: 373,
    image: '/assets/images/Tiramisu-Pastry.jpg',
    alt: 'Tiramisu Pastry',
    category: 'Pastries',
    subcategory: 'Tiramisu Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Tiramisu Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Tiramisu Pastries'],
    allergens: ['Gluten', 'Dairy', 'Tiramisu Pastries']
  },
  {
    id: '68',
    name: 'Classic Chocolate Pastries',
    price: 373,
    image: '/assets/images/Classic-Chocolate-Pastries.jpg',
    alt: 'Classic Chocolate Pastries',
    category: 'Pastries',
    subcategory: 'Classic Chocolate Pastries',
    rating: 4.8,
    reviewCount: 112,
    description: 'Classic Chocolate Pastry with rich dark chocolate. Perfect for birthday parties or an afternoon treat.',
    tags: ['Vegetarian', 'Classic Chocolate Pastries'],
    allergens: ['Gluten', 'Dairy', 'Classic Chocolate Pastries']
  }
];

const categories = [
  { id: 'all', name: 'All Products', count: sampleProducts.length },
  { id: 'jar cake', name: 'Jar Cake', count: sampleProducts.filter(p => p.category === 'Jar Cake').length },
  { id: 'pastries', name: 'Pastries', count: sampleProducts.filter(p => p.category === 'Pastries').length },
  { id: 'cakes', name: 'Cakes', count: sampleProducts.filter(p => p.category === 'Cakes').length },
  { id: 'cookies', name: 'Cookies', count: sampleProducts.filter(p => p.category === 'Cookies').length }
];

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' }
];

export default function ProductsPageInteractive() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4200]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sampleProducts.forEach(product => {
      product.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = sampleProducts;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          // For demo, sort by ID (assuming higher ID = newer)
          return parseInt(b.id) - parseInt(a.id);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, sortBy, priceRange, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Icon name="FunnelIcon" size={20} />
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Filters */}
        <ProductFilters
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          allTags={allTags}
          totalProducts={filteredAndSortedProducts.length}
        />

        {/* Product Grid */}
        <ProductGrid products={filteredAndSortedProducts} />
      </div>
    </div>
  );
}