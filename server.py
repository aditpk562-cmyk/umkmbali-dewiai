#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
UMKMBali — Server lokal (Python stdlib, tanpa dependency tambahan)
=================================================================
Melayani file statis (front-end) DAN memproksi obrolan ke AI.

Dua provider AI didukung, dipilih otomatis berdasarkan env var:
  1. Gemini  (GRATIS, tanpa kartu kredit) -> set GEMINI_API_KEY   [REKOMENDASI]
  2. OpenAI  (berbayar)                   -> set OPENAI_API_KEY
  3. Lokal  (knowledge-base DewiAI)       -> jika tidak ada key sama sekali

Cara menjalankan (Windows PowerShell):

  # Opsi A — PAKAI GEMINI GRATIS (rekomendasi):
  #    1. Salin .env.example menjadi .env
  #    2. Isi GEMINI_API_KEY di dalam .env
  #    3. Jalankan:
  python server.py

  # Opsi B — pakai OpenAI (berbayar):
  $env:OPENAI_API_KEY = "sk-..."
  python server.py

  lalu buka http://localhost:8000

Catatan keamanan:
  - API key dibaca dari environment variable, JANGAN ditulis di kode.
  - Key tidak pernah diekspos ke front-end (semua request AI lewat backend ini).
  - Jangan commit key ke git.
"""

import http.server
import socketserver
import os
import json
import urllib.request
import urllib.error
from pathlib import Path

# ---------------------------------------------------------------------------
# Konfigurasi
# ---------------------------------------------------------------------------
# Muat .env sederhana jika ada. Environment variable sistem tetap diprioritaskan.
def load_dotenv(path):
    try:
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key, value = key.strip(), value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value
    except FileNotFoundError:
        pass

load_dotenv(Path(__file__).resolve().parent / ".env")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4.1-mini").strip()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash").strip()
PORT = int(os.environ.get("PORT", "8000"))
ROOT = Path(__file__).resolve().parent

SYSTEM_PROMPT = (
    "Kamu adalah DewiAI, asisten bisnis yang ramah untuk pelaku UMKM di Pulau Bali, Indonesia. "
    "Tugasmu: membantu pengguna memulai, memasarkan, dan mengembangkan usaha mikro/kecil Bali.\n\n"
    "Aturan menjawab:\n"
    "- Selalu gunakan Bahasa Indonesia yang hangat, sopan, dan praktis.\n"
    "- Berikan saran konkret yang bisa langsung ditindaklanjuti, sesuai konteks Bali: "
    "pariwisata, budaya, dan produk khas (kopi Kintamani, tenun gringsing, perak Celuk, "
    "keramik Pejaten, arak Bali, kakao Jembrana, garam Kusamba, batik Bali, dll.).\n"
    "- Saat menjelaskan langkah atau daftar, gunakan poin dengan tanda '-' di awal baris.\n"
    "- Ringkas tapi padat (sekitar 150-250 kata), kecuali pengguna minta lebih detail.\n"
    "- Jika pengguna menyapa (halo/hai/selamat), balas 'Om Swastiastu' lalu perkenalkan diri singkat.\n"
    "- Kamu adalah asisten AI, bukan manusia. Jangan mengaku sebagai manusia.\n"
    "- Untuk keputusan penting (hukum, pajak, sertifikasi resmi), ingatkan pengguna "
    "untuk konfirmasi ke lembaga/ahli terkait.\n"
    "- Jika pertanyaan jauh di luar topik bisnis UMKM, arahkan kembali dengan sopan."
)


def active_provider():
    """Pilih provider AI: gemini (gratis) > openai > local."""
    if GEMINI_API_KEY:
        return "gemini"
    if OPENAI_API_KEY:
        return "openai"
    return "local"


def active_model():
    p = active_provider()
    if p == "gemini":
        return GEMINI_MODEL
    if p == "openai":
        return OPENAI_MODEL
    return "local"


def call_openai(messages):
    """Meneruskan obrolan ke OpenAI Responses API."""
    # input: hanya pesan user/assistant (instruksi sistem lewat 'instructions')
    input_items = [
        {"role": m.get("role", "user"), "content": m.get("content", "")}
        for m in messages[-10:]
        if m.get("content") and m.get("role") in ("user", "assistant")
    ]
    body = {
        "model": OPENAI_MODEL,
        "instructions": SYSTEM_PROMPT,
        "input": input_items,
        "store": False,
        "max_output_tokens": 800,
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(body).encode("utf-8"),
        headers={"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        # output_text adalah field kenyamanan; fallback:urai array output
        text = data.get("output_text")
        if not text:
            for item in data.get("output", []):
                if item.get("type") == "message":
                    for part in item.get("content", []):
                        if part.get("type") == "output_text" and part.get("text"):
                            text = part["text"]
                            break
                if text:
                    break
        return (text or "").strip()


def call_gemini(messages):
    """Meneruskan riwayat obrolan ke Gemini (Google AI Studio) — endpoint gratis."""
    # Gemini pakai role "model" untuk jawaban asisten
    contents = []
    for m in messages[-10:]:
        role = m.get("role", "user")
        text = m.get("content", "")
        if not text:
            continue
        grole = "model" if role == "assistant" else "user"
        contents.append({"role": grole, "parts": [{"text": text}]})
    body = {
        "contents": contents,
        "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 800},
    }
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        return data["candidates"][0]["content"]["parts"][0]["text"].strip()


class Handler(http.server.SimpleHTTPRequestHandler):
    """Melayani file statis + endpoint /api/status dan /api/chat."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _json(self, obj, code=200):
        payload = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        if self.path == "/api/status":
            p = active_provider()
            self._json({
                "provider": p,
                "openai": p == "openai",
                "gemini": p == "gemini",
                "configured": p != "local",
                "model": active_model(),
                "free": p == "gemini",
            })
            return
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/chat":
            self._json({"error": "endpoint tidak ditemukan"}, 404)
            return
        try:
            length = int(self.headers.get("Content-Length", 0) or 0)
            raw = self.rfile.read(length) if length else b"{}"
            data = json.loads(raw)
            messages = data.get("messages", [])
            if not isinstance(messages, list):
                self._json({"error": "messages harus berupa daftar"}, 400)
                return
            messages = [
                {"role": m.get("role"), "content": str(m.get("content", ""))[:6000]}
                for m in messages[-10:]
                if isinstance(m, dict)
                and m.get("role") in ("user", "assistant")
                and str(m.get("content", "")).strip()
            ]
            if not messages or messages[-1].get("role") != "user":
                self._json({"error": "Pesan pengguna tidak ditemukan"}, 400)
                return

            provider = active_provider()
            if provider == "gemini":
                reply = call_gemini(messages)
                self._json({"source": "gemini", "reply": reply, "model": GEMINI_MODEL})
            elif provider == "openai":
                reply = call_openai(messages)
                self._json({"source": "openai", "reply": reply, "model": OPENAI_MODEL})
            else:
                self._json({"source": "local", "reason": "no_api_key"})

        except urllib.error.HTTPError as e:
            err_body = ""
            try:
                err_body = e.read().decode("utf-8", "ignore")
            except Exception:
                pass
            print(f"[AI] HTTPError {e.code}: {err_body[:300]}")
            self._json({"source": "local", "reason": f"http_{e.code}", "error": "Layanan AI menolak permintaan. Periksa API key, kuota, dan nama model."})
        except urllib.error.URLError as e:
            print(f"[AI] URLError: {e}")
            self._json({"source": "local", "reason": "network_error", "error": "Server tidak dapat terhubung ke layanan AI. Periksa koneksi internet."})
        except Exception as e:
            print(f"[server] error: {e}")
            self._json({"source": "local", "reason": "server_error", "error": "Terjadi kesalahan saat memproses AI."})

    def log_message(self, fmt, *args):
        if args and "/api/" in str(args[0]):
            super().log_message(fmt, *args)


class ReusableServer(socketserver.TCPServer):
    allow_reuse_address = True


def main():
    p = active_provider()
    print("=" * 54)
    print("  UMKMBali — Server")
    print("=" * 54)
    if p == "gemini":
        print(f"  AI : GEMINI (gratis)  model: {GEMINI_MODEL}")
        print("       batas free: ~10 req/mnt, 500 req/hari")
    elif p == "openai":
        print(f"  AI : OpenAI (berbayar)  model: {OPENAI_MODEL}")
    else:
        print("  AI : mode LOKAL (belum ada API key)")
        print("       gratis: set  $env:GEMINI_API_KEY = \"AIza...\"")
        print("                (key gratis di https://aistudio.google.com)")
    print(f"  URL: http://localhost:{PORT}")
    print("=" * 54)
    with ReusableServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer dihentikan. Sampai jumpa! 🙏")


if __name__ == "__main__":
    main()
