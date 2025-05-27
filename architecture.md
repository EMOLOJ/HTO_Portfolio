🌿 Website Architecture for PhD Researcher

(Nature-themed academic portfolio site)

👤 File & Folder Structure

phd-website/
├── backend/                     # Django backend
│   ├── phd_site/               # Django project
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── core/                   # Custom Django app (models, APIs)
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── admin.py
│   └── manage.py
│
├── frontend/                   # Next.js frontend (React)
│   ├── public/                 # Static files (images, favicon)
│   ├── pages/                  # Routes (each .tsx is a page)
│   │   ├── index.tsx           # Homepage
│   │   ├── research.tsx
│   │   ├── publications.tsx
│   │   ├── awards.tsx
│   │   ├── mentoring.tsx
│   │   └── api/                # Optional Next.js API routes
│   ├── components/             # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Card.tsx
│   │   └── ProfileHeader.tsx
│   ├── styles/                 # Tailwind or custom CSS
│   │   └── globals.css
│   ├── lib/                    # Utility functions (e.g., Supabase client)
│   │   └── supabaseClient.ts
│   └── tsconfig.json
│
├── supabase/                   # Supabase definitions
│   ├── schema.sql              # DB schema for tables
│   ├── policies.sql            # RLS policies for security
│   └── supabase.env            # Auth keys/env vars
│
├── .env                        # Django + Supabase secrets
├── docker-compose.yml          # (Optional) Dev environment
└── README.md

⚙️ What Each Part Does

🔧 Backend (Django)

phd_site/ – Main Django project configuration.

core/ app – Contains models for: publications, research areas, awards, teaching, grants, etc.

views.py – Django REST API endpoints.

serializers.py – Translates Django models <=> JSON.

urls.py – Maps API routes (e.g. /api/publications/).

Django Admin used for content management (can be protected via Supabase Auth).

🌐 Frontend (Next.js + Tailwind)

pages/ – Each academic section gets its own route (e.g., /publications, /teaching).

components/ – UI pieces like cards, profile headers, timeline blocks.

lib/supabaseClient.ts – Connects Supabase Auth and DB.

styles/ – TailwindCSS for styling + nature-themed elements.

🔒 Supabase

Auth: Handles sign-in for the researcher (and possibly collaborators).

DB: Stores dynamic content (publications, awards, etc.)

Policies: Defines row-level security for private data.

PostgREST API: Automatically exposes REST endpoints that can be used from frontend if needed.

💀 How the Parts Connect

[Browser] <--> [Next.js frontend]
     |                  |
     | REST / Supabase  |
     ↓                  ↓
[Django API] <--> [Supabase DB]

Next.js uses getServerSideProps or useEffect + fetch to load data from Django or Supabase.

Django admin panel allows easy data input, served through DRF APIs.

Supabase handles authentication and may serve some data directly via its auto-generated API.

Optionally, Supabase functions (written in SQL or JS) can handle extra logic or permissions.

🧠 Where State Lives

Layer

State Example

Managed By

Frontend

Page view toggle, form input

React/Next.js

Auth

User login token

Supabase Auth

Backend

Publications, Awards, Research Focus

Django Models

DB

Persistent content, user profiles

Supabase PostgreSQL

✅ Services Summary

Service

Role

Django

Backend API, admin CMS, content control

Supabase

Database, authentication, optional API

Next.js

UI, routing, rendering, fetch data

TailwindCSS

Styling with nature theme via custom colors

🔡 Security & Permissions

Use Supabase Auth (email/password or magic link).

Django API uses tokens or Supabase JWT for secure access.

Enable Supabase Row-Level Security (RLS) for sensitive tables.

Limit Django admin to superuser roles only.

If public content is allowed (e.g., publications), use read-only endpoints.

🎨 Nature Theming Tips

Set color palette in Tailwind: moss green, brown, light beige, soft cream.

Use natural imagery (leaves, branches, mountains) in backgrounds or as icons.

Fonts: Consider serif or handwritten styles for headings (optional).

Tailwind custom theme extension:

// tailwind.config.js
theme: {
  extend: {
    colors: {
      forest: '#2F4F4F',
      moss: '#8A9A5B',
      bark: '#5C4033',
      cream: '#F5F5DC'
    }
  }
}

🚀 Deployment Recommendations

Backend: Deploy Django on Railway, Render, or Heroku.

Frontend: Deploy Next.js on Vercel.

Supabase: Hosted by Supabase.io (auto-managed).

Use environment variables to connect all layers securely.