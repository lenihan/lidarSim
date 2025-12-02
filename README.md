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

## Compile, Run

1. npx tsc
2. node dist/index.js

## Compile AND Run via package.json dev script

1. npm run dev