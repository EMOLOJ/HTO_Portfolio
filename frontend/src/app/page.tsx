import Link from "next/link";

export default function Home() {
  return (
    <article className="py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-6">
          About
        </h1>
        <div className="text-bark leading-relaxed space-y-4">
          <p>
            Write your biography here. Tell the world about yourself. You can put a picture in the sidebar.
          </p>
          <p>
            This is an academic portfolio: research areas, publications, awards, teaching, and education. 
            Use the links in the sidebar to explore.
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-bark/10">
          <p className="text-sm text-bark mb-3">Quick links</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/research" className="text-moss hover:underline font-medium">Research</Link>
            <Link href="/publications" className="text-moss hover:underline font-medium">Publications</Link>
            <Link href="/awards" className="text-moss hover:underline font-medium">Awards</Link>
            <Link href="/teaching" className="text-moss hover:underline font-medium">Teaching</Link>
            <Link href="/education" className="text-moss hover:underline font-medium">Education</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
