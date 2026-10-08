export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-forest">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Sorry, this page could not be found.</p>
      <a href="/" className="px-6 py-2 rounded bg-moss text-cream hover:bg-bark transition">Go Home</a>
      <div className="mt-12 text-bark text-sm">Nature-themed portfolio</div>
    </div>
  );
} 