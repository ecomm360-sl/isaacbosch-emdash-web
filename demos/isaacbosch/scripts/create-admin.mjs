#!/usr/bin/env node
/**
 * One-time admin bootstrap for EmDash.
 *
 * Creates (or promotes) a user to admin role and generates a single-use
 * magic link URL the user can paste in their browser to start a session.
 * From there they can register a passkey from the admin UI.
 *
 * Usage (inside the Easypanel container):
 *   node scripts/create-admin.mjs <email> [name]
 *
 * Env vars:
 *   EMDASH_DB_URL   -- file path to the SQLite DB (default: ./data.db)
 *   SITE_URL        -- public origin (default: http://localhost:4321)
 */

import Database from "better-sqlite3";
import { createHash, randomBytes, randomUUID } from "node:crypto";

const [, , emailArg, nameArg] = process.argv;
if (!emailArg) {
	console.error("Usage: node scripts/create-admin.mjs <email> [name]");
	process.exit(1);
}

const email = emailArg.toLowerCase().trim();
const name = nameArg || email.split("@")[0];

const dbPathRaw = process.env.EMDASH_DB_URL || "file:/data/data.db";
const dbPath = dbPathRaw.replace(/^file:\/\//, "").replace(/^file:/, "");
const siteUrl = (process.env.SITE_URL || "http://localhost:4321").replace(/\/$/, "");

console.log(`DB:    ${dbPath}`);
console.log(`Email: ${email}`);
console.log(`Name:  ${name}`);
console.log(`Site:  ${siteUrl}`);
console.log("");

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// --- helpers --------------------------------------------------------------

function base64url(buf) {
	return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function generateToken() {
	return base64url(randomBytes(32));
}

function hashToken(token) {
	// Mirror packages/auth/src/tokens.ts: decode base64url -> sha256 -> base64url
	const padded = token.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((token.length + 3) % 4);
	const bytes = Buffer.from(padded, "base64");
	const hash = createHash("sha256").update(bytes).digest();
	return base64url(hash);
}

// --- 1. Upsert user as admin ---------------------------------------------

const existing = db.prepare("SELECT id, role FROM users WHERE email = ?").get(email);

let userId;
if (existing) {
	userId = existing.id;
	db.prepare("UPDATE users SET role = 50, name = COALESCE(name, ?), updated_at = datetime('now') WHERE id = ?").run(
		name,
		userId,
	);
	console.log(`Promoted existing user ${userId} to admin (role 50).`);
} else {
	userId = randomUUID();
	db.prepare(
		`INSERT INTO users (id, email, name, role, email_verified, created_at, updated_at)
		 VALUES (?, ?, ?, 50, 1, datetime('now'), datetime('now'))`,
	).run(userId, email, name);
	console.log(`Created admin user ${userId}.`);
}

// --- 1b. Mark setup as complete ------------------------------------------

db.prepare(
	`INSERT INTO options (name, value) VALUES ('emdash:setup_complete', 'true')
	 ON CONFLICT(name) DO UPDATE SET value = 'true'`,
).run();
console.log("Marked setup as complete.");

// --- 2. Generate magic link token (60 min expiry) ------------------------

const token = generateToken();
const hash = hashToken(token);
const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

db.prepare("DELETE FROM auth_tokens WHERE user_id = ? AND type = 'magic_link'").run(userId);
db.prepare(
	`INSERT INTO auth_tokens (hash, user_id, email, type, expires_at, created_at)
	 VALUES (?, ?, ?, 'magic_link', ?, datetime('now'))`,
).run(hash, userId, email, expiresAt);

const url = `${siteUrl}/_emdash/api/auth/magic-link/verify?token=${token}&redirect=/_emdash/admin`;

console.log("");
console.log("==============================================================");
console.log("OPEN THIS URL IN YOUR BROWSER (valid for 60 minutes, single use):");
console.log("");
console.log(url);
console.log("");
console.log("After logging in, go to /_emdash/admin to register your passkey.");
console.log("==============================================================");

db.close();
