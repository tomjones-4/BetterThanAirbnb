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

## 2025-03-29 - Refactor Image Management and Listing Creation

### Added

- Created a Supabase Edge Function `create-listing-with-photos` (`supabase/functions/create-listing-with-photos/index.ts`) to handle atomic listing creation and photo uploads.
- Added a shared CORS configuration file (`supabase/functions/_shared/cors.ts`).
- Created a `useFirebaseImageUpload` hook (`src/hooks/useFirebaseImageUpload.tsx`) to handle image uploads to Firebase Storage.
- Created a `usePhotoManagement` hook (`src/hooks/usePhotoManagement.tsx`) to encapsulate photo management logic.
- Implemented client-side image compression using `browser-image-compression`.

### Modified

- Refactored `AddListingDialog.tsx` to collect form data and photos, then invoke the `create-listing-with-photos` Edge Function instead of handling DB insertion and storage uploads separately on the client.
- Modified the `create_initial_schema.sql` migration file to include the `listings` and `images` tables with the required columns.
- The Edge Function now handles:
  - Creating the listing record in the database.
  - Uploading photos to Supabase Storage using the new listing ID.
  - Updating the listing record with the public photo URLs.

### Removed

- Deleted unused hooks `usePhotoManagement.tsx` and `useFirebaseImageUpload.tsx` as their logic is now handled by the Edge Function.
- Deleted the `add_listings_and_images.sql` migration file.

### Dependencies

- Added `@supabase/auth-helpers-react` and `browser-image-compression` as dependencies.
