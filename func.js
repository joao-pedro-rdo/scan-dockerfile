const fg = require("fast-glob");
const path = require("path");
const core = require("@actions/core");
const fs = require("fs").promises;

// ✅ Nova função para listar diretório (como ls)
const fg = require("fast-glob");
const path = require("path");
const core = require("@actions/core");
const fs = require("fs").promises;

const listDirectory = async (dir) => {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const result = {
      path: dir,
      files: [],
      directories: [],
      total: entries.length,
    };

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        result.directories.push({
          name: entry.name,
          path: fullPath,
          type: "directory",
        });
      } else if (entry.isFile()) {
        const stats = await fs.stat(fullPath);
        result.files.push({
          name: entry.name,
          path: fullPath,
          type: "file",
          size: stats.size,
          modified: stats.mtime,
        });
      }
    }

    return result;
  } catch (error) {
    console.error(`Error listing directory ${dir}:`, error);
    core.error(`Error listing directory: ${error.message}`);
    return null;
  }
};

// ✅ Função para exibir o "ls" formatado
const showDirectoryListing = async (dir) => {
  const listing = await listDirectory(dir);

  if (!listing) {
    core.warning(`Could not list directory: ${dir}`);
    return;
  }

  console.log(`\n📁 Directory: ${listing.path}`);
  console.log(`📊 Total items: ${listing.total}\n`);

  // Mostrar diretórios
  if (listing.directories.length > 0) {
    console.log("📂 Directories:");
    listing.directories.forEach((dir) => {
      console.log(`   📁 ${dir.name}`);
    });
    console.log();
  }

  // Mostrar arquivos
  if (listing.files.length > 0) {
    console.log("📄 Files:");
    listing.files.forEach((file) => {
      const size = (file.size / 1024).toFixed(2);
      console.log(`   📄 ${file.name} (${size} KB)`);
    });
    console.log();
  }

  // Log para GitHub Actions
  core.info(
    `Directory ${dir} contains ${listing.files.length} files and ${listing.directories.length} directories`
  );
};
// TODO look if how set the debug mode and set onlu list director on debug mode
// TODO: Verify if .dockerfile need improve
const finderDockerignore = async (dir) => {
  try {
    // ✅ Mostrar conteúdo do diretório primeiro
    console.log(`\n🔍 Scanning directory: ${dir}`);
    await showDirectoryListing(dir);

    const scan = await fg("**/.dockerignore", {
      cwd: dir,
      ignore: ["node_modules/**", "dist/**", "build/**"], //TODO: Add more ignores if needed
      onlyFiles: true, // Only return files
    });

    console.log("🔍 Fast-glob scan results:", scan);
    core.debug(`Found .dockerignore files: ${scan}`);

    if (scan.length === 0) {
      console.log("❌ No .dockerignore files found");
      return null;
    }

    const fullPaths = scan.map((file) => path.join(dir, file));
    console.log("✅ Full paths:", fullPaths);

    return fullPaths;
  } catch (error) {
    console.error("Error finding .dockerignore files:", error);
    core.error(`Error finding .dockerignore files: ${error.message}`);
    return null;
  }
};

// ✅ Export todas as funções
module.exports = {
  finderDockerignore,
  listDirectory,
  showDirectoryListing,
};
