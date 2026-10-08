import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-bark/10 py-6 mt-auto">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-bark">
        <span>&copy; {new Date().getFullYear()} Academic Portfolio</span>
        <Link href="/" className="hover:text-moss transition">Home</Link>
      </div>
    </footer>
  );
} 