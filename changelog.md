# Changelog

## 2025-02-23 - Refactor Authentication Flow

- Refactored authentication to use Google OAuth in the navigation bar, replacing the separate sign-in/sign-up routes and modal.
- The navigation now displays the user's email and a sign-out button upon successful authentication.
- The SignOut component now receives the handleSignOut function from the useAuth hook.
- Moved the handleSignOut function to the useAuth hook.
- Implemented code splitting for the SignOut component.
- Affected files: `src/components/Navigation.tsx`, `src/components/auth/SignOut.tsx`, `src/hooks/useAuth.tsx`, `src/components/auth/SignOutButton.tsx`

## 2025-03-01 - Add Property Listing Feature

- Implemented a feature to allow users to add property listings to the website.
- Added an "Add Listing" button to the navigation bar that launches a modal.
- Implemented a modal with a form for adding property listings.
- Integrated the form with Supabase to save listing data.
- Implemented image upload functionality.
- Created a listing page to display listing details.
- Affected files: `src/components/AddListingDialog.tsx`, `src/components/Navigation.tsx`, `src/pages/listings/[listingId].tsx`

## 2025-03-01 - Add Icons to Amenities in Add Listing Dialog

- Added icons to the amenities displayed in the Add Listing Dialog for improved user experience.
- Used lucide-react icons for each amenity.
- Improved the layout of the amenities section in the Add Listing Dialog by using a grid layout with two columns and adjusting the spacing and alignment of the icons and text, and adding more padding between the checkbox and the icon/text.
- Affected files: `src/components/AddListingDialog.tsx`

## 2025-03-29 - Require Login to Add Listing

- Updated the "Add Listing" button to require users to log in before accessing the add listing form.
- If a user is not logged in, clicking the "Add Listing" button will now trigger the Google OAuth sign-in flow.
- Affected files: `src/components/AddListingDialog.tsx`
