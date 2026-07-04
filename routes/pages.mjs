// routes/pages.mjs
//
// The routes themselves look almost identical to Week 5 - the only
// real change is WHERE the data comes from. Compare this file line
// for line against the Week 5 version if you have it open.

import { Router } from "express";
import { all, get } from "../database/db.mjs";

const router = Router();

router.get("/", async (req, res) => {
  const trails = await all("SELECT * FROM trails");
  res.render("home", { pageTitle: "Trailhead Explorer", trails });
});

router.get("/faq", (req, res) => {
  res.render("faq", { pageTitle: "FAQ" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { pageTitle: "Contact Us" });
});

router.get("/trail/:slug", async (req, res) => {
  // A parameterised query - the value from the URL is passed as a
  // separate parameter, never concatenated into the SQL string itself.
  const trail = await get("SELECT * FROM trails WHERE slug = ?", [req.params.slug]);

  if (!trail) {
    return res.status(404).render("404", { pageTitle: "Not Found", path: req.originalUrl });
  }

  // A trail can have many notes (a one-to-many relationship) - fetched
  // as a separate, related query using the trail's own id.
  const notes = await all("SELECT * FROM trail_notes WHERE trail_id = ?", [trail.id]);

  res.render("trail", { pageTitle: trail.name, trail, notes });
});

export default router;
