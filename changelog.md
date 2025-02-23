# Changelog

## 2025-02-23 - Refactor Authentication Flow

- Refactored the authentication flow to use a modal on the home page.
- Removed the separate sign-in and sign-up routes.
- Integrated Google authentication using Supabase.
- Updated the navigation to remove the sign-in/sign-up links.
- Moved the "Sign In / Sign Up" button to the Hero Section on the home page.
- Affected files: `src/pages/Index.tsx`, `src/components/Navigation.tsx`
