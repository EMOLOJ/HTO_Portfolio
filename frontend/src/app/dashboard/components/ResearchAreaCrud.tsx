"use client";

import { useEffect, useState } from "react";
import {
  fetchResearchAreas,
  createResearchArea,
  updateResearchArea,
  deleteResearchArea,
  type ResearchAreaPayload,
} from "../../../lib/api";
import CsvUpload from "./CsvUpload";

type ResearchArea = { id: number; title: string; description: string };

export default function ResearchAreaCrud() {
  const [items, setItems] = useState<ResearchArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<ResearchArea | null>(null);
  const [form, setForm] = useState<ResearchAreaPayload>({ title: "", description: "" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError("");
    fetchResearchAreas()
      .then(setItems)
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", description: "" });
  };
  const openEdit = (item: ResearchArea) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description });
  };
  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    setError("");
    try {
      if (editing) {
        await updateResearchArea(editing.id, form);
      } else {
        await createResearchArea(form);
      }
      setEditing(null);
      setForm({ title: "", description: "" });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this research area?")) return;
    setError("");
    try {
      await deleteResearchArea(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-forest">Research areas</h2>
        <button
          type="button"
          onClick={openAdd}
          className="px-4 py-2 rounded-lg bg-moss text-cream hover:bg-bark transition"
        >
          Add research area
        </button>
      </div>
      <CsvUpload<ResearchAreaPayload>
        title="Batch upload (CSV)"
        help='Headers: "title", "description". Rows with an empty title are skipped.'
        mapRow={(row) => {
          const title = (row.title ?? row.Title ?? "").trim();
          const description = (row.description ?? row.Description ?? "").trim();
          if (!title) return null;
          return { title, description };
        }}
        uploadOne={(payload) => createResearchArea(payload)}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {(editing || form.title || form.description) && (
        <div className="bg-white rounded-lg border border-bark/20 p-4 shadow">
          <h3 className="font-semibold mb-3">{editing ? "Edit" : "New"} research area</h3>
          <div className="grid gap-3 max-w-md">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
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
                onClick={() => { setEditing(null); setForm({ title: "", description: "" }); }}
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
              <div>
                <span className="font-medium">{item.title}</span>
                {item.description && (
                  <span className="text-bark text-sm ml-2 truncate max-w-md inline-block align-bottom">
                    {item.description.slice(0, 60)}…
                  </span>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="text-moss hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!loading && items.length === 0 && (
        <p className="text-bark">No research areas yet. Add one above.</p>
      )}
    </div>
  );
}
