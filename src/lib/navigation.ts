export type NavItem = {
  href: string;
  title: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { href: "/", title: "Home" },
  { href: "/how-it-works", title: "How It Works" },
  { href: "/safety", title: "Safety & Risk" },
  { href: "/live-demo", title: "Live Demo" },
  { href: "/pricing", title: "Pricing" },
  { href: "/research", title: "Research" },
  { href: "/status", title: "Status" },
];

export const utilityNav: NavItem[] = [
  { href: "/motion-playground", title: "Motion Controls" },
  { href: "/blog", title: "Blog" },
  { href: "/contact", title: "Contact" },
];

export const complianceLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/risk-disclosure", label: "Risk Disclosure" },
  { href: "/consent", label: "Consent Preferences" },
] as const;
