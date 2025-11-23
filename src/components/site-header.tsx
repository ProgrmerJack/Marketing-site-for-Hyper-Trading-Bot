"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Container } from "@hyper/ui";
import { primaryNav, utilityNav } from "@/lib/navigation";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass sticky top-0 z-50 border-b border-border backdrop-blur-xl shadow-md"
    >
      <Container className="flex h-24 items-center justify-between gap-8 px-6 md:px-10">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-4 group">
            <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 ring-2 ring-primary/30 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:ring-primary/50 group-hover:scale-105">
              <span className="block h-7 w-7 rounded-full bg-white dark:bg-[rgb(var(--card))] group-hover:scale-110 transition-transform shadow-lg" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                Hyper Trading <span className="text-primary">Automation</span>
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                Demo only · No guarantees
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          {utilityNav.map((item) => (
            <NavLink key={item.href} href={item.href} subtle>
              {item.title}
            </NavLink>
          ))}
          <ThemeToggle />
          <CallToActionLink href="/contact">
            Request gated access
          </CallToActionLink>
        </div>

        <button
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary hover:bg-muted dark:bg-[rgb(var(--card))/0.08] dark:hover:bg-[rgb(var(--card))/0.12] transition-all duration-300 lg:hidden shadow-md backdrop-blur"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-border bg-secondary backdrop-blur-xl"
          >
            <Container className="flex flex-col gap-6 py-8">
              <nav className="flex flex-col gap-3">
                {[...primaryNav, ...utilityNav].map((item) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    onNavigate={() => setOpen(false)}
                  >
                    {item.title}
                  </MobileNavLink>
                ))}
              </nav>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <CallToActionLink href="/contact">
                  Request gated access
                </CallToActionLink>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
  subtle = false,
}: {
  href: string;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Link
        href={href as Route}
        className={clsx(
          "relative text-sm font-semibold transition-colors duration-300",
          subtle
            ? "text-muted-foreground hover:text-foreground"
            : "text-foreground/80 hover:text-foreground",
          "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full",
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}

function MobileNavLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href as Route}
      className="rounded-xl border border-border bg-card backdrop-blur px-5 py-4 text-base font-medium text-foreground hover:bg-muted transition-colors"
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

function CallToActionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href as Route}
        className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-blue-600 px-9 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {children}
      </Link>
    </motion.div>
  );
}
