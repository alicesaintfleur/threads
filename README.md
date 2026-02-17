# ⚡ Threads Viral Generator

An AI-powered Threads post generator with 3 modes:
- **Original Posts** — Hot take, Story, List, Reply Bait blueprints
- **Reply Generator** — Smart replies to any Threads post
- **Thread Sequences** — 3–7 post threads in any format

---

## 🚀 Deploy to Render (Free — 5 Steps)

### Step 1 — Get a free Render account
Go to **https://render.com** → click **Get Started for Free** → sign up with GitHub or Google.

---

### Step 2 — Put your files on GitHub
1. Go to **https://github.com** → sign in or create a free account
2. Click the **+** button (top right) → **New repository**
3. Name it `threads-generator` → click **Create repository**
4. Click **uploading an existing file**
5. Upload ALL the files from this folder (keeping the folder structure):
   - `server.js`
   - `package.json`
   - `public/index.html`
6. Click **Commit changes**

---

### Step 3 — Create a Web Service on Render
1. Go to your Render dashboard → click **New +** → **Web Service**
2. Connect your GitHub account if prompted
3. Select your `threads-generator` repository
4. Fill in the settings:
   - **Name:** threads-generator (or whatever you like)
   - **Region:** pick the closest to you
   - **Branch:** main
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
5. Click **Create Web Service**

---

### Step 4 — Add your Anthropic API key
1. In your Render service dashboard, click **Environment** in the left sidebar
2. Click **Add Environment Variable**
3. Set:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** your API key from https://console.anthropic.com
4. Click **Save Changes**

> 🔑 Get your API key at: https://console.anthropic.com → API Keys → Create Key

---

### Step 5 — Go live!
Render will automatically redeploy. In about 1–2 minutes, your app will be live at:

```
https://threads-generator.onrender.com
```
(or similar — Render shows the exact URL in the dashboard)

Share that URL with anyone — no sign-up, no API key needed for your users!

---

## 💰 Cost estimate
- **Render:** Free tier (spins down after 15 min inactivity, spins back up in ~30 sec)
- **Anthropic API:** ~$0.003 per generation (very cheap — 300 generations ≈ $1)

---

## 📁 File structure
```
threads-generator/
├── server.js          ← Backend (hides your API key)
├── package.json       ← Node.js config
└── public/
    └── index.html     ← The full app UI
```
