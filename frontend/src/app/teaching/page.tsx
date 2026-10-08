"use client";

import { fetchTeaching } from '../../lib/api';
import { useEffect, useState } from 'react';

interface Teaching {
  id: number;
  course_name: string;
  semester: string;
  year: number;
  notes: string;
}

export default function TeachingPage() {
  const [teaching, setTeaching] = useState<Teaching[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeaching()
      .then(data => setTeaching(data))
      .catch(() => setError('Failed to load teaching data.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-4 text-forest">
        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Teaching</h1>
          <p className="text-bark text-sm md:text-base max-w-2xl">
            Courses and teaching experiences, listed in a clean block layout to
            match the understated style of the al-folio theme.
          </p>
        </header>
        {loading && <div className="text-moss">Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && teaching.length === 0 && (
          <div className="bg-white rounded-lg shadow p-6 border border-bark/10">
            No teaching data found.
          </div>
        )}
        <div className="space-y-4">
          {teaching.map(item => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-bark/10 p-5 flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-1 text-forest">
                {item.course_name}
              </h2>
              <p className="text-moss text-sm mb-2">
                {item.semester} {item.year}
              </p>
              {item.notes && (
                <p className="text-bark text-sm leading-relaxed">{item.notes}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 