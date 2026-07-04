// database/setup.mjs
//
// Run this once with: node database/setup.mjs
// Creates two related tables (trails, and trail_notes) and seeds them
// with example data - including a trail with TWO notes, one with none,
// to clearly demonstrate a one-to-many relationship.

import { db, run } from "./db.mjs";

async function setup() {
  await run(`
    CREATE TABLE IF NOT EXISTS trails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      distance_km REAL NOT NULL,
      description TEXT NOT NULL
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS trail_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      trail_id INTEGER NOT NULL,
      note TEXT NOT NULL,
      FOREIGN KEY (trail_id) REFERENCES trails(id)
    )
  `);

  const existing = await new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) AS count FROM trails", (err, row) => {
      if (err) reject(err); else resolve(row.count);
    });
  });

  if (existing > 0) {
    console.log("Database already has data - skipping seed.");
    process.exit(0);
  }

  const trails = [
    { slug: "willow-creek", name: "Willow Creek Loop", difficulty: "Easy", distanceKm: 3.2,
      description: "A flat, gentle loop following the creek - a good starting trail.", notes: [] },
    { slug: "ridgeline", name: "Ridgeline Trail", difficulty: "Moderate", distanceKm: 6.8,
      description: "A steady climb with good views from the ridge.",
      notes: ["Can be muddy after rain - sturdy footwear recommended.", "Closed during nesting season, March to May."] },
    { slug: "summit-scramble", name: "Summit Scramble", difficulty: "Hard", distanceKm: 9.5,
      description: "A steep, rocky route to the summit for experienced walkers only.",
      notes: ["Not recommended in poor weather."] }
  ];

  for (const trail of trails) {
    const result = await run(
      "INSERT INTO trails (slug, name, difficulty, distance_km, description) VALUES (?, ?, ?, ?, ?)",
      [trail.slug, trail.name, trail.difficulty, trail.distanceKm, trail.description]
    );

    for (const note of trail.notes) {
      await run(
        "INSERT INTO trail_notes (trail_id, note) VALUES (?, ?)",
        [result.lastID, note]
      );
    }
  }

  console.log("Database created and seeded.");
  process.exit(0);
}

setup().catch(err => {
  console.error("Error setting up database:", err);
  process.exit(1);
});
