import path from "path";
import fg from "fast-glob";
import * as core from "@actions/core";
import { promises as fs } from "fs";

interface IEntry {
  // TODO: Remove the interface
  name: string;
  path: string;
  type: "file" | "directory";
  size?: number;
}

// TODO: Verify if .dockerfile need improve
const finder = async ({
  dir,
  file,
  ignore,
  onlyFiles,
}: {
  dir: string;
  file: string;
  ignore: string[];
  onlyFiles?: boolean;
}) => {
  try {
    console.log(`\n🔍 Scanning directory: ${dir}`);
    // await showDirectoryListing(dir); //* The function should have only purpose

    const scan = await fg(`**/${file}`, {
      cwd: dir,
      ignore: ignore,
      onlyFiles: onlyFiles, // Only return files
    });

    console.log("🔍 Scan results:", scan);
    core.debug(`Found .dockerignore files: ${scan}`); // TODO : See how should implement and use debug core on github

    if (scan.length === 0) {
      console.log("❌ No .dockerignore files found");
      return null;
    }

    const fullPaths = scan.map((file) => path.join(dir, file));
    console.log("✅ Full paths:", fullPaths);

    return fullPaths;
  } catch (error) {
    console.error("Error finding .dockerignore files:", error);
    core.error(`Error finding .dockerignore files: ${error}`);
    return null;
  }
};

const listDirectory = async (dir: string) => {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const result = {
      path: dir,
      files: [] as IEntry[],
      directories: [] as IEntry[],
      total: entries.length,
    };

    for (const entry of entries) {
      const fullpath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        result.directories.push({
          name: entry.name,
          path: fullpath,
          type: "directory",
        });
      } else if (entry.isFile()) {
        const stats = await fs.stat(fullpath);
        result.files.push({
          name: entry.name,
          path: fullpath,
          type: "file",
          size: stats.size,
        });
      }
    }
    return result;
  } catch (error) {
    console.error(`Error listing directory ${dir}:`, error);
    core.error(`Error listing directory ${dir}: ${error}`);
    throw error;
  }
};

const showDirectoryListing = async (dir: string) => {
  const listing = await listDirectory(dir);

  if (!listing) {
    core.warning(`Could not list directory: ${dir}`);
    return;
  }

  console.log(`\n📁 Directory: ${listing.path}`);
  console.log(`📊 Total items: ${listing.total}\n`);

  if (listing.directories.length > 0) {
    console.log("📂 Directories:");
    listing.directories.forEach((dir) => {
      console.log(`📁 ${dir.name}`);
    });
    console.log();
  }

  if (listing.files.length > 0) {
    console.log("📄 Files:");
    listing.files.forEach((file) => {
      const size = ((file.size ?? 0) / 1024).toFixed(2);
      console.log(`   📄 ${file.name} (${size} KB)`);
    });
    console.log();
  }

  core.info(
    `Directory ${dir} contains ${listing.files.length} files and ${listing.directories.length} directories`
  );
};

export { finder, listDirectory, showDirectoryListing };
