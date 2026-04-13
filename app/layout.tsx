import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./styles/globals.scss";
import NavBar from "./components/NavBar/NavBar";
import RouteTransitionWrapper from "./components/RouteTransitionWrapper/RouteTransitionWrapper";
import Footer from "./components/Footer/Footer";
import Aurora from "./components/AnimatedGradientBackdrop/Aurora";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";


const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stevano.dev"),
  title: {
    default: "Stevano Peters - Senior Digital Designer & Developer",
    template: "%s | Stevano Peters - Senior Digital Designer",
  },
  description:
    "Portfolio of Stevano Peters, Senior Digital Designer and front-end developer with 6+ years of experience crafting web apps, websites, UX case studies, and brand identities.",
  openGraph: {
    title: "Stevano Peters - Senior Digital Designer & Developer",
    description:
      "Explore the portfolio of Senior Digital Designer Stevano Peters, featuring web applications, marketing websites, UX case studies, and logos & branding projects.",
    url: "/",
    siteName: "Stevano Peters - Senior Digital Designer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stevano Peters - Senior Digital Designer & Developer",
    description:
      "Senior Digital Designer and front-end developer with 6+ years of experience delivering web apps, marketing websites, UX case studies, and brand identities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <script
          type="application/ld+json"
          // Site-wide Person/WebSite structured data for SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Stevano Peters",
              jobTitle: "Senior Digital Designer",
              url: "https://stevano.dev",
            }),
          }}
        />

        {/* Disable browser scroll restoration before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = 'manual';`,
          }}
        />

        <Aurora />

        <NavBar />

        <main>
          <RouteTransitionWrapper>
            {children}
          </RouteTransitionWrapper>
        </main>

        <Footer />

        <Analytics />
        <SpeedInsights />

      </body>
    </html>
  );
}
