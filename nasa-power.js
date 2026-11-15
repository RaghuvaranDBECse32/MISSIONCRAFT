// Server-side proxy for NASA POWER daily point data (no NASA API key required for this endpoint).
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'Method not allowed.' }); }
  const q = req.query || new URL(req.url, 'https://example.com').searchParams;
  const latitude = Number(q.latitude ?? q.get?.('latitude'));
  const longitude = Number(q.longitude ?? q.get?.('longitude'));
  const start = String(q.start ?? q.get?.('start') ?? '20240101');
  const end = String(q.end ?? q.get?.('end') ?? '20240107');
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) return res.status(400).json({ error: 'Valid latitude and longitude are required.' });
  if (!/^\d{8}$/.test(start) || !/^\d{8}$/.test(end) || start > end) return res.status(400).json({ error: 'Dates must be YYYYMMDD and start must not follow end.' });
  const endpoint = new URL('https://power.larc.nasa.gov/api/temporal/daily/point');
  endpoint.search = new URLSearchParams({ parameters: 'ALLSKY_SFC_SW_DWN', community: 'RE', longitude: String(longitude), latitude: String(latitude), start, end, format: 'JSON' }).toString();
  try {
    const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!response.ok) return res.status(502).json({ error: `NASA POWER returned HTTP ${response.status}.` });
    const data = await response.json();
    const values = data?.properties?.parameter?.ALLSKY_SFC_SW_DWN || {};
    const days = Object.entries(values).filter(([, value]) => Number.isFinite(Number(value)) && Number(value) >= 0).map(([date, value]) => ({ date, value: Number(value) }));
    return res.status(200).json({ source: 'NASA POWER', parameter: 'ALLSKY_SFC_SW_DWN', units: 'kWh/m²/day', latitude, longitude, start, end, days });
  } catch (error) {
    return res.status(502).json({ error: 'Could not retrieve NASA POWER data.', detail: error.message });
  }
};
