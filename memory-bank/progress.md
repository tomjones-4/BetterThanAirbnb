# Progress

_This file tracks what works, what's left to build, the current status, and known issues._

## What Works

- Index page (`src/pages/Index.tsx`):
  - Uses the `useListings` hook to fetch listings from Supabase database.
  - Combines database listings with mock data (DB prioritized).
  - Displays listings using `PropertyCard`.
  - Implements loading and error states via the `useListings` hook.
  - Makes each property card a clickable link to its detail page (`/listings/:id`).
- Custom hook `useListings` (`src/hooks/useListings.tsx`):
  - Encapsulates Supabase listing fetch logic, state management (listings, loading, error), and `useEffect`.
- Added `created_at` column to the `listings` table.
- Google OAuth authentication via the navigation bar.
- Add Listing feature (accessible via modal after login).
- Add Listing form state management and validation refactored using React Hook Form and Zod.
- Add Listing form updated to include all fields from the database schema.
- Listing page (`/listings/:id`) route fixed and UI significantly refactored for better presentation:
  - Uses grid layout, image carousel, icons, badges, skeletons, and improved error/loading states.
- Improved styling and scrollability of the Add Listing form.
- Improved the listing details page by adjusting spacing, conditionally rendering details, adding a placeholder image, and using the same amenity icons as the Add Listing form.
- Implemented the changes to the listing details page.

## What's Left to Build

_(Outline the remaining tasks, features, or components that need to be implemented.)_

## Current Status

_(Provide a summary of the project's overall state, including any milestones reached or deadlines approaching.)_

## Known Issues

_(Document any bugs, limitations, or areas of concern that need to be addressed.)_

## Evolution of Project Decisions

- **Authentication:** Moved from separate sign-in/sign-up routes/modal to integrated Google OAuth in the navigation bar (2025-02-23).
- **Add Listing Access:** Initially open, now requires user login via Google OAuth (2025-03-29).
- **Add Listing Form Management:** Refactored from individual `useState` hooks to using `react-hook-form` with `zod` for better maintainability, validation, and performance (2025-03-31).
- **Add Listing Form Update:** Updated the Add Listing form to include all fields from the database schema and updated the listing route to display a summary of the listing data (2025-03-31).
- **Add Listing Form Styling:** Improved styling and scrollability of the Add Listing form (2025-03-31).
