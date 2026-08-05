# Phase 18E — Complete appearance themes

Status: complete August 5, 2026.

## Outcome

Pressed Pages now has three complete light appearance themes that apply through
the same semantic paper, ink, accent, border, shadow, and focus tokens used by
the application:

- **Paper Light** is the approved default and retains the existing warm ivory
  archive.
- **Rose Letter** uses soft rose paper, botanical brass, and plum-cocoa ink.
- **Sage Study** uses calm sage paper, warm brass, and deep green ink.

The setting lives in Settings & Privacy → Appearance. It previews immediately
and continues to save through the existing owned profile-preference flow. No
new table, migration, third-party dependency, or library-data mutation is
needed because `appearancePreferences` is already an owned profile-data
document.

## Safe preference contract

- Theme identifiers are versioned: `paper-v1`, `rose-letter-v1`, and
  `sage-study-v1`.
- An unknown, retired, malformed, or missing identifier always becomes
  `paper-v1`; existing motion and density preferences still normalize to their
  supported values.
- Future unknown preference fields are retained when the known appearance
  values are normalized.
- The visual material resolver maps those identifiers to the existing Classic,
  Romance, and new Sage scrapbook material collections. No route introduces
  its own one-off theme override.

## Accessibility and export behavior

- All themes remain light color schemes with dark ink on pale paper.
- Focus uses the active theme's high-contrast semantic focus token.
- Reduced-motion and Cozy/Compact density settings remain independent of the
  chosen theme.
- Print rendering returns paper surfaces to white/light gray and keeps ink
  dark, preventing rose or sage washes from compromising print/export clarity.

## Verification

- Settings Appearance UI lists and previews all three theme choices in the
  signed-in local app.
- Rose Letter and Sage Study visibly update the shared tokens without console
  errors; Paper Light was restored after read-only QA.
- `npm run lint`, `npm test` (46 passing), `npm run build`, release audit, and
  `git diff --check` pass.
- QA created no book, review, reading-log, upload, social, or profile-data
  changes.
