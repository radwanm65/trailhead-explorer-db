# Trailhead Explorer (with Database) — QHO431 Week 6

The same site from Week 5, with the hard-coded array replaced by a real
SQLite database — including a one-to-many relationship (trails to notes).

## What this demonstrates

| Feature | Where to look |
|---|---|
| Two related tables (`trails`, `trail_notes`) | `database/setup.mjs` |
| A one-to-many relationship (one trail, many notes) | `database/setup.mjs` seed data, `views/trail.ejs` loop |
| Promise-wrapped sqlite3 helpers | `database/db.mjs` |
| Parameterised queries throughout | `routes/pages.mjs` |
| A dynamic route reading from the database instead of an array | `routes/pages.mjs` |

## Running it

```
npm install
npm run setup-db   # creates and seeds database/trailhead.db - only needed once
node index.mjs
```

Visit http://localhost:5000

Try `/trail/ridgeline` (two notes), `/trail/summit-scramble` (one note),
and `/trail/willow-creek` (no notes) to see the one-to-many relationship
rendering correctly in each case.

## Compare against Week 5

Open this project's `routes/pages.mjs` next to Week 5's version — the
routes themselves barely change. Only *where the data comes from*
changes. That's the main teaching point of this week.
