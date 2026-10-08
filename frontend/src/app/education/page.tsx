"use client";

import { fetchEducation } from '../../lib/api';
import { useEffect, useState } from 'react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string;
  location: string;
}

export default function EducationPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEducation()
      .then(data => setItems(data))
      .catch(() => setError('Failed to load education.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-4 text-forest">
        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Education</h1>
          <p className="text-bark text-sm md:text-base max-w-2xl">
            Academic background and degrees.
          </p>
        </header>
        {loading && <div className="text-moss">Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && items.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 border border-bark/10">No education entries found.</div>
        )}
        <div className="space-y-4">
          {items.map(item => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-bark/10 p-5 flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-1 text-forest">{item.degree} in {item.field_of_study}</h2>
              <p className="text-moss font-medium text-sm">{item.institution}</p>
              <p className="text-bark text-sm mb-2">{item.location} · {item.start_date} – {item.end_date || 'Present'}</p>
              {item.description && <p className="text-bark text-sm leading-relaxed">{item.description}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
