# Changelog

## 2025-04-06 - Update PropertyCard to use a random image URL

- Updated the `PropertyCard` component to use `https://picsum.photos/200` as the backup image when no images are available.
- Affected files: `src/components/PropertyCard.tsx`

## 2025-04-06 - Add 'created_at' Column to Listings Table

- Created a Supabase migration to add the `created_at` column to the `listings` table.
- The `created_at` column is a timestamp with timezone, defaulting to the current UTC time.
- Updated `memory-bank/activeContext.md` to include a reminder to double-check database fields before querying and instructions on how to run the migration locally.
- Affected files: `supabase/migrations/20250407011614_add_created_at_to_listings.sql`, `memory-bank/activeContext.md`

## 2025-04-06 - Add Property Type Toggle to Add Listing Form

- Updated the Add Listing form to include a toggle for property type (house/condo).
- Used `lucide-react` icons for house and condo.
- Modified `src/components/AddListingDialog.tsx` to replace the text input with a toggle component.
- Modified `src/hooks/useAddListingForm.tsx` to validate that `property_type` is either "house" or "condo".
- Set the default value of `property_type` to "house".
- Affected files: `src/components/AddListingDialog.tsx`, `src/hooks/useAddListingForm.tsx`

## 2025-03-31 - Fix Amenities Icons and Improve UI on Listing Details Page

- Fixed the display of amenities icons on the listing details page (`src/pages/listings/[listingId].tsx`).
- Updated the `amenityIcons` map to correctly map amenity names from the database to their corresponding icons.
- Added missing imports for icons (`FileText`, `Info`, `Asterisk`) from `lucide-react`.
- Increased the top padding on the listing details page (`src/pages/listings/[listingId].tsx`) to `pt-32` to prevent content from being obscured by the navigation bar.
- Added colored icons to the Description, Property Details, and Availability sections.
- Replaced the star character with an asterisk in the Amenities section heading.
- Removed the console.log statement.
- Affected files: `src/pages/listings/[listingId].tsx`

## 2025-03-31 - Improve Listing Details Page UI and Spacing (Multiple Updates Combined)

- Fixed heading alignment on the listing details page by modifying the `listing-heading` class in `src/App.css`.
- Ensured the listing page is scrollable on mobile by adding `overflow-y: auto` to the main container in `src/pages/listings/[listingId].tsx`.
- Adjusted spacing/alignment of the listing page to prevent it from being cut off by the navigation bar (increased top padding to `pt-24`).
- Made the headings on the listing page have the same color.
- Added a `listing-heading` class to `src/App.css` for consistent heading styles, including `display: inline-flex` for SVGs.
- Updated the amenities display on the listing details page to use the same icons as the Add Listing form.
- Affected files: `src/pages/listings/[listingId].tsx`, `src/App.css`

## 2025-03-31 - Improve Listing Details Page UI

- Adjusted spacing on the listing details page (`src/pages/listings/[listingId].tsx`) by adding top padding (`pt-20`) to the main container to prevent content from being obscured by the navigation bar. (Note: Later updated to pt-24, see above)
- Implemented conditional rendering for listing details: fields like name, address, description, price, bedrooms, bathrooms, max guests, property type, availability dates, and amenities are now only displayed if they have a non-null/undefined value.
- Added a placeholder image (`public/placeholder.svg`) to be displayed in the image carousel area when a listing has no associated images, replacing the previous text indicator.
- Affected files: `src/pages/listings/[listingId].tsx`

## 2025-03-31 - Fix Listing Page 404 & Refactor UI

- Fixed 404 error on listing page:
  - Updated route from `/properties/:id` to `/listings/:id` in `src/App.tsx`.
  - Updated `src/pages/listings/[listingId].tsx` to use the correct route parameter (`id`).
- Refactored `src/pages/listings/[listingId].tsx` for improved visual appearance:
  - Used a grid layout for better structure.
  - Implemented an image carousel using Shadcn `Carousel`.
  - Improved information hierarchy with icons (`lucide-react`) and `Separator`.
  - Displayed amenities using `Badge` components.
  - Formatted dates using `date-fns`.
  - Added `Skeleton` components for loading state.
  - Improved error handling using `Alert` component.
- Fixed TypeScript errors in `src/pages/listings/[listingId].tsx`:
  - Used specific `Tables<'listings'>` type for listing state.
  - Handled error type correctly in `catch` block.
- Updated Supabase types (`src/integrations/supabase/types.ts`) to include the missing `name` property in the `listings` table definition.
- Affected files: `src/App.tsx`, `src/pages/listings/[listingId].tsx`, `src/integrations/supabase/types.ts`

## 2025-03-31 - Update Add Listing Form & Listing Route Display

- Updated the Add Listing form to include all fields from the database schema.
  - Modified `src/hooks/useAddListingForm.tsx` to update the Zod schema and onSubmit function.
  - Modified `src/components/AddListingDialog.tsx` to include new input fields.
- Updated the listing route (`src/pages/listings/[listingId].tsx`) to fetch listing data by ID and display it in a Card.
- Improved styling and scrollability of the Add Listing form (`src/components/AddListingDialog.tsx`) by increasing dialog width and adding a scroll area.
- Fixed a TypeScript error in `useAddListingForm` related to variable shadowing within the `uploadPhotos` function.
- Affected files: `src/components/AddListingDialog.tsx`, `src/hooks/useAddListingForm.tsx`, `src/pages/listings/[listingId].tsx`

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

## 2025-03-29 - Homepage Layout Update

- Updated homepage to two-column layout.
- Removed "Featured Properties" heading.
- Display all properties instead of slicing.
- Made left side fixed and centered.
- Removed calendar and large layout elements from listings.
- Simplified property display to show main image and key details.
- Fixed overlap with navigation bar by adding top padding to the home page.
- Added fallback images for unavailable property images.
- Display up to ten properties for scrolling demo.
- Affected files: `src/pages/Index.tsx` (Implicitly, based on description)

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

## 2025-04-14 - Fix fetchUsers Function

- Updated the `fetchUsers` function in `src/lib/messages.ts` to use `VITE_SUPABASE_URL` instead of `NEXT_PUBLIC_SUPABASE_URL`.
- Verified that the `SUPABASE_URL` environment variable in the Supabase project settings is set to the same value as `VITE_SUPABASE_URL` in the `.env` file.
- This change ensures that the `fetchUsers` function correctly retrieves user data from the Supabase database.
- Affected files: `src/lib/messages.ts`
