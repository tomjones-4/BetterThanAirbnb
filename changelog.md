# Changelog

## 2025-02-23 - Refactor Authentication Flow

- Refactored authentication to use Google OAuth in the navigation bar, replacing the separate sign-in/sign-up routes and modal.
- The navigation now displays the user's email and a sign-out button upon successful authentication.
- The SignOut component now receives the handleSignOut function from the useAuth hook.
- Moved the handleSignOut function to the useAuth hook.
- Implemented code splitting for the SignOut component.
- Affected files: `src/components/Navigation.tsx`, `src/components/auth/SignOut.tsx`, `src/hooks/useAuth.tsx`, `src/components/auth/SignOutButton.tsx`
