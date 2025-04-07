# Active Context

_This file tracks the current focus, recent changes, and immediate next steps._

## Current Focus

Completing the refactoring of Index page listing fetching into a custom hook based on user feedback.

## Recent Changes

- Created custom hook `useListings` (`src/hooks/useListings.tsx`) to encapsulate Supabase listing fetch logic, state management (listings, loading, error), and `useEffect`.
- Refactored `src/pages/Index.tsx` to import and use the `useListings` hook, removing the direct fetching logic and state management from the component.
- Updated `changelog.md` to reflect the refactoring.

## Next Steps

- Update `memory-bank/progress.md` to reflect the refactoring and creation of the `useListings` hook.
- Attempt completion of the task.

## Active Decisions & Considerations

_(Record any ongoing discussions, choices being weighed, or important factors influencing the current work.)_

- **Running Migrations Locally:** To apply the new migration locally, use the following command in your terminal: `supabase db push`. This will update your local database schema with the changes defined in the migration file.

## Important Patterns & Preferences

- Preference for using dedicated libraries for common tasks like form management (React Hook Form) over manual implementation or native APIs (`FormData`) when dealing with controlled components and complex validation.
- Use of `zod` for schema validation, integrated with React Hook Form.
- Custom hooks (`useAddListingForm`, `useListings`) for encapsulating logic (form handling, data fetching).
- Feature-first project structure (though not directly modified in this task).
- Consistent use of Shadcn UI components.

## Learnings & Insights

_(Capture any new understanding gained about the project, technology, or user needs.)_

- **Important Reminder:** Always double-check that the fields being queried in Supabase (or any database) actually exist in the database schema. This prevents runtime errors and ensures data consistency.
