#!/usr/bin/env node
/**
 * Diagnostic: shows users and setup flag from both possible DB locations.
 * Usage: node scripts/check-db.mjs
 */
import Database from "better-sqlite3";

const paths = ["/data/data.db", "/app/demos/isaacbosch/data.db", "./data.db"];

for (const path of paths) {
	console.log("\n=== " + path + " ===");
	try {
		const db = new Database(path, { readonly: true, fileMustExist: true });
		console.log("users:", db.prepare("SELECT id, email, role FROM users").all());
		console.log(
			"setup options:",
			db.prepare("SELECT name, value FROM options WHERE name LIKE 'emdash:setup%'").all(),
		);
		db.close();
	} catch (e) {
		console.log("(skip)", e.message);
	}
}
