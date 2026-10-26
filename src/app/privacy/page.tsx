import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

// Legal text: keep word-for-word in sync with what Google Play reviewed (Play Console links to
// https://zyrobe.com/privacy and https://zyrobe.com/privacy#delete-account). Change the date when the text changes.
export const metadata: Metadata = {
  title: "Privacy Policy: how Zyrobe handles your photos and data",
  description: "How Zyrobe collects, uses and protects your information, how your photos are handled and who processes them, and how to delete your account and data.",
  alternates: { canonical: "/privacy" },
};

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
const deleteMail = <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Delete my Zyrobe account")}`}>{CONTACT_EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "1. Information we collect",
    body: (
      <>
        <ul>
          <li><strong>Account information:</strong> {"your name and email address, and your profile picture if you sign in with Google. You can sign in with Google, Sign in with Apple, or an email and password. If you use a password, we store only a salted hash of it, never the password itself."}</li>
          <li><strong>Photos you upload:</strong> {"photos of your clothes and, if you use the try-on feature, a photo of yourself. These are only used to provide the features you ask for. We never access your gallery in the background: the App reads only the photos you choose or take with the camera."}</li>
          <li><strong>Wardrobe details:</strong> {"the categories, colours, tags, notes, storage locations, outfits, lookbooks, trip plans and calendar entries you create, and the results the AI generates for you (cleaned product photos, try-on images, outfit suggestions)."}</li>
          <li><strong>Approximate location:</strong> {"to show local weather, the App looks up your approximate city from your IP address (it does not use GPS and does not ask for the location permission). The city and temperature are used to tailor outfit suggestions."}</li>
          <li><strong>Purchase records:</strong> {"the credits and subscription you buy through Google Play (product, time and purchase token). Google handles your payment; we never see your card or UPI details."}</li>
          <li><strong>Basic technical data:</strong> {"your IP address, device and app version in our server logs, kept to keep the service secure and working."}</li>
          <li><strong>Website visits:</strong> {"our website zyrobe.com uses Google Analytics to understand how people use it: the pages you view, how long you stay, your device and browser, your approximate location from your IP address, and how you found the site. Google Analytics sets cookies in your browser. You can block them in your browser settings or with Google\u2019s opt-out add-on (tools.google.com/dlpage/gaoptout)."}</li>
        </ul>
        <p>{"The App does not contain advertising, advertising IDs, or third-party analytics or tracking SDKs. Google Analytics is used only on our website."}</p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "2. How we use your information",
    body: (
      <>
        <ul>
          <li>To run your account and wardrobe</li>
          <li>To analyse your clothing photos with AI (type, colour, style) and to create product photos and try-on images</li>
          <li>To suggest outfits, weekly plans and packing lists, taking the weather into account</li>
          <li>To process credit purchases and subscriptions and prevent fraud</li>
          <li>To send you account emails, such as verification codes and password resets</li>
          <li>To fix problems and keep the service secure</li>
        </ul>
        <p>{"We do not use your photos to train AI models, to build advertising profiles, or for any purpose other than providing the App to you."}</p>
      </>
    ),
  },
  {
    id: "who-processes-it",
    title: "3. Who processes your data for us",
    body: (
      <>
        <p>{"We do not sell or rent your personal information and we do not share your photos with other users, advertisers or data brokers. To deliver the features, we use service providers who process data on our behalf and only to carry out your request:"}</p>
        <ul>
          <li><strong>Google Cloud (Mumbai region, India)</strong> hosts our servers and database, where your account data and photos are stored.</li>
          <li><strong>Google (Gemini API)</strong> analyses clothing photos and writes outfit suggestions.</li>
          <li><strong>RunPod</strong> runs the image models that create product photos and try-on images.</li>
          <li><strong>Cloudflare</strong> delivers traffic to our servers securely.</li>
          <li><strong>Google Sign-In and Sign in with Apple</strong> verify your identity if you choose them.</li>
          <li><strong>Google Play</strong> processes your purchases.</li>
          <li><strong>Amazon SES</strong> sends account emails.</li>
          <li><strong>Google Analytics</strong> measures visits to our website zyrobe.com.</li>
          <li><strong>ipwho.is and Open-Meteo</strong> provide the approximate city and the weather. They receive your IP address from your device.</li>
        </ul>
        <p>{"We may also disclose information if required by law or to protect the rights and safety of our users."}</p>
      </>
    ),
  },
  {
    id: "photos",
    title: "4. How your photos are handled",
    body: <p>{"Photos you upload are sent over an encrypted (HTTPS) connection to our servers and stored in your account, where only you can access them. When you ask for an AI feature, the relevant photos are sent to Google (Gemini) and/or RunPod to produce the result, and the result is stored in your account. You can delete any item, and you can delete everything at once by deleting your account."}</p>,
  },
  {
    id: "security",
    title: "5. Security",
    body: <p>{"Data is encrypted in transit with HTTPS and our cloud storage is encrypted at rest. Access to our servers is restricted and secrets are kept in a managed secret store. No method of transmission or storage is completely secure, but we work to protect your information."}</p>,
  },
  {
    // Linked from Google Play's Data safety form: keep this id.
    id: "delete-account",
    title: "6. Delete your Zyrobe account and data",
    body: (
      <>
        <p>{"You can delete your Zyrobe account and all of its data at any time. Zyrobe is made by Exhibit Technologies Private Limited. We keep your data only while your account is active."}</p>

        <h3>Delete your account in the App</h3>
        <ol>
          <li>Open Zyrobe and go to <strong>Profile</strong>.</li>
          <li>Tap <strong>Personal Information</strong>.</li>
          <li>Scroll down, tap <strong>Delete Account</strong> and confirm.</li>
        </ol>
        <p>{"This cannot be undone."}</p>

        <h3>Ask us to delete it, without the App</h3>
        <p>
          If you cannot use the App, email {deleteMail} from the email address on your account, with the subject
          {" \u201cDelete my Zyrobe account\u201d"}. We delete your account and all of its data within 30 days and confirm by email.
        </p>

        <h3>What we delete</h3>
        <p>{"Everything. When your account is deleted, we permanently remove:"}</p>
        <ul>
          <li>{"Your account details: name, email address, profile picture and sign-in details"}</li>
          <li>{"All your photos: your clothes, the photo of yourself for try-on, and photos of your storage places"}</li>
          <li>{"Everything the AI made for you: product photos, try-on images, outfit suggestions and stylist notes"}</li>
          <li>{"Your wardrobe: items, categories, colours, tags, notes, storage locations, outfits and lookbooks"}</li>
          <li>{"Your plans: calendar entries, weekly plans and trips"}</li>
          <li>{"Your credits, plan details and purchase history in Zyrobe"}</li>
        </ul>
        <p>{"Copies in our daily backups are removed automatically within 30 days. Nothing is kept after that."}</p>

        <h3>Before you delete: cancel your subscription</h3>
        <p>{"Deleting your account does not cancel a Google Play subscription. To stop future payments, cancel it first in the Google Play app: tap your profile picture, then Payments & subscriptions > Subscriptions > Zyrobe > Cancel subscription. Unused credits are removed with your account."}</p>

        <h3>Delete some of your data and keep your account</h3>
        <p>{"You can delete single items at any time in the App: clothes, outfits, saved try-on looks, storage places, planned outfits and trips."}</p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your rights",
    body: <p>{"You can view and edit your information in the App. You may also ask us to access, correct, export or delete your data, or to withdraw consent, by writing to us. We respond within a reasonable time and in line with applicable law, including India's Digital Personal Data Protection Act, 2023. You can also turn off camera access at any time in your device settings."}</p>,
  },
  {
    id: "children",
    title: "8. Children",
    body: <p>{"Zyrobe is intended for people aged 18 and over. We do not knowingly collect information from anyone under 18. If you believe a minor has given us information, contact us and we will delete it."}</p>,
  },
  {
    id: "international",
    title: "9. International processing",
    body: <p>{"Our servers are in India. Some service providers listed above may process data in other countries. Where that happens, it is only to provide the feature you requested."}</p>,
  },
  {
    id: "changes",
    title: "10. Changes to this policy",
    body: <p>{"If we change this policy we will update the date above and, for significant changes, tell you in the App."}</p>,
  },
  {
    id: "contact",
    title: "11. Contact us",
    body: (
      <p>
        Exhibit Technologies Private Limited
        <br />
        Email: {mail}
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy Policy"
      updated="26 October 2026"
      intro={<p>{'Zyrobe (the "App") is operated by Exhibit Technologies Private Limited ("we", "us"). This policy explains what information the App collects, how it is used, who processes it for us, and the choices you have. In short: your photos belong to you, they are never shown to other users, never sold, and never used for advertising.'}</p>}
      sections={sections}
    />
  );
}
