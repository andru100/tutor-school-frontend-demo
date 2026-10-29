# Tutor School — public demo

A tutoring platform for managing lessons, homework and assessments, with separate teacher and student dashboards and charts for tracking progress by subject and topic.

This repository contains an earlier public demonstration of a project I have continued developing privately. It shows the foundations of the platform; it is not the current commercial version.

## Project repositories

This project has two parts. **Start here for the project overview**, then follow the backend link for the API and data model.

| Component | Repository | Main technologies |
| --- | --- | --- |
| Frontend (this repository) | [tutor-school-frontend-demo](https://github.com/andru100/tutor-school-frontend-demo) | React 18, TypeScript, Vite, Tailwind CSS, ApexCharts |
| Backend | [tutor-school-backend-demo](https://github.com/andru100/tutor-school-backend-demo) | C#, ASP.NET Core 8, Entity Framework Core, PostgreSQL |

## What the demo contains

- Teacher and student accounts, email/password authentication and Google sign-in integration.
- Teacher workflows for creating, assigning and managing lessons, homework and assessments.
- Student workflows for viewing lessons, submitting homework and completing assessments.
- Automatic multiple-choice assessment scoring, including subject/topic results.
- Performance charts and a calendar showing related events.
- Optional AI homework feedback through OpenAI, aimed at helping students improve their work.
- Upload integrations for Azure Blob Storage, plus image/document extraction services used by the feedback workflow.
- Seeded fictional accounts and assessment history for exploring the dashboards.

Assessment scoring uses programmed answer checking. The AI integration provides homework feedback; these are separate features.

## Architecture

The React frontend calls the ASP.NET Core API. The backend uses ASP.NET Core Identity for accounts and roles, and Entity Framework Core with PostgreSQL for application data. Optional integrations handle Google sign-in, email delivery, uploads and AI feedback. API secrets belong in the backend configuration.

## Run locally

Prerequisites: Node.js 22, Yarn Classic (1.x), and the [backend](https://github.com/andru100/tutor-school-backend-demo) running locally with PostgreSQL. The backend README explains configuration and sample-data initialization.

```bash
git clone https://github.com/andru100/tutor-school-frontend-demo.git
cd tutor-school-frontend-demo
cp .env.example .env
yarn install --frozen-lockfile
yarn dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

| Variable | Purpose |
| --- | --- |
| `VITE_APP_BACKEND_ADDRESS` | Backend URL, normally `http://localhost:5000` |
| `VITE_APP_GOOGLE_CLIENT_ID` | Your Google OAuth client ID, if testing Google sign-in |

Vite exposes `VITE_` settings to the browser. Do not put private keys or other server credentials in them. Restart Vite after changing `.env`.

### Explore the seeded demo

After following the backend's local seeding instructions, sign in with either fictional account:

| Role | Email | Password |
| --- | --- | --- |
| Teacher | `teacher@example.com` | `Password123!` |
| Student | `student@example.com` | `Password123!` |

Start with the teacher dashboard to view the assigned student, charts, lessons, homework and assessments. Use the student account to explore the corresponding student experience. These shared credentials are for local sample data only.

### Production bundle

```bash
yarn build
yarn preview
```

This generates the frontend bundle; it does not start the backend or verify every application workflow. The existing build command uses Vite and does not perform a full TypeScript type check.

## Scope and limitations

This is an earlier development demo. Messaging, notifications and billing are unfinished or experimental. Google sign-in, email, uploads and AI feedback require your own service configuration. There is no verified hosted demo advertised here; use the local setup above.

The interface uses the TailAdmin React template as its starting point. Existing license notices are retained in [LICENSE.md](LICENSE.md). The later private project, including its additional features and refactoring, is outside these repositories.
