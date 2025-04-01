# Tech Context

_This file details the technologies used, development setup, technical constraints, and dependencies._

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Supabase (Backend, Auth, Storage)
- react-hook-form (Form management)
- zod (Schema validation)
- lucide-react (Icons)
- date-fns (Date formatting)

## Development Setup

_(Describe how to set up the development environment, including any specific configurations or dependencies.)_

## Technical Constraints

_(Outline any limitations or restrictions imposed by the technology stack or infrastructure.)_

## Dependencies

_(List any external services, APIs, or data sources that the project relies on.)_

## Tool Usage Patterns

- **React Hook Form:** Used for managing form state, validation, and submission, particularly in `useAddListingForm`. Integrates with `zod` for schema validation and `Controller` for complex inputs (e.g., `Calendar`, `Checkbox`).
- **Zod:** Used with `react-hook-form` (`@hookform/resolvers/zod`) to define and enforce validation schemas for forms.
- **Shadcn UI:** Primary component library, used for UI elements like Dialogs, Buttons, Inputs, Calendars, Checkboxes, etc.
- **Supabase Client:** Used for interacting with the Supabase backend for database operations, authentication, and file storage.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Lucide Icons:** Used for iconography throughout the application.
