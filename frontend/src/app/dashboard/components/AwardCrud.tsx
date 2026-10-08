"use client";

import { useEffect, useState } from "react";
import {
  fetchAwards,
  createAward,
  updateAward,
  deleteAward,
  type AwardPayload,
} from "../../../lib/api";
import CsvUpload from "./CsvUpload";

type Award = { id: number; name: string; year: number; description: string };

export default function AwardCrud() {
  const [items, setItems] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Award | null>(null);
  const [form, setForm] = useState<AwardPayload>({ name: "", year: new Date().getFullYear(), description: "" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError("");
    fetchAwards()
      .then(setItems)
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", year: new Date().getFullYear(), description: "" });
  };
  const openEdit = (item: Award) => {
    setEditing(item);
    setForm({ name: item.name, year: item.year, description: item.description });
  };
  const save = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    setError("");
    try {
      if (editing) await updateAward(editing.id, form);
      else await createAward(form);
      setEditing(null);
      setForm({ name: "", year: new Date().getFullYear(), description: "" });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this award?")) return;
    setError("");
    try {
      await deleteAward(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-forest">Awards</h2>
        <button type="button" onClick={openAdd} className="px-4 py-2 rounded-lg bg-moss text-cream hover:bg-bark transition">
          Add award
        </button>
      </div>
      <CsvUpload<AwardPayload>
        title="Batch upload (CSV)"
        help='Headers: "name", "year", "description". Rows with empty name are skipped.'
        mapRow={(row) => {
          const name = (row.name ?? row.Name ?? "").trim();
          const yearRaw = (row.year ?? row.Year ?? "").trim();
          const year = parseInt(yearRaw, 10);
          const description = (row.description ?? row.Description ?? "").trim();
          if (!name) return null;
          return { name, year: Number.isFinite(year) ? year : new Date().getFullYear(), description };
        }}
        uploadOne={(payload) => createAward(payload)}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {(editing || form.name || form.description) && (
        <div className="bg-white rounded-lg border border-bark/20 p-4 shadow">
          <h3 className="font-semibold mb-3">{editing ? "Edit" : "New"} award</h3>
          <div className="grid gap-3 max-w-md">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
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
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <div className="flex gap-2">
              <button type="button" onClick={save} disabled={saving} className="px-4 py-2 rounded bg-moss text-cream hover:bg-bark disabled:opacity-50">
                {saving ? "Saving…" : "Save"}
              </button>
              <button type="button" onClick={() => { setEditing(null); setForm({ name: "", year: new Date().getFullYear(), description: "" }); }} className="px-4 py-2 rounded border border-bark/30 hover:bg-bark/10">
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
            <li key={item.id} className="flex items-center justify-between gap-4 py-2 px-3 rounded bg-white border border-bark/10">
              <div>
                <span className="font-medium">{item.name}</span>
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
      {!loading && items.length === 0 && <p className="text-bark">No awards yet. Add one above.</p>}
    </div>
  );
}
