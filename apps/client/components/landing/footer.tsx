import Link from "next/link";
import { FileText, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:flex-row md:py-8">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <p className="text-sm font-medium">
            CollabEdit &copy; {new Date().getFullYear()}
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-sm hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/about" className="text-sm hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/blog" className="text-sm hover:underline underline-offset-4">
            Blog
          </Link>
          <Link href="/contact" className="text-sm hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="https://twitter.com" aria-label="Twitter" className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://github.com" aria-label="GitHub" className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://linkedin.com" aria-label="LinkedIn" className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}