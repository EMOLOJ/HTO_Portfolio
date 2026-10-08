"use client";

import { useEffect, useState } from "react";
import {
  fetchPublications,
  createPublication,
  updatePublication,
  deletePublication,
  type PublicationPayload,
} from "../../../lib/api";
import CsvUpload from "./CsvUpload";

type Publication = {
  id: number;
  title: string;
  authors: string;
  year: number;
  abstract: string;
  pdf_url: string | null;
};

export default function PublicationCrud() {
  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Publication | null>(null);
  const [form, setForm] = useState<PublicationPayload>({
    title: "",
    abstract: "",
    year: new Date().getFullYear(),
    authors: "",
    pdf_url: "",
  });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError("");
    fetchPublications()
      .then(setItems)
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      title: "",
      abstract: "",
      year: new Date().getFullYear(),
      authors: "",
      pdf_url: "",
    });
  };
  const openEdit = (item: Publication) => {
    setEditing(item);
    setForm({
      title: item.title,
      abstract: item.abstract,
      year: item.year,
      authors: item.authors,
      pdf_url: item.pdf_url ?? "",
    });
  };
  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    setError("");
    try {
      const payload: PublicationPayload = {
        ...form,
        pdf_url: form.pdf_url?.trim() || null,
      };
      if (editing) {
        await updatePublication(editing.id, payload);
      } else {
        await createPublication(payload);
      }
      setEditing(null);
      openAdd();
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this publication?")) return;
    setError("");
    try {
      await deletePublication(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-forest">Publications</h2>
        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2 rounded-lg bg-moss text-cream hover:bg-bark transition"
        >
          Add publication
        </button>
      </div>
      <CsvUpload<PublicationPayload>
        title="Batch upload (CSV)"
        help='Headers: "title", "authors", "year", "abstract", "pdf_url". Rows with empty title are skipped.'
        mapRow={(row) => {
          const title = (row.title ?? row.Title ?? "").trim();
          const authors = (row.authors ?? row.Authors ?? "").trim();
          const abstract = (row.abstract ?? row.Abstract ?? "").trim();
          const pdf_url = (row.pdf_url ?? row.pdfUrl ?? row.PDF ?? row.Pdf ?? "").trim() || null;
          const yearRaw = (row.year ?? row.Year ?? "").trim();
          const year = parseInt(yearRaw, 10);
          if (!title) return null;
          return {
            title,
            authors,
            abstract,
            year: Number.isFinite(year) ? year : new Date().getFullYear(),
            pdf_url,
          };
        }}
        uploadOne={(payload) => createPublication(payload)}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {(editing || form.title || form.abstract || form.authors) && (
        <div className="bg-white rounded-lg border border-bark/20 p-4 shadow">
          <h3 className="font-semibold mb-3">{editing ? "Edit" : "New"} publication</h3>
          <div className="grid gap-3 max-w-lg">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <input
              placeholder="Authors (comma-separated)"
              value={form.authors}
              onChange={(e) => setForm((f) => ({ ...f, authors: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <input
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value, 10) || 0 }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest w-24"
            />
            <textarea
              placeholder="Abstract"
              value={form.abstract}
              onChange={(e) => setForm((f) => ({ ...f, abstract: e.target.value }))}
              rows={3}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <input
              placeholder="PDF URL (optional)"
              value={form.pdf_url ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, pdf_url: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="px-4 py-2 rounded bg-moss text-cream hover:bg-bark disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => { setEditing(null); openAdd(); }}
                className="px-4 py-2 rounded border border-bark/30 hover:bg-bark/10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <p className="text-moss">Loading…</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-4 py-2 px-3 rounded bg-white border border-bark/10"
            >
              <div className="min-w-0">
                <span className="font-medium">{item.title}</span>
                <span className="text-bark text-sm ml-2">({item.year})</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button type="button" onClick={() => openEdit(item)} className="text-moss hover:underline text-sm">Edit</button>
                <button type="button" onClick={() => remove(item.id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!loading && items.length === 0 && (
        <p className="text-bark">No publications yet. Add one above.</p>
      )}
    </div>
  );
}
