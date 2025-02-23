# Changelog

## 2025-02-23 - Refactor Authentication Flow

- Refactored the authentication flow to use a modal on the home page.
- Removed the separate sign-in and sign-up routes.
- Integrated Google authentication using Supabase.
- Updated the navigation to remove the sign-in/sign-up links and add a "Sign In" button.
- Moved the "Sign In" button to the navigation bar.
- Removed the Dialog and DialogTrigger components from the Index page.
- Created a new AuthDialog component to encapsulate the authentication logic.
- Removed email authentication and only allow Google authentication.
- Added a SignOut component to handle user sign-out.
- Updated the Navigation component to display the user's name and a sign-out button when logged in.
- Updated the SignOut component to update the session state in the Navigation component after the user signs out.
- Removed the AuthDialog component and directly trigger Google authentication on sign in.
- The Navigation component now retrieves the session on load and on auth state changes.
- Affected files: `src/pages/Index.tsx`, `src/components/Navigation.tsx`, `src/components/auth/SignOut.tsx`
