# ChrisWick Production Portfolio

A production-style Vite + React + React Three Fiber portfolio with a cinematic contract-terminal entry experience, responsive service armory, portfolio data layer, service dossiers, booking links, and automatic performance scaling.

## 1. Open the project correctly

In Visual Studio Code, use **File > Open Folder** and select the folder that contains `package.json`.

## 2. Verify your terminal

Run these one at a time:

```powershell
node -v
npm -v
Get-Location
dir
```

You should see Node and npm version numbers, and `dir` should show `package.json`, `index.html`, `vite.config.js`, `src`, and `public`.

## 3. Install dependencies

```powershell
npm install
```

## 4. Run development mode

```powershell
npm run dev
```

Open the local URL Vite prints, normally `http://localhost:5173/`.

## 5. Verify a production build

```powershell
npm run build
```

A successful build creates the `dist` folder.

Then preview the production build:

```powershell
npm run preview
```

## Content editing

The main content file is:

`src/data/site.js`

Place portfolio images in:

`public/assets/images/`

Reference them with paths such as:

`/assets/images/my-photo.jpg`

## Important folders

- `src/pages/` — page-level experiences
- `src/components/` — reusable UI
- `src/components/three/` — 3D scene
- `src/data/site.js` — services, profile, portfolio
- `src/hooks/` — performance and sound behavior
- `src/styles/global.css` — global visual system
- `public/assets/images/` — image files
- `public/assets/video/` — future video files
- `public/assets/audio/` — future custom audio assets
- `public/assets/models/` — future GLB/GLTF models

## Windows PowerShell note

If `npm` says scripts are disabled, use:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then restart VS Code and verify:

```powershell
Get-ExecutionPolicy -Scope CurrentUser
npm -v
```

## Daily workflow

After the first successful `npm install`, your normal workflow is:

```powershell
npm run dev
```

You do not need to reinstall Node or npm for this project.

## Full environment health check

Run these commands from the folder that contains `package.json`:

```powershell
node -v
npm -v
Get-ExecutionPolicy -Scope CurrentUser
Get-Location
dir
npm cache verify
npm install
npm list --depth=0
npm run build
npm run dev
```

For Vite 8, use Node 20.19+ or Node 22.12+.

Optional package checks:

```powershell
npm outdated
npm audit
npm doctor
```

`npm outdated` only reports available updates; it does not change your project. `npm audit` reports known dependency vulnerabilities. `npm doctor` checks the local npm environment and registry access.
