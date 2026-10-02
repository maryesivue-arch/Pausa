# Development Journal

## 02-10-2026 --- Project Setup

### Goal

Build the Pausa fasting dashboard from the supplied three-screen
reference using only HTML, CSS, and vanilla JavaScript.

### Screens

-   Fasting Dashboard
-   Fasting Plan Selection
-   Progress and History

### Technical Direction

The application will be a small client-side web app.

Technology:

-   HTML
-   CSS
-   Vanilla JavaScript
-   localStorage

### Constraints

-   No Tailwind CSS.
-   No CSS variables.
-   No frameworks.
-   No backend.
-   No external database.
-   No unnecessary dependencies.
-   Keep the code simple and readable.

### Persistence Plan

Use `localStorage` for the small amount of application state needed by
the prototype:

-   Selected fasting plan.
-   Current fasting session.
-   Fasting history.
-   Schedule data.
-   Progress values.

### UI Direction

The implementation should closely follow the reference screens:

-   Purple primary color.
-   Light background.
-   Left sidebar navigation.
-   White content cards.
-   Rounded corners.
-   Subtle borders.
-   Clean typography.
-   Spacious layout.
-   Simple charts and progress indicators.

### Initial Build Scope

The first implementation should focus only on the core experience:

1.  Build the shared application shell.
2.  Add the three screen views.
3.  Add sidebar navigation.
4.  Implement fasting timer and start/end actions.
5.  Implement fasting plan selection.
6.  Implement progress/history updates.
7.  Add localStorage persistence.
8.  Make the layout responsive.
9.  Verify that the three screens work together.

### Notes

Keep implementation decisions practical. Do not introduce abstractions
or architecture that are unnecessary for this small prototype.

------------------------------------------------------------------------

## Future Updates

Add dated entries below this section as the project evolves.

Format:

### DD-MM-YYYY --- Update Title

## **What changed**

## **Why**

## **Notes**
