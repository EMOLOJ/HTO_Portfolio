"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";

type CsvUploadProps<T> = {
  title: string;
  help: string;
  /**
   * Convert a CSV row (header-based object) into a payload for the API.
   * Return null to skip the row.
   */
  mapRow: (row: Record<string, string>) => T | null;
  /**
   * Upload a single mapped payload.
   */
  uploadOne: (payload: T) => Promise<unknown>;
};

export default function CsvUpload<T>({ title, help, mapRow, uploadOne }: CsvUploadProps<T>) {
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });

  const mapped = useMemo(() => {
    const payloads: T[] = [];
    for (const row of rows) {
      const p = mapRow(row);
      if (p) payloads.push(p);
    }
    return payloads;
  }, [rows, mapRow]);

  const onFile = async (file: File) => {
    setError("");
    setRows([]);
    setProgress({ done: 0, total: 0 });

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors?.length) {
          setError(results.errors[0]?.message || "Failed to parse CSV");
          return;
        }
        setRows(results.data.filter(Boolean));
      },
      error: (err) => setError(err.message),
    });
  };

  const uploadAll = async () => {
    setError("");
    setUploading(true);
    setProgress({ done: 0, total: mapped.length });
    try {
      let done = 0;
      for (const payload of mapped) {
        // Sequential upload keeps it simple and avoids rate limiting surprises.
        // If you want parallel uploads later, we can add a concurrency limit.
        await uploadOne(payload);
        done += 1;
        setProgress({ done, total: mapped.length });
      }
      setRows([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="bg-white border border-bark/10 rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-forest">{title}</h3>
          <p className="text-sm text-bark mt-1">{help}</p>
        </div>
        <label className="text-sm text-moss hover:underline cursor-pointer shrink-0">
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onFile(f);
              e.currentTarget.value = "";
            }}
          />
          Choose CSV
        </label>
      </div>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

      {rows.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="text-sm text-bark">
            Parsed <span className="font-medium text-forest">{rows.length}</span> rows → will upload{" "}
            <span className="font-medium text-forest">{mapped.length}</span> items.
          </div>

          <button
            type="button"
            onClick={uploadAll}
            disabled={uploading || mapped.length === 0}
            className="px-4 py-2 rounded bg-moss text-cream hover:bg-bark disabled:opacity-60"
          >
            {uploading ? `Uploading ${progress.done}/${progress.total}…` : "Upload all"}
          </button>
        </div>
      )}
    </section>
  );
}

