"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { GalleryVerticalEnd, Loader } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./user-dropdown";

const navlinks = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#courses", label: "Courses" },
];

export function Header() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2 font-medium">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Studio IO
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        {navlinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="ml-4 md:ml-6 gap-2 flex items-center">
        {isPending ? (
          <Loader className="size-4 animate-spin" />
        ) : session ? (
          <UserDropdown
            user={{
              name: session.user.name || "Unknown User",
              email: session.user.email || "",
              avatar: session.user.image || "",
            }}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "default" })}
          >
            Get Started
          </Link>
        )}
        <div className="md:hidden">
          <MobileNav items={navlinks} />
        </div>
      </div>
    </header>
  );
}
