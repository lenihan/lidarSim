# LidarSim Readme

## Grok thread to help me get setup

<https://grok.com/share/bGVnYWN5LWNvcHk_d55c9003-4c6c-4952-a875-ce268e0b21ab>

## Backend

### Backend Setup

winget install OpenJS.NodeJS.LTS
npm init -y
npm install --save-dev typescript @types/node
npm install express
npm install --save-dev @types/express
npx tsc --init
npm install --save-dev tsx
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
npm install cors
npm install -D @types/cors

### Compile, Run

npx tsc
node dist/index.js

### Compile AND Run via package.json dev script

npm run dev

### Run linter

npx eslint . --fix

### Test endpoints

Retrieve buildings:
curl http://localhost:3000/world

Retrieve point cloud:
curl -X POST http://localhost:3000/scan -H "Content-Type: application/json" -d '{"carPosition": [0, 0, 0]}'

## Frontend

### Frontend Setup

npx create-vite@latest frontend -- --template vanilla-ts

* Select a framework: React
* Select a variant: TypeScript + React Compiler
* Use rolldown-vite (Experimental)?: Yes
* Install with npm and start now? Yes

cd frontend
npm install three @types/three
npm install -D @types/node   # so fetch works nicely with TypeScript
npm install -D @types/three

### To run front end

cd frontend
npm run dev  # http://localhost:5173/