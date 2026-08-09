import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-800 py-6 text-center text-sm text-zinc-400">

      <div className="flex flex-wrap justify-center gap-4 mb-4">

        <Link
          href="/disclaimer"
          className="hover:text-yellow-400"
        >
          Disclaimer
        </Link>

        <Link
          href="/privacy"
          className="hover:text-cyan-400"
        >
          Privacy Policy
        </Link>

        <Link
          href="/terms"
          className="hover:text-green-400"
        >
          Terms & Conditions
        </Link>

        <Link
          href="/contact"
          className="hover:text-blue-400"
        >
          Contact
        </Link>

      </div>

      <p>
        © 2026 AI-Signal. All Rights Reserved. _ sonu
      </p>

    </footer>
  );
}
