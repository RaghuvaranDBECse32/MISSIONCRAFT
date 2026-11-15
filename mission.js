// Vercel Node.js Function. Supabase credentials must stay in server-side env vars.
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(503).json({ error: 'Cloud database is not configured. Local browser save is still available.' });
  const base = url.replace(/\/$/, '') + '/rest/v1/mission_saves';
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  try {
    if (req.method === 'POST') {
      const body = req.body || {};
      const { sessionId, payload } = body;
      if (typeof sessionId !== 'string' || !/^[a-zA-Z0-9-]{12,80}$/.test(sessionId)) return res.status(400).json({ error: 'Invalid session ID.' });
      if (!payload || typeof payload !== 'object' || JSON.stringify(payload).length > 20000) return res.status(400).json({ error: 'Invalid or oversized mission payload.' });
      const response = await fetch(base + '?on_conflict=session_id', { method: 'POST', headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ session_id: sessionId, payload, updated_at: new Date().toISOString() }) });
      if (!response.ok) return res.status(502).json({ error: 'Database write failed.', detail: (await response.text()).slice(0, 300) });
      return res.status(200).json({ ok: true, saved: true });
    }
    if (req.method === 'GET') {
      const sessionId = req.query?.sessionId || new URL(req.url, 'https://example.com').searchParams.get('sessionId');
      if (typeof sessionId !== 'string' || !/^[a-zA-Z0-9-]{12,80}$/.test(sessionId)) return res.status(400).json({ error: 'Invalid session ID.' });
      const response = await fetch(base + '?session_id=eq.' + encodeURIComponent(sessionId) + '&select=payload,updated_at&limit=1', { headers });
      if (!response.ok) return res.status(502).json({ error: 'Database read failed.' });
      const rows = await response.json();
      return res.status(200).json(rows[0] || { payload: null });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    return res.status(500).json({ error: 'Mission storage service error.', detail: error.message });
  }
};
