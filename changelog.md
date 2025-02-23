# Changelog

## 2025-02-23 - Refactor Authentication Flow

- Refactored authentication to use Google OAuth in the navigation bar, replacing the separate sign-in/sign-up routes and modal.
- The navigation now displays the user's email and a sign-out button upon successful authentication.
- Affected files: `src/pages/Index.tsx`, `src/components/Navigation.tsx`, `src/components/auth/SignOut.tsx`
