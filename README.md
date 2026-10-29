# Project Progress Tracker — IT 6203 Lab 4

Angular frontend and Node.js/Express backend demonstrating HTTP GET and POST communication for project milestones.

## Features

- `GET /milestones`: Express returns three predefined records; Angular retrieves and displays them.
- `POST /milestones`: Angular sends a new milestone's `name` and `status` as JSON; Express logs the values and returns an acknowledgment.
- Angular Material reactive form for milestone submission.

This lab intentionally uses predefined in-memory data. MongoDB and permanent persistence are **not** implemented or required.

## Run locally

Requires Node.js/npm. Run in separate terminals from the repository root:

**Express backend (port 8000)**
```powershell
cd backend
npm ci
node server.js
```

**Angular frontend (port 4200)**
```powershell
npm ci
npx ng serve
```

Open `http://localhost:4200`. The frontend contacts `http://localhost:8000/milestones`.

## Project layout

- `src/` — Angular application and `services/milestone.ts`
- `backend/server.js` — Express API endpoints
- `angular.json`, `package.json`, `tsconfig*.json` — Angular setup

## Tests

Unit tests (Vitest via the Angular CLI) cover the milestone service's GET/POST calls and the rendered milestone list:

```powershell
npx ng test --watch=false
```

## Lab report

The Lab 4 report and evidence screenshots are submitted separately through the course and are not included in this repository.

## API examples

A request body for `POST /milestones`:

```json
{"name":"Complete Lab 4","status":"In Progress"}
```

This API acknowledges the submission without adding the new milestone to the predefined list.
