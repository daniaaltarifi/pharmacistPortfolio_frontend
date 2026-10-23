// In dev, Vite proxies /api to the Express server. In production, set VITE_API_URL to the deployed server origin.
const API_URL = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(data.error || 'Something went wrong. Please try again.')
    error.status = res.status // lets callers tell "not found" (404) apart from "server down"
    throw error
  }
  return data
}

export function sendContactMessage(payload) {
  return request('/contact', { method: 'POST', body: JSON.stringify(payload) })
}

export async function getExperiences({ signal } = {}) {
  const { data } = await request('/experiences', { signal })
  return data
}

export async function getAccomplishments({ signal } = {}) {
  const { data } = await request('/accomplishments', { signal })
  return data
}

export async function getProfiles({ signal } = {}) {
  const { data } = await request('/profiles', { signal })
  return data
}

export async function getProfile(id, { signal } = {}) {
  const { data } = await request(`/profiles/${encodeURIComponent(id)}`, { signal })
  return data
}

export async function getMemberships({ signal } = {}) {
  const { data } = await request('/memberships', { signal })
  return data
}

export async function getMembership(id, { signal } = {}) {
  const { data } = await request(`/memberships/${encodeURIComponent(id)}`, { signal })
  return data
}

export async function getNews({ signal } = {}) {
  const { data } = await request('/news', { signal })
  return data
}

export async function getNewsItem(id, { signal } = {}) {
  const { data } = await request(`/news/${encodeURIComponent(id)}`, { signal })
  return data
}

export async function getEvents({ signal } = {}) {
  const { data } = await request('/events', { signal })
  return data
}

export async function getEvent(id, { signal } = {}) {
  const { data } = await request(`/events/${encodeURIComponent(id)}`, { signal })
  return data
}

export async function getAwards({ signal } = {}) {
  const { data } = await request('/awards', { signal })
  return data
}

export async function getAward(id, { signal } = {}) {
  const { data } = await request(`/awards/${encodeURIComponent(id)}`, { signal })
  return data
}

export async function getTrainings({ signal } = {}) {
  const { data } = await request('/trainings', { signal })
  return data
}

export async function getSkills({ signal } = {}) {
  const { data } = await request('/skills', { signal })
  return data
}

export async function getCertifications({ signal } = {}) {
  const { data } = await request('/certifications', { signal })
  return data
}

export async function getCertification(id, { signal } = {}) {
  const { data } = await request(`/certifications/${encodeURIComponent(id)}`, { signal })
  return data
}

export async function getProjects({ signal } = {}) {
  const { data } = await request('/projects', { signal })
  return data
}

export async function getProject(id, { signal } = {}) {
  const { data } = await request(`/projects/${encodeURIComponent(id)}`, { signal })
  return data
}

export async function getReports({ signal } = {}) {
  const { data } = await request('/reports', { signal })
  return data
}

export async function getReport(id, { signal } = {}) {
  const { data } = await request(`/reports/${encodeURIComponent(id)}`, { signal })
  return data
}

export async function getGallery({ signal } = {}) {
  const { data } = await request('/gallery', { signal })
  return data
}

export async function getAccomplishment(id, { signal } = {}) {
  const { data } = await request(`/accomplishments/${encodeURIComponent(id)}`, { signal })
  return data
}
