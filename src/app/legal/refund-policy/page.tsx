import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Refund Policy - BakeryBliss',
  description: 'Learn about our refund and return policy for BakeryBliss orders.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 lg:pt-24">
        <div className="bg-secondary/30 py-4">
          <div className="mx-auto px-5 lg:px-20">
            <Breadcrumb />
          </div>
        </div>

        <div className="mx-auto px-5 lg:px-20 py-12 lg:py-16 max-w-4xl">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
          <p className="text-muted-foreground mb-6">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">1. Our Commitment</h2>
              <p className="text-muted-foreground">At BakeryBliss, we take pride in the quality of our products. If you are not satisfied with your order, we are here to help. Please review our refund policy below.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">2. Eligibility for Refunds</h2>
              <p className="text-muted-foreground">You may be eligible for a refund in the following cases:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
                <li>The product received is damaged or defective</li>
                <li>The wrong product was delivered</li>
                <li>The order was not delivered within the promised timeframe</li>
                <li>Quality does not meet our stated standards</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">3. Refund Request Process</h2>
              <p className="text-muted-foreground">To request a refund, please contact us within 24 hours of delivery with your order number and a description of the issue. Photos of the product are helpful and may be required for quality-related claims. You can reach us at <a href="mailto:bakeryblissindia@gmail.com" className="text-primary hover:underline">bakeryblissindia@gmail.com</a>.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">4. Refund Options</h2>
              <p className="text-muted-foreground">Depending on the issue, we may offer:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
                <li><strong>Full refund:</strong> Credited to your original payment method within 5–7 business days</li>
                <li><strong>Replacement:</strong> A fresh order delivered at no additional cost</li>
                <li><strong>Store credit:</strong> Credit added to your BakeryBliss account for future orders</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">5. Non-Refundable Items</h2>
              <p className="text-muted-foreground">The following are not eligible for refunds:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
                <li>Orders cancelled after the 2-hour cancellation window</li>
                <li>Custom or personalised orders once production has started</li>
                <li>Products that have been partially consumed</li>
                <li>Issues reported more than 24 hours after delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">6. Cancellation Refunds</h2>
              <p className="text-muted-foreground">Orders cancelled within 2 hours of placement will receive a full refund. The refund will be processed to your original payment method within 5–7 business days.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground">If you have questions about our refund policy or need to request a refund, please contact us at <a href="mailto:bakeryblissindia@gmail.com" className="text-primary hover:underline">bakeryblissindia@gmail.com</a>.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
