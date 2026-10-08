const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

let API_AUTH_TOKEN: string | null = null;

export function setApiAuthToken(token: string | null) {
  API_AUTH_TOKEN = token;
}

function unwrapData<T>(json: unknown): T {
  if (Array.isArray(json)) return json as T;
  if (json && typeof json === 'object' && 'data' in (json as object)) {
    const data = (json as { data: unknown }).data;
    return (Array.isArray(data) ? data : data) as T;
  }
  return [] as T;
}

function unwrapSingle<T>(json: unknown): T | null {
  if (json && typeof json === 'object' && 'data' in (json as object))
    return (json as { data: unknown }).data as T;
  if (json && typeof json === 'object' && json !== null) return json as T;
  return null;
}

async function get(endpoint: string): Promise<unknown> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Accept: 'application/json',
      ...(API_AUTH_TOKEN ? { Authorization: `Bearer ${API_AUTH_TOKEN}` } : {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

async function apiRequest(
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  body?: object
): Promise<unknown> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(API_AUTH_TOKEN ? { Authorization: `Bearer ${API_AUTH_TOKEN}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const json = text ? (() => { try { return JSON.parse(text); } catch { return null; } })() : null;
  if (!res.ok) {
    const msg = (json && typeof json === 'object' && 'message' in (json as object))
      ? (json as { message: string }).message
      : text || `Request failed ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

export async function fetchResearchAreas() {
  try {
    const json = await get('/api/research-areas/');
    return unwrapData<{ id: number; title: string; description: string }[]>(json);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchAwards() {
  try {
    const json = await get('/api/awards/');
    return unwrapData<{ id: number; name: string; year: number; description: string }[]>(json);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchPublications() {
  try {
    const json = await get('/api/publications/');
    return unwrapData<{ id: number; title: string; authors: string; year: number; abstract: string; pdf_url: string | null }[]>(json);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchTeaching() {
  try {
    const json = await get('/api/teaching/');
    return unwrapData<{ id: number; course_name: string; semester: string; year: number; notes: string }[]>(json);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchEducation() {
  try {
    const json = await get('/api/education/');
    return unwrapData<{ id: number; degree: string; institution: string; field_of_study: string; start_date: string; end_date: string | null; description: string; location: string }[]>(json);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// --- CRUD (dashboard) ---

export type ResearchAreaPayload = { title: string; description: string };
export type PublicationPayload = { title: string; abstract: string; year: number; authors: string; pdf_url?: string | null };
export type AwardPayload = { name: string; year: number; description: string };
export type TeachingPayload = { course_name: string; semester: string; year: number; notes?: string };
export type EducationPayload = { degree: string; institution: string; field_of_study: string; start_date: string; end_date?: string | null; description?: string; location: string };

export async function createResearchArea(payload: ResearchAreaPayload) {
  const json = await apiRequest('POST', '/api/research-areas/', payload);
  return unwrapSingle<{ id: number; title: string; description: string }>(json) ?? payload as { id: number; title: string; description: string };
}
export async function updateResearchArea(id: number, payload: ResearchAreaPayload) {
  const json = await apiRequest('PUT', `/api/research-areas/${id}/`, payload);
  return unwrapSingle<{ id: number; title: string; description: string }>(json) ?? { ...payload, id };
}
export async function deleteResearchArea(id: number) {
  await apiRequest('DELETE', `/api/research-areas/${id}/`);
}

export async function createPublication(payload: PublicationPayload) {
  const json = await apiRequest('POST', '/api/publications/create/', payload);
  return unwrapSingle<{ id: number } & PublicationPayload>(json);
}
export async function updatePublication(id: number, payload: PublicationPayload) {
  const json = await apiRequest('PUT', `/api/publications/${id}/update/`, payload);
  return unwrapSingle<{ id: number } & PublicationPayload>(json);
}
export async function deletePublication(id: number) {
  await apiRequest('DELETE', `/api/publications/${id}/delete/`);
}

export async function createAward(payload: AwardPayload) {
  const json = await apiRequest('POST', '/api/awards/create/', payload);
  return unwrapSingle<{ id: number } & AwardPayload>(json);
}
export async function updateAward(id: number, payload: AwardPayload) {
  const json = await apiRequest('PUT', `/api/awards/${id}/update/`, payload);
  return unwrapSingle<{ id: number } & AwardPayload>(json);
}
export async function deleteAward(id: number) {
  await apiRequest('DELETE', `/api/awards/${id}/delete/`);
}

export async function createTeaching(payload: TeachingPayload) {
  const json = await apiRequest('POST', '/api/teaching/create/', payload);
  return unwrapSingle<{ id: number } & TeachingPayload>(json);
}
export async function updateTeaching(id: number, payload: TeachingPayload) {
  const json = await apiRequest('PUT', `/api/teaching/${id}/update/`, payload);
  return unwrapSingle<{ id: number } & TeachingPayload>(json);
}
export async function deleteTeaching(id: number) {
  await apiRequest('DELETE', `/api/teaching/${id}/delete/`);
}

export async function createEducation(payload: EducationPayload) {
  const json = await apiRequest('POST', '/api/education/create/', payload);
  return unwrapSingle<{ id: number } & EducationPayload>(json);
}
export async function updateEducation(id: number, payload: EducationPayload) {
  const json = await apiRequest('PUT', `/api/education/${id}/update/`, payload);
  return unwrapSingle<{ id: number } & EducationPayload>(json);
}
export async function deleteEducation(id: number) {
  await apiRequest('DELETE', `/api/education/${id}/delete/`);
}
