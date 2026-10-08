"use client";

import { useEffect, useState } from "react";
import {
  fetchTeaching,
  createTeaching,
  updateTeaching,
  deleteTeaching,
  type TeachingPayload,
} from "../../../lib/api";
import CsvUpload from "./CsvUpload";

type Teaching = { id: number; course_name: string; semester: string; year: number; notes: string };

const SEMESTERS = ["FALL", "SPRING", "SUMMER"] as const;

export default function TeachingCrud() {
  const [items, setItems] = useState<Teaching[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Teaching | null>(null);
  const [form, setForm] = useState<TeachingPayload>({
    course_name: "",
    semester: "FALL",
    year: new Date().getFullYear(),
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError("");
    fetchTeaching()
      .then(setItems)
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const openAdd = () => {
    setEditing(null);
    setForm({ course_name: "", semester: "FALL", year: new Date().getFullYear(), notes: "" });
  };
  const openEdit = (item: Teaching) => {
    setEditing(item);
    setForm({ course_name: item.course_name, semester: item.semester, year: item.year, notes: item.notes });
  };
  const save = async () => {
    if (!form.course_name.trim()) return;
    setSaving(true);
    setError("");
    try {
      if (editing) await updateTeaching(editing.id, form);
      else await createTeaching(form);
      setEditing(null);
      setForm({ course_name: "", semester: "FALL", year: new Date().getFullYear(), notes: "" });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this teaching entry?")) return;
    setError("");
    try {
      await deleteTeaching(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-forest">Teaching</h2>
        <button type="button" onClick={openAdd} className="px-4 py-2 rounded-lg bg-moss text-cream hover:bg-bark transition">
          Add course
        </button>
      </div>
      <CsvUpload<TeachingPayload>
        title="Batch upload (CSV)"
        help='Headers: "course_name", "semester" (FALL/SPRING/SUMMER), "year", "notes". Rows with empty course_name are skipped.'
        mapRow={(row) => {
          const course_name = (row.course_name ?? row.course ?? row.Course ?? "").trim();
          const semester = (row.semester ?? row.Semester ?? "FALL").trim().toUpperCase();
          const yearRaw = (row.year ?? row.Year ?? "").trim();
          const year = parseInt(yearRaw, 10);
          const notes = (row.notes ?? row.Notes ?? row.description ?? row.Description ?? "").trim();
          if (!course_name) return null;
          return {
            course_name,
            semester: (SEMESTERS as readonly string[]).includes(semester) ? semester : "FALL",
            year: Number.isFinite(year) ? year : new Date().getFullYear(),
            notes,
          };
        }}
        uploadOne={(payload) => createTeaching(payload)}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {(editing || form.course_name || form.notes) && (
        <div className="bg-white rounded-lg border border-bark/20 p-4 shadow">
          <h3 className="font-semibold mb-3">{editing ? "Edit" : "New"} teaching</h3>
          <div className="grid gap-3 max-w-md">
            <input
              placeholder="Course name"
              value={form.course_name}
              onChange={(e) => setForm((f) => ({ ...f, course_name: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <div className="flex gap-4 items-center">
              <select
                value={form.semester}
                onChange={(e) => setForm((f) => ({ ...f, semester: e.target.value }))}
                className="border border-bark/30 rounded px-3 py-2 text-forest"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Year"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value, 10) || 0 }))}
                className="border border-bark/30 rounded px-3 py-2 text-forest w-24"
              />
            </div>
            <textarea
              placeholder="Notes (optional)"
              value={form.notes ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <div className="flex gap-2">
              <button type="button" onClick={save} disabled={saving} className="px-4 py-2 rounded bg-moss text-cream hover:bg-bark disabled:opacity-50">
                {saving ? "Saving…" : "Save"}
              </button>
              <button type="button" onClick={() => { setEditing(null); openAdd(); }} className="px-4 py-2 rounded border border-bark/30 hover:bg-bark/10">
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
                <span className="font-medium">{item.course_name}</span>
                <span className="text-bark text-sm ml-2">{item.semester} {item.year}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button type="button" onClick={() => openEdit(item)} className="text-moss hover:underline text-sm">Edit</button>
                <button type="button" onClick={() => remove(item.id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!loading && items.length === 0 && <p className="text-bark">No teaching entries yet. Add one above.</p>}
    </div>
  );
}
