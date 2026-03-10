import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - BakeryBliss',
  description: 'Learn how BakeryBliss collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
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
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground">We collect information you provide directly to us, including your name, email address, phone number, delivery address, and payment information when you place an order, create an account, or contact us.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and delivery updates</li>
                <li>Respond to your inquiries and customer service requests</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">3. Information Sharing</h2>
              <p className="text-muted-foreground">We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders. These parties are obligated to keep your information confidential.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">5. Cookies</h2>
              <p className="text-muted-foreground">We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. Please refer to our Cookie Policy for more details.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground">You have the right to access, update, or delete your personal information at any time by logging into your account or contacting us. You may also opt out of promotional communications by clicking the unsubscribe link in our emails.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground">If you have questions about this Privacy Policy, please contact us at <a href="mailto:bakeryblissindia@gmail.com" className="text-primary hover:underline">bakeryblissindia@gmail.com</a>.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
