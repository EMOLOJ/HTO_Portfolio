"use client";

import { fetchPublications } from '../../lib/api';
import { useEffect, useState } from 'react';

interface Publication {
  id: number;
  title: string;
  authors: string;
  year: number;
  abstract: string;
  pdf_url: string | null;
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPublications()
      .then(data => setPublications(data))
      .catch(() => setError('Failed to load publications.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-4 text-forest">
        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Publications</h1>
          <p className="text-bark text-sm md:text-base max-w-2xl">
            Selected publications listed in a clean vertical layout, similar to the
            bibliographic style in al-folio.
          </p>
        </header>
        {loading && <div className="text-moss">Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && publications.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 border border-bark/10">
            No publications found.
          </div>
        )}
        <div className="space-y-4">
          {publications.map(pub => (
            <article
              key={pub.id}
              className="bg-white rounded-lg shadow-sm border border-bark/10 p-5"
            >
              <h2 className="text-lg font-semibold mb-1 text-forest">
                {pub.title}
              </h2>
              <p className="text-bark text-sm mb-1">
                {pub.authors} ({pub.year})
              </p>
              {pub.abstract && (
                <p className="text-bark text-sm mb-2 leading-relaxed">
                  {pub.abstract}
                </p>
              )}
              {pub.pdf_url && (
                <a
                  href={pub.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moss hover:underline text-sm"
                >
                  PDF →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 