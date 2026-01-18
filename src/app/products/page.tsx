import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductsPageInteractive from './components/ProductsPageInteractive';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Our Products - BakeryBliss',
  description:
    'Discover our complete range of premium bakery products. From freshly baked breads and pastries to custom cakes and desserts. Browse by category, apply filters, and find your perfect treat.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="mx-auto px-5 lg:px-20">
          <Breadcrumb className="mb-8" />
          <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
            <ProductsPageInteractive />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}