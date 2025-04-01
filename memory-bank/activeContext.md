# Active Context

_This file tracks the current focus, recent changes, and immediate next steps._

## Current Focus

Refactoring the Add Listing form (`useAddListingForm` hook and `AddListingDialog` component) to use React Hook Form for better state management and validation.

## Recent Changes

- Installed `react-hook-form` and `@hookform/resolvers/zod`.
- Refactored `useAddListingForm.tsx` to use `useForm` hook, `zod` schema, and associated methods.
- Refactored `AddListingDialog.tsx` to integrate with the updated hook, using `register`, `Controller`, and displaying errors from `formState`.
- Updated `changelog.md` and `memory-bank/techContext.md`.
- Improved styling and scrollability of the Add Listing form by increasing the width of the dialog and adding a scroll area.

## Next Steps

- Update `memory-bank/progress.md`.
- Complete the task by presenting the result.

## Active Decisions & Considerations

_(Record any ongoing discussions, choices being weighed, or important factors influencing the current work.)_

## Important Patterns & Preferences

- Preference for using dedicated libraries for common tasks like form management (React Hook Form) over manual implementation or native APIs (`FormData`) when dealing with controlled components and complex validation.
- Use of `zod` for schema validation, integrated with React Hook Form.
- Custom hooks (`useAddListingForm`) for encapsulating form logic.
- Feature-first project structure (though not directly modified in this task).
- Consistent use of Shadcn UI components.

## Learnings & Insights

_(Capture any new understanding gained about the project, technology, or user needs.)_
