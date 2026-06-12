export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST")    { res.status(405).json({ ok: false, error: "Method not allowed" }); return; }

  try {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz38ZNFIhYWd4w8QkvEdsxIQcIrT2vmJvOWVwyN3-1oyID0FJjSa7nTSYPoMnFEIGmYvQ/exec";

    const response = await fetch(SCRIPT_URL, {
      method:  "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body:    JSON.stringify(req.body)
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = { ok: true }; }

    res.status(200).json(data);

  } catch(err) {
    res.status(500).json({ ok: false, error: err.toString() });
  }
}
