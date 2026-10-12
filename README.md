# NEXUS // PLAY — Next-Gen 3D PC Gaming Showcase

A cinematic, interactive 3D gaming showcase web application engineered exclusively for PC games, built with vanilla ES6+, Three.js, GSAP ScrollTrigger, and modern CSS3 spatial effects.

---

## 🌟 Key Features

1. **Cinematic Hero Landing:**
   - Real-time Three.js WebGL particle field with additive blending and dynamic multi-point neon lights.
   - Mouse-responsive camera parallax and environmental drift.
   - Glassmorphism navigation bar with responsive drawer navigation.

2. **Featured PC Editorial Gallery:**
   - Asymmetric, oversized card layout highlighting PC visual milestones.
   - Ray tracing, DLSS 3.5, and uncapped framerate badges.
   - Click-to-open detailed PC game modal specifications.

3. **3D Interactive Game Cards:**
   - 3D spatial tilt effect tracking cursor position with spring damping.
   - Multi-layered parallax depth across card imagery and content text.

4. **Cinematic Spotlight Carousel:**
   - Rotating cinematic showcase with transition states, active indicators, and numbered indexing.
   - Full-width backdrop transitions.

5. **Genre Explorer & Real-Time Filtering:**
   - Instant filtering across 8 distinct PC gaming genres (RPG, Open World, Soulslike, FPS, Racing, Survival Horror, Action & Adventure, Strategy).
   - Dynamic UI state transitions with zero lag.

6. **Full Accessibility & Performance:**
   - Respects `prefers-reduced-motion: reduce`.
   - Optimized assets, responsive breakpoints, lazy loading, and zero layout shift.

---

## 🚀 Running Locally

The project is completely self-contained with no heavy compilation step required.

### Option 1: PowerShell Built-in Web Server
Run the included PowerShell server script:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Open your browser to: [http://localhost:5500](http://localhost:5500)

### Option 2: Python (if installed)
```bash
python -m http.server 8080
```
Then visit [http://localhost:8080](http://localhost:8080).

### Option 3: VS Code / IDE Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 Deploying to Netlify via GitHub

1. **Initialize Git & Commit:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete NEXUS // PLAY 3D PC showcase"
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/<your-username>/nexus-play-3d.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Netlify:**
   - Go to [Netlify](https://app.netlify.com/) and click **"Add new site" > "Import an existing project"**.
   - Select **GitHub** and authorize the repository `nexus-play-3d`.
   - **Build Command**: Leave empty (static site).
   - **Publish Directory**: `.` (or root).
   - Click **Deploy Site**.
   - Netlify will automatically provision an HTTPS SSL certificate and serve the site globally via CDN.
