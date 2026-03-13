# WFEREGER Studio MVP

Modern Next.js + Tailwind MVP for a digital studio offering programming, video editing, thumbnails, and web design. Includes:

- Landing, Services, Pricing, and Contact marketing pages with smooth hero UI, testimonials, feature highlights, and pricing previews.
- Sign up, login, email verification, and password reset flows backed by JWT cookies.
- Client dashboard with order creation, status tracking, skeleton loading, and automated email confirmation.
- Admin dashboard to view every order, rotate statuses, list clients, and trigger notification emails.
- Prisma/SQLite database with Users, Orders, and Services plus seed data.
- RESTful API routes for authentication, orders, services, contact, and admin workflows.
- Dark/light theme toggle, skeleton screens, CSS transitions, and subtle animations.

## Tech stack

- Next.js 14 App Router (React 18)
- Tailwind CSS + custom gradients
- Prisma with SQLite + ts-node seeders
- JWT auth + bcrypt
- Nodemailer (configurable via env)
- Framer Motion for loaders

## Setup

1. Copy `.env.example` to `.env` and fill secrets (especially `DATABASE_URL`, `JWT_SECRET`, and email credentials).
2. Install dependencies: `npm install` (network access to registry required).
3. Run Prisma migrations/seeds (creates `dev.db`):
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run seed
   ```
4. Start dev server: `npm run dev`.

## Notes

- Authentication relies on `studio_token` HTTP-only JWT cookies.
- Email sending uses the SMTP credentials from `.env`; if not configured, the payload is logged to the console.
- The admin user seeded by default uses `ADMIN_EMAIL`/`ADMIN_PASSWORD` from the environment.
