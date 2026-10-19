export default function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-800 text-xs font-mono text-zinc-600 flex justify-between items-center">
      <span>© {new Date().getFullYear()} Abin Raj K</span>
      <span>hosted on vercel</span>
    </footer>
  );
}