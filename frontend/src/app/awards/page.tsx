"use client";

import { fetchAwards } from '../../lib/api';
import { useEffect, useState } from 'react';

interface Award {
  id: number;
  name: string;
  year: number;
  description: string;
}

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAwards()
      .then(data => setAwards(data))
      .catch(() => setError('Failed to load awards.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-4 text-forest">
        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Awards</h1>
          <p className="text-bark text-sm md:text-base max-w-2xl">
            Honors and distinctions presented in a simple card grid, echoing the
            clean blocks from the al-folio people layout.
          </p>
        </header>
        {loading && <div className="text-moss">Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && awards.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 border border-bark/10">
            No awards found.
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {awards.map(award => (
            <article
              key={award.id}
              className="bg-white rounded-lg shadow-sm border border-bark/10 p-5 flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-1 text-forest">
                {award.name}
              </h2>
              <p className="text-moss text-sm mb-2">{award.year}</p>
              <p className="text-bark text-sm leading-relaxed">
                {award.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 