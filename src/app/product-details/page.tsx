import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Product Details - BakeryBliss',
  description:
    'Explore detailed information about our premium bakery products including ingredients, nutrition facts, and customer reviews. Customize your order with size and flavor options.',
};

export default function ProductDetailsPage() {
  redirect('/products');
}