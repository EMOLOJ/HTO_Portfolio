import Link from "next/link";

export default function ProfileCard() {
  return (
    <div className="mb-6">
      <Link href="/" className="block group">
        <div className="w-24 h-24 rounded-full bg-moss/90 mx-auto mb-3 flex items-center justify-center text-3xl text-cream font-semibold ring-2 ring-bark/10 group-hover:ring-moss transition">
          <span aria-hidden>👩‍🎓</span>
        </div>
        <h2 className="text-center font-bold text-forest text-lg group-hover:text-moss transition">
          Academic Portfolio
        </h2>
      </Link>
      <p className="text-center text-bark text-xs mt-1">
        Research · Publications · Teaching
      </p>
    </div>
  );
}
