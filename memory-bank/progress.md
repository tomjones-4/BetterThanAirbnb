# Progress

_This file tracks what works, what's left to build, the current status, and known issues._

## What Works

- Basic property listing display on the homepage.
- Google OAuth authentication via the navigation bar.
- Add Listing feature (accessible via modal after login).
- Add Listing form state management and validation refactored using React Hook Form and Zod.

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
