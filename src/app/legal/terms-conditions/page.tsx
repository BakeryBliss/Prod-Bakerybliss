import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions - BakeryBliss',
  description: 'Read the terms and conditions for using the BakeryBliss website and services.',
};

export default function TermsConditionsPage() {
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
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8">Terms &amp; Conditions</h1>
          <p className="text-muted-foreground mb-6">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">By accessing and using the BakeryBliss website, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">2. Orders and Payments</h2>
              <p className="text-muted-foreground">All orders are subject to availability. Prices are listed in INR and include applicable taxes unless stated otherwise. We accept major credit/debit cards, UPI, and net banking. Payment is required at the time of placing your order.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">3. Delivery</h2>
              <p className="text-muted-foreground">We aim to deliver all orders within the estimated delivery time. Delivery times are estimates and may vary based on location, weather, and order volume. BakeryBliss is not responsible for delays caused by circumstances beyond our control.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">4. Product Descriptions</h2>
              <p className="text-muted-foreground">We make every effort to display our products as accurately as possible. However, actual products may vary slightly in appearance from images on the website. All product descriptions, including ingredients and allergen information, are provided to the best of our knowledge.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">5. Allergen Disclaimer</h2>
              <p className="text-muted-foreground">Our products are prepared in a facility that handles common allergens including nuts, dairy, eggs, gluten, and soy. While we take precautions, we cannot guarantee that any product is completely free from allergens. Customers with severe allergies should contact us before ordering.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">6. Cancellations</h2>
              <p className="text-muted-foreground">Orders may be cancelled within 2 hours of placement for a full refund. After this window, cancellations may not be possible as preparation may have already begun. Custom orders cannot be cancelled once production has started.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">7. Intellectual Property</h2>
              <p className="text-muted-foreground">All content on this website, including text, images, logos, and designs, is the property of BakeryBliss and is protected by copyright laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">BakeryBliss shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the amount paid for the specific order in question.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">9. Changes to Terms</h2>
              <p className="text-muted-foreground">We reserve the right to update these Terms &amp; Conditions at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after any changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground">For questions about these Terms &amp; Conditions, contact us at <a href="mailto:bakeryblissindia@gmail.com" className="text-primary hover:underline">bakeryblissindia@gmail.com</a>.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
