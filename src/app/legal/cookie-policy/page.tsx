import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy - BakeryBliss',
  description: 'Learn how BakeryBliss uses cookies and similar technologies on our website.',
};

export default function CookiePolicyPage() {
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
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
          <p className="text-muted-foreground mb-6">Last updated: March 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">1. What Are Cookies?</h2>
              <p className="text-muted-foreground">Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">2. How We Use Cookies</h2>
              <p className="text-muted-foreground">BakeryBliss uses cookies for the following purposes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly, including maintaining your shopping cart and login session.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website so we can improve the user experience.</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences such as language and region.</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign performance.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">3. Types of Cookies We Use</h2>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-muted-foreground border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-3">Session ID</td>
                      <td className="p-3">Maintains your login and cart</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Preferences</td>
                      <td className="p-3">Remembers your settings</td>
                      <td className="p-3">1 year</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Analytics</td>
                      <td className="p-3">Tracks site usage anonymously</td>
                      <td className="p-3">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">4. Managing Cookies</h2>
              <p className="text-muted-foreground">You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies. However, disabling essential cookies may affect the functionality of our website, including the ability to add items to your cart or log in.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">5. Third-Party Cookies</h2>
              <p className="text-muted-foreground">Some cookies may be set by third-party services we use, such as analytics and payment providers. These cookies are governed by the respective third-party privacy policies.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">6. Contact Us</h2>
              <p className="text-muted-foreground">If you have questions about our use of cookies, please contact us at <a href="mailto:bakeryblissindia@gmail.com" className="text-primary hover:underline">bakeryblissindia@gmail.com</a>.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
