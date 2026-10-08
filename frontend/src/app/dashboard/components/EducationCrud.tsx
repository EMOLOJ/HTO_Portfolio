"use client";

import { useEffect, useState } from "react";
import {
  fetchEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  type EducationPayload,
} from "../../../lib/api";
import CsvUpload from "./CsvUpload";

type Education = {
  id: number;
  degree: string;
  institution: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string;
  location: string;
};

export default function EducationCrud() {
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Education | null>(null);
  const [form, setForm] = useState<EducationPayload>({
    degree: "",
    institution: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    description: "",
    location: "",
  });
  const [saving, setSaving] = useState(false);

  const emptyForm: EducationPayload = {
    degree: "",
    institution: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    description: "",
    location: "",
  };

  const load = () => {
    setLoading(true);
    setError("");
    fetchEducation()
      .then(setItems)
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
  };
  const openEdit = (item: Education) => {
    setEditing(item);
    setForm({
      degree: item.degree,
      institution: item.institution,
      field_of_study: item.field_of_study,
      start_date: item.start_date,
      end_date: item.end_date ?? "",
      description: item.description ?? "",
      location: item.location,
    });
  };
  const save = async () => {
    if (!form.degree.trim() || !form.institution.trim()) return;
    setSaving(true);
    setError("");
    try {
      const payload: EducationPayload = {
        ...form,
        end_date: form.end_date?.trim() || null,
        description: form.description?.trim() || "",
      };
      if (editing) await updateEducation(editing.id, payload);
      else await createEducation(payload);
      setEditing(null);
      setForm(emptyForm);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this education entry?")) return;
    setError("");
    try {
      await deleteEducation(id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-forest">Education</h2>
        <button type="button" onClick={openAdd} className="px-4 py-2 rounded-lg bg-moss text-cream hover:bg-bark transition">
          Add education
        </button>
      </div>
      <CsvUpload<EducationPayload>
        title="Batch upload (CSV)"
        help='Headers: "degree", "institution", "field_of_study", "start_date", "end_date", "location", "description". Rows missing degree/institution are skipped.'
        mapRow={(row) => {
          const degree = (row.degree ?? row.Degree ?? "").trim();
          const institution = (row.institution ?? row.Institution ?? "").trim();
          const field_of_study = (row.field_of_study ?? row.field ?? row.Field ?? "").trim();
          const start_date = (row.start_date ?? row.start ?? row.Start ?? "").trim();
          const end_date = (row.end_date ?? row.end ?? row.End ?? "").trim() || null;
          const location = (row.location ?? row.Location ?? "").trim();
          const description = (row.description ?? row.Description ?? "").trim();
          if (!degree || !institution) return null;
          return { degree, institution, field_of_study, start_date, end_date, location, description };
        }}
        uploadOne={(payload) => createEducation(payload)}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {(editing || form.degree || form.institution) && (
        <div className="bg-white rounded-lg border border-bark/20 p-4 shadow">
          <h3 className="font-semibold mb-3">{editing ? "Edit" : "New"} education</h3>
          <div className="grid gap-3 max-w-md">
            <input
              placeholder="Degree"
              value={form.degree}
              onChange={(e) => setForm((f) => ({ ...f, degree: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <input
              placeholder="Institution"
              value={form.institution}
              onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <input
              placeholder="Field of study"
              value={form.field_of_study}
              onChange={(e) => setForm((f) => ({ ...f, field_of_study: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <div className="flex gap-2">
              <input
                placeholder="Start date (YYYY-MM-DD)"
                value={form.start_date}
                onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                className="border border-bark/30 rounded px-3 py-2 text-forest flex-1"
              />
              <input
                placeholder="End date or blank"
                value={form.end_date ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
                className="border border-bark/30 rounded px-3 py-2 text-forest flex-1"
              />
            </div>
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <textarea
              placeholder="Description (optional)"
              value={form.description ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="border border-bark/30 rounded px-3 py-2 text-forest"
            />
            <div className="flex gap-2">
              <button type="button" onClick={save} disabled={saving} className="px-4 py-2 rounded bg-moss text-cream hover:bg-bark disabled:opacity-50">
                {saving ? "Saving…" : "Save"}
              </button>
              <button type="button" onClick={() => { setEditing(null); setForm(emptyForm); }} className="px-4 py-2 rounded border border-bark/30 hover:bg-bark/10">
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
                <span className="font-medium">{item.degree} in {item.field_of_study}</span>
                <span className="text-bark text-sm ml-2">— {item.institution}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button type="button" onClick={() => openEdit(item)} className="text-moss hover:underline text-sm">Edit</button>
                <button type="button" onClick={() => remove(item.id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!loading && items.length === 0 && <p className="text-bark">No education entries yet. Add one above.</p>}
    </div>
  );
}
