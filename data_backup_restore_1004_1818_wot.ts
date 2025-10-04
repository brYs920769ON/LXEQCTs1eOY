// 代码生成时间: 2025-10-04 18:18:45
import { existsSync, ensureDirSync, copyFileSync, removeSync } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";

// Define a class for Data Backup and Restore operations
class DataBackupRestore {
  private backupDirectory: string;
  private originalDirectory: string;

  constructor(originalDir: string, backupDir: string) {
    this.originalDirectory = originalDir;
    this.backupDirectory = backupDir;
  }

  /**
   * Backup data from the original directory to the backup directory.
   * @param fileName The name of the file to backup.
   */
  public async backup(fileName: string): Promise<void> {
    try {
      const originalFilePath = join(this.originalDirectory, fileName);
      const backupFilePath = join(this.backupDirectory, fileName);

      // Ensures the backup directory exists
      ensureDirSync(this.backupDirectory);

      // Copy file from the original directory to the backup directory
      copyFileSync(originalFilePath, backupFilePath);
      console.log(`Backup successful for file: ${fileName}`);
    } catch (error) {
      console.error(`Error during backup: ${error}`);
      throw error;
    }
  }

  /**
   * Restore data from the backup directory to the original directory.
   * @param fileName The name of the file to restore.
   */
  public async restore(fileName: string): Promise<void> {
    try {
      const backupFilePath = join(this.backupDirectory, fileName);
      const originalFilePath = join(this.originalDirectory, fileName);

      if (!existsSync(backupFilePath)) {
        throw new Error("Backup file does not exist.");
      }

      // Copy file from the backup directory to the original directory
      copyFileSync(backupFilePath, originalFilePath);
      console.log(`Restore successful for file: ${fileName}`);
    } catch (error) {
      console.error(`Error during restore: ${error}`);
      throw error;
    }
  }

  /**
   * Delete a specific backup file.
   * @param fileName The name of the file to delete from backup.
   */
  public async deleteBackup(fileName: string): Promise<void> {
    try {
      const backupFilePath = join(this.backupDirectory, fileName);

      if (!existsSync(backupFilePath)) {
        throw new Error("Backup file does not exist.");
      }

      // Remove the backup file
      removeSync(backupFilePath);
      console.log(`Backup file deleted for: ${fileName}`);
    } catch (error) {
      console.error(`Error during deletion: ${error}`);
      throw error;
    }
  }
}

// Example usage
const originalDir = "./original";
const backupDir = "./backup";

const db = new DataBackupRestore(originalDir, backupDir);
await db.backup("example.txt");
await db.restore("example.txt");
await db.deleteBackup("example.txt");