import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductDetailsInteractive from './components/ProductDetailsInteractive';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Product Details - BakeryBliss',
  description:
    'Explore detailed information about our premium bakery products including ingredients, nutrition facts, and customer reviews. Customize your order with size and flavor options.',
};

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="mx-auto px-5 lg:px-20">
          <Breadcrumb className="mb-8" />
          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <ProductDetailsInteractive />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}