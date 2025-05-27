an📅 MVP Build Plan: Step-by-Step Tasks

Each task is atomic, focused, and testable. This list assumes a clean start using the architecture defined in architecture.md.

🚀 Phase 1: Initial Setup

1. Initialize Django project

Start: Run django-admin startproject phd_site inside /backend

End: Folder /backend/phd_site exists with default Django files

2. Create core Django app

Start: Run python manage.py startapp core

End: Folder /backend/core exists with default app files

3. Add core to INSTALLED_APPS

Start: Open settings.py

End: 'core' is listed in INSTALLED_APPS

4. Connect Django to Supabase DB

Start: Get DB credentials from Supabase

End: settings.py uses correct PostgreSQL DB config

5. Enable CORS for frontend

Start: Install django-cors-headers

End: CORS is enabled for frontend domain

6. Create .env file for Django secrets

Start: Create .env

End: Secrets (DB, key, etc.) are loaded using python-decouple or django-environ

📅 Phase 2: Backend (Models + APIs)

7. Create ResearchArea model

Start: Edit models.py

End: ResearchArea class exists with title + description

8. Create Publication model

Start: Edit models.py

End: Model with fields: title, abstract, year, authors, pdf_url

9. Create Award model

Start: Edit models.py

End: Model with fields: name, year, description

10. Create Teaching model

Start: Edit models.py

End: Fields: course name, semester, year, notes

11. Create + run migrations

Start: Run makemigrations

End: DB schema updated in Supabase

12. Register models in Django admin

Start: Edit admin.py

End: Models are visible/editable in admin panel

13. Create serializers for all models

Start: Create serializers.py

End: One serializer per model

14. Create API views for each model

Start: Edit views.py

End: One API endpoint per model

15. Create API routes in urls.py

Start: Create or edit core/urls.py

End: Endpoints like /api/publications/ available

16. Wire core URLs into project

Start: Edit phd_site/urls.py

End: include('core.urls') is added

17. Test API endpoints

Start: Use Postman or curl

End: Each GET endpoint returns valid data

🌐 Phase 3: Supabase Auth

18. Set up Supabase project + user table

Start: Open Supabase dashboard

End: Project is created with auth enabled

19. Configure Row-Level Security (RLS)

Start: Enable RLS on user-related tables

End: Only authenticated users can read/write own content

20. Test email login flow

Start: Use Supabase magic link login or email/password

End: Confirm token is returned and user is created

📈 Phase 4: Frontend Setup

21. Initialize Next.js project with TypeScript

Start: Run npx create-next-app@latest frontend --ts

End: /frontend has working starter app

22. Install TailwindCSS

Start: Follow Tailwind docs for Next.js

End: Tailwind working in /frontend/styles/globals.css

23. Create Tailwind nature theme

Start: Edit tailwind.config.js

End: Palette includes forest, moss, bark, cream

24. Create shared layout (Navbar, Footer)

Start: Add components/Navbar.tsx, Footer.tsx

End: Layout used across pages

25. Add Supabase client to frontend

Start: Add lib/supabaseClient.ts

End: Client initialized with anon/public keys

📁 Phase 5: Frontend Pages (Read-only MVP)

26. Create /publications page

Start: pages/publications.tsx

End: Fetch + render list of publications

27. Create /awards page

Start: pages/awards.tsx

End: Render list of awards from API

28. Create /research page

Start: pages/research.tsx

End: Render research areas from API

29. Create /teaching page

Start: pages/teaching.tsx

End: Render teaching content

30. Add homepage with profile summary

Start: pages/index.tsx

End: Personal bio, photo, intro

🚧 Phase 6: Admin + Auth Finalization

31. Protect admin with Supabase JWT auth (optional)

Start: Use DRF auth classes

End: Only authenticated users can POST/PUT

32. Deploy Supabase and test endpoints live

Start: Test Supabase APIs from frontend

End: Deployed Supabase project

33. Deploy Django backend (e.g. Railway)

Start: Set up project with DB URL + secrets

End: Live backend reachable at /api/

34. Deploy Next.js frontend (e.g. Vercel)

Start: Link GitHub repo to Vercel

End: Live frontend connected to backend

MVP complete ✅

Optional: Add content edit portal, dashboard UI, blogging, or PDF upload support.

add content crud portal, dashboard UI, blogging, PDF upload support, CSV upload support