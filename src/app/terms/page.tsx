import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

// Legal text: keep word-for-word; change the date when the text changes.
export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using the Zyrobe app, including accounts, your content, credits and subscriptions.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: <p>{'By downloading, installing, or using the Zyrobe application ("App"), you agree to be bound by these Terms of Service ("Terms"). The App is operated by Exhibit Technologies Private Limited. If you do not agree to these Terms, please do not use the App.'}</p>,
  },
  {
    id: "service",
    title: "2. Description of Service",
    body: <p>{"Zyrobe is a wardrobe management application that allows users to photograph, catalog, and organize their clothing items. The App may use artificial intelligence to analyze clothing attributes, generate outfit try-on images, and provide styling suggestions."}</p>,
  },
  {
    id: "account",
    title: "3. User Account",
    body: <p>{"You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."}</p>,
  },
  {
    id: "content",
    title: "4. User Content",
    body: <p>{"You retain ownership of all photos and content you upload to the App. By uploading content, you grant Zyrobe a non-exclusive, worldwide, royalty-free license to use, process, and store your content solely for the purpose of providing the App's services to you, including processing by third-party AI providers as described in our "}<a href="/privacy">Privacy Policy</a>.</p>,
  },
  {
    id: "acceptable-use",
    title: "5. Acceptable Use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the App for any unlawful purpose</li>
          <li>Upload content that infringes on third-party rights</li>
          <li>Attempt to reverse engineer or modify the App</li>
          <li>{"Interfere with or disrupt the App's services"}</li>
          <li>Use automated systems to access the App without permission</li>
        </ul>
      </>
    ),
  },
  {
    id: "payments",
    title: "6. Credits, Subscriptions & Payments",
    body: <p>{"Certain features of the App require credits or a paid subscription, which can be purchased in the App through Google Play. Subscription fees are billed in advance on a recurring basis until cancelled. You may cancel your subscription at any time through Google Play, but refunds will be handled according to Google Play's refund policy."}</p>,
  },
  {
    id: "ip",
    title: "7. Intellectual Property",
    body: <p>{"The App and its original content, features, and functionality are owned by Exhibit Technologies Private Limited and are protected by applicable intellectual property laws."}</p>,
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    body: <p>{'In no event shall Zyrobe or Exhibit Technologies Private Limited be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the App. The App, including AI-generated results, is provided on an "as is" and "as available" basis without warranties of any kind.'}</p>,
  },
  {
    id: "changes",
    title: "9. Changes to Terms",
    body: <p>{'We reserve the right to modify these Terms at any time. We will notify users of any material changes by updating the "Last updated" date. Your continued use of the App after such changes constitutes your acceptance of the new Terms.'}</p>,
  },
  {
    id: "contact",
    title: "10. Contact Us",
    body: (
      <>
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
        <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      </>
    ),
  },
];

export default function TermsPage() {
  return <LegalPage path="/terms" title="Terms of Service" updated="22 October 2026" sections={sections} />;
}
