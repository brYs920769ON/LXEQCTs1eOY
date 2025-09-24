// 代码生成时间: 2025-09-24 13:27:08
 * The program includes error handling, documentation, and best practices for maintainability and scalability.
 */

import { dirname, fromFileUrl, resolve } from "https://deno.land/std/path/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import { readJson, writeJson } from "https://deno.land/std/fs/read_json.ts";
import { UserPermissions } from './user_permissions_model.ts';

// Define the database file path
const dbPath = resolve(dirname(fromFileUrl(import.meta.url)), "permissions.json");

/**
 * Loads permissions from the database file.
 * @returns A promise of the permissions object.
 */
async function loadPermissions(): Promise<UserPermissions> {
  try {
    await ensureDir(dirname(dbPath));
    const permissions = await readJson<UserPermissions>(dbPath);
    return permissions;
  } catch (error) {
    throw new Error(`Failed to load permissions: ${error}`);
  }
}

/**
 * Saves permissions to the database file.
 * @param permissions The permissions object to save.
 * @returns A promise that resolves when the permissions are saved.
 */
async function savePermissions(permissions: UserPermissions): Promise<void> {
  try {
    await ensureDir(dirname(dbPath));
    await writeJson(dbPath, permissions);
  } catch (error) {
    throw new Error(`Failed to save permissions: ${error}`);
  }
}

/**
 * Adds a new permission for a user.
 * @param userId The ID of the user.
 * @param permission The permission to add.
 * @returns A promise that resolves when the permission is added.
 */
async function addPermission(userId: string, permission: string): Promise<void> {
  const permissions = await loadPermissions();
  if (!permissions.permissions[userId]) {
    permissions.permissions[userId] = [];
  }
  permissions.permissions[userId].push(permission);
  await savePermissions(permissions);
}

/**
 * Removes a permission from a user.
 * @param userId The ID of the user.
 * @param permission The permission to remove.
 * @returns A promise that resolves when the permission is removed.
 */
async function removePermission(userId: string, permission: string): Promise<void> {
  const permissions = await loadPermissions();
  if (permissions.permissions[userId]) {
    const index = permissions.permissions[userId].indexOf(permission);
    if (index !== -1) {
      permissions.permissions[userId].splice(index, 1);
      await savePermissions(permissions);
    }
  }
}

// Export the functions for use in other modules
export {
  loadPermissions,
  addPermission,
  removePermission,
};