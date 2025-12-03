# LidarSim Readme

## Setup

1. winget install OpenJS.NodeJS.LTS
2. npm init -y
3. npm install --save-dev typescript @types/node
4. npm install express
5. npm install --save-dev @types/express
6. npx tsc --init
7. npm install --save-dev tsx
8. npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
9. npm install --save-dev jest ts-jest @types/jest supertest @types/supertest

## Compile, Run

1. npx tsc
2. node dist/index.js

## Compile AND Run via package.json dev script

1. npm run dev

## Run linter

1. npx eslint . --fix

## Test endpoints

* Retrieve buildings: 
  * curl http://localhost:3000/world
* Retrieve point cloud: 
  * curl -X POST http://localhost:3000/scan -H "Content-Type: application/json" -d '{"carPosition": [0, 0, 0]}'
