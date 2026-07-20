// index.mjs
//
// Unchanged in structure from Week 5 - server setup and mounting the
// router. The database connection lives entirely inside
// database/db.mjs and routes/pages.mjs; index.mjs doesn't need to
// know anything about SQLite at all.

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pagesRouter from "./routes/pages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", pagesRouter);

app.listen(PORT, () => {
  console.log(
    `Trailhead Explorer (with database) running at http://localhost:${PORT}`,
  );
});
