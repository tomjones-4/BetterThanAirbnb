# Changelog

## 2025-03-31

- Updated the Add Listing form to include all fields from the database schema.
  - Modified `src/hooks/useAddListingForm.tsx` to update the Zod schema and onSubmit function.
  - Modified `src/components/AddListingDialog.tsx` to include new input fields.
- Updated the listing route to display a summary of the listing data in a Card component.
  - Modified `src/pages/listings/[listingId].tsx` to fetch listing data by ID and display it in a Card.
- Improved styling and scrollability of the Add Listing form.

  - Modified `src/components/AddListingDialog.tsx` to increase the width of the dialog and add a scroll area.

- Updated the Add Listing form to include all fields from the database schema.
  - Modified `src/hooks/useAddListingForm.tsx` to update the Zod schema and onSubmit function.
  - Modified `src/components/AddListingDialog.tsx` to include new input fields.
- Updated the listing route to display a summary of the listing data in a Card component.
  - Modified `src/pages/listings/[listingId].tsx` to fetch listing data by ID and display it in a Card.
- Fixed a TypeScript error in `useAddListingForm` related to variable shadowing within the `uploadPhotos` function.
- Affected files: `src/components/AddListingDialog.tsx`, `src/hooks/useAddListingForm.tsx`

## 2025-03-31 - Refactor Add Listing Form with React Hook Form

- Refactored the Add Listing form to use `react-hook-form` for improved state management, validation, and error handling.
- Replaced multiple `useState` calls in `useAddListingForm` with the `useForm` hook.
- Integrated `zod` for schema validation.
- Updated `AddListingDialog` to use `register`, `Controller`, and `errors` from `react-hook-form`.
- Affected files: `src/hooks/useAddListingForm.tsx`, `src/components/AddListingDialog.tsx`

## 2025-03-29 - Require Login to Add Listing

- Updated the "Add Listing" button to require users to log in before accessing the add listing form.
- If a user is not logged in, clicking the "Add Listing" button will now trigger the Google OAuth sign-in flow.
- Affected files: `src/components/AddListingDialog.tsx`

## 2025-03-29

- Updated homepage to two-column layout
- Removed "Featured Properties" heading
- Display all properties instead of slicing
- Made left side fixed and centered
- Removed calendar and large layout elements from listings
- Simplified property display to show main image and key details
- Fixed overlap with navigation bar by adding top padding to the home page
- Added fallback images for unavailable property images
- Display up to ten properties for scrolling demo

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

## 2025-02-23 - Refactor Authentication Flow

- Refactored authentication to use Google OAuth in the navigation bar, replacing the separate sign-in/sign-up routes and modal.
- The navigation now displays the user's email and a sign-out button upon successful authentication.
- The SignOut component now receives the handleSignOut function from the useAuth hook.
- Moved the handleSignOut function to the useAuth hook.
- Implemented code splitting for the SignOut component.
- Affected files: `src/components/Navigation.tsx`, `src/components/auth/SignOut.tsx`, `src/hooks/useAuth.tsx`, `src/components/auth/SignOutButton.tsx`
