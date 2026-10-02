# Pausa Fasting Dashboard

## Project Overview

Pausa is a simple fasting tracker dashboard based on three reference
screens:

1.  Fasting Dashboard
2.  Fasting Plan Selection
3.  Progress and History

The goal is to recreate the supplied UI as a clean, responsive front-end
prototype using only HTML, CSS, and vanilla JavaScript.

## Problem

Users need a simple way to:

-   See their current fasting status.
-   Start and end a fast.
-   Choose a fasting plan.
-   View their daily fasting schedule.
-   Track completed fasts.
-   Review recent fasting history and progress.

## Target User

A person who wants a straightforward visual dashboard for managing and
tracking a fasting routine.

## Core Features

### Dashboard

-   Current fast timer.
-   Start and end time information.
-   Start/end fasting action.
-   Today's fasting rhythm.
-   Hydration reminder card.
-   Weekly fasting overview.
-   Current selected plan.

### Fasting Plans

-   Three fasting plan cards.
-   Select a fasting plan.
-   Highlight the currently selected plan.
-   Daily schedule display.
-   Basic schedule editing.
-   Beginner guidance card.

### Progress and History

-   Completed fasts count.
-   Average fasting time.
-   Current streak.
-   Weekly fasting chart.
-   Fasting history table.
-   Basic date and duration information.

## Data Persistence

Use browser Web Storage only.

Use `localStorage` to persist:

-   Selected fasting plan.
-   Fasting start/end state.
-   Fasting history.
-   Current streak.
-   Basic schedule data.

The application should continue to show saved data after a page refresh.

Do not use a backend, database, API, authentication, or external
service.

## Technology

-   HTML
-   CSS
-   Vanilla JavaScript
-   Browser localStorage

## Restrictions

-   Do not use Tailwind CSS.
-   Do not use Bootstrap.
-   Do not use React, Vue, Angular, or another framework.
-   Do not use CSS variables/custom properties.
-   Do not add unnecessary libraries or dependencies.
-   Do not add a build system.
-   Keep the implementation simple and readable.

## Visual Direction

The UI should closely follow the supplied reference:

-   Light gray/white application background.
-   Purple as the primary interaction color.
-   Clean cards with subtle borders and rounded corners.
-   Compact left sidebar navigation.
-   Spacious dashboard content.
-   Clear typography hierarchy.
-   Minimal shadows.
-   Simple progress indicators.
-   Desktop-first layout with responsive behavior for smaller screens.

The implementation should prioritize visual similarity and usability
without adding unnecessary features.

## Main Files

-   `index.html` --- application structure and screen containers.
-   `style.css` --- all styling.
-   `script.js` --- navigation, timers, interactions, and localStorage.
-   `README.md` --- project documentation.
-   `JOURNAL.md` --- development journal.

## Definition of Done

-   All three screens are implemented.
-   Navigation switches between the three screens without a page reload.
-   Fasting timer works.
-   Start/end fasting actions work.
-   A fasting plan can be selected.
-   Progress/history updates when a fast is completed.
-   Data survives page refresh through localStorage.
-   Layout is responsive.
-   No frameworks or Tailwind are used.
-   No CSS variables are used.
-   Code remains simple enough for another designer/developer to
    understand quickly.
