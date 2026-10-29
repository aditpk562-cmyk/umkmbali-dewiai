@echo off
cd /d "%~dp0"
echo ==========================================
echo UMKMBali - DewiAI
echo ==========================================
python --version
if errorlevel 1 (
  echo Python 3 belum terpasang atau belum masuk PATH.
  pause
  exit /b 1
)
if not exist .env (
  copy .env.example .env >nul
  echo File .env dibuat dari .env.example.
  echo Buka .env dan masukkan GEMINI_API_KEY agar API AI aktif.
  notepad .env
)
echo Membuka server pada http://localhost:8000
echo Tekan Ctrl+C untuk menghentikan server.
start "" http://localhost:8000
timeout /t 2 >nul
python server.py
pause
