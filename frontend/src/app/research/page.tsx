"use client";

import { fetchResearchAreas } from '../../lib/api';
import { useEffect, useState } from 'react';

interface ResearchArea {
  id: number;
  title: string;
  description: string;
}

export default function ResearchPage() {
  const [areas, setAreas] = useState<ResearchArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResearchAreas()
      .then(data => setAreas(data))
      .catch(() => setError('Failed to load research areas.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-4 text-forest">
        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Research areas</h1>
          <p className="text-bark text-sm md:text-base max-w-2xl">
            A snapshot of current research themes, laid out in a simple card grid
            inspired by the al-folio people page.
          </p>
        </header>
        {loading && <div className="text-moss">Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && areas.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 border border-bark/10">
            No research areas found.
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {areas.map(area => (
            <article
              key={area.id}
              className="bg-white rounded-lg shadow-sm border border-bark/10 p-5 flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-2 text-forest">
                {area.title}
              </h2>
              <p className="text-bark text-sm leading-relaxed">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 