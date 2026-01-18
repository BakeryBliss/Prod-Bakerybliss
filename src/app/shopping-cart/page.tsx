// import type { Metadata } from 'next';
// import Header from '@/components/common/Header';
// import Breadcrumb from '@/components/common/Breadcrumb';
// import ShoppingCartInteractive from './components/ShoppingCartInteractive';

// export const metadata: Metadata = {
//   title: 'Shopping Cart - BakeryBliss',
//   description: 'Review your selected bakery items, apply discount coupons, choose delivery options, and proceed to secure checkout for your BakeryBliss order.',
// };

// export default function ShoppingCartPage() {
//   return (
//     <>
//       <Header />
      
//       <main className="min-h-screen bg-background pt-28 pb-16">
//         <div className="mx-auto px-5 lg:px-20">
//           {/* Breadcrumb */}
//           <Breadcrumb className="mb-8" />

//           {/* Page Header */}
//           <div className="mb-8">
//             <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-3">
//               Your Shopping Cart
//             </h1>
//             <p className="text-muted-foreground text-lg max-w-2xl">
//               Review your selections, apply coupons, and choose your preferred delivery method before checkout.
//             </p>
//           </div>

//           {/* Interactive Cart Content */}
//           <ShoppingCartInteractive />
//         </div>
//       </main>
//     </>
//   );
// }