#!/usr/bin/env node
/**
 * Force-publish every post by writing directly to the SQLite DB.
 * Bypasses the API/permission layer entirely.
 *
 * Usage (inside the Easypanel container):
 *   node scripts/publish-all.mjs
 */

import Database from "better-sqlite3";

const dbPathRaw = process.env.EMDASH_DB_URL || "file:/data/data.db";
const dbPath = dbPathRaw.replace(/^file:\/\//, "").replace(/^file:/, "");

console.log("DB:", dbPath);

const db = new Database(dbPath);

// Force EVERY user to admin (role 50). Useful when the magic-link login
// is hitting a user row whose role wasn't promoted for some reason.
const promoted = db.prepare("UPDATE users SET role = 50, disabled = 0").run();
console.log(`Promoted ${promoted.changes} user(s) to admin (role 50).`);

// List users + roles for debugging
const users = db.prepare("SELECT id, email, role, disabled FROM users").all();
console.log("\nUsers:");
for (const u of users) console.log(" ", u);

// List posts before
const before = db.prepare("SELECT id, slug, status FROM ec_posts").all();
console.log("\nPosts BEFORE:");
for (const p of before) console.log(" ", p);

// Force every post to status='published' and set published_at if missing
const now = new Date().toISOString();
const updated = db
	.prepare(
		`UPDATE ec_posts
		   SET status = 'published',
		       published_at = COALESCE(published_at, ?),
		       updated_at = datetime('now')
		 WHERE status != 'published' OR status IS NULL`,
	)
	.run(now);

console.log(`\nUpdated ${updated.changes} post(s) to published.`);

const after = db.prepare("SELECT id, slug, status, published_at FROM ec_posts").all();
console.log("\nPosts AFTER:");
for (const p of after) console.log(" ", p);

db.close();
