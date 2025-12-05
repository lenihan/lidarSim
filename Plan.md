# LIDAR Simulator – Full-Stack TypeScript + Three.js Project Checklist

**Status as of December 2025 – You are 95% done!**

## Completed ([x])

1. [x] Install Node.js + npm on Windows  
2. [x] Create backend folder `lidarsim`  
3. [x] `npm init -y` + install Express, TypeScript, cors, body-parser  
4. [x] Set up `type: "module"` in package.json  
5. [x] Create `tsconfig.json` for Node.js + ESM  
6. [x] Write working backend in `src/index.mts` (or `.ts`)  
7. [x] Add CORS → `app.use(cors())`  
8. [x] Create `/world` endpoint that returns 10+ random buildings  
9. [x] Create `/scan` endpoint (stub)  
10. [x] Run backend with `npm run dev` → <http://localhost:3000/world> works  
11. [x] Create frontend with `npx create-vite@latest frontend -- --template react-ts`  
12. [x] Install Three.js → `npm install three @types/three`  
13. [x] Replace `src/main.tsx` and `src/App.tsx` with Three.js canvas  
14. [x] Fix CORS so frontend can talk to backend  
15. [x] Successfully load procedural city (blue buildings visible)  
16. [x] Add OrbitControls + proper lighting + ground  
17. [x] Add moving car (red + yellow roof – now clearly visible)  
18. [x] Implement real-time 256–512 ray LIDAR using `Raycaster`  
19. [x] Show live white point cloud that follows the car and paints buildings  
20. [x] Hard refresh and confirm everything works together

**You are here → everything above works!**

## Remaining / Optional Upgrades ([ ])

<!-- markdownlint-disable MD029 -->
21. [ ] Add React UI panel (speed slider, play/pause, ray count) – ~10 min  
22. [ ] Add intensity coloring (red = close, blue = far) – ~8 min  
23. [ ] Add Gaussian noise to points (realistic LIDAR look) – ~5 min  
24. [ ] Export current point cloud as .pcd file (one-click download) – ~12 min  
    1. [ ] Create PCD string builder  
    2. [ ] Add "Export PCD" button  
    3. [ ] Trigger download  
25. [ ] Add multiple cars / traffic simulation – ~15–20 min  
26. [ ] Add day/night toggle + headlights – ~8 min  
27. [ ] Deploy backend to Render / Fly.io – ~10 min  
28. [ ] Deploy frontend to Vercel / Netlify – ~5 min  
29. [ ] Add mobile touch controls – ~10 min  
30. [ ] Write README + record demo video – ~15 min  

## Victory Condition

When steps 1–20 are checked (they already are), you have a **fully functional real-time LIDAR simulator in the browser** built entirely by you in TypeScript.

You did it. Congratulations!

Say **“more”** and I’ll give you steps 21–24 (UI + PCD export) in one clean copy-paste.  
Or say **“done”** and we celebrate — your call!
