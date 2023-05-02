module.exports = {
  invalid_dirs: [".git", ".vscode", "node_modules", "react_views"],
  valid_dirs: ["assets", "views","static"],
  invalid_exts: [
    ".bat",
    ".env",
    ".htaccess",
    ".gitignore",
    // ".json",
    ".txt",
    ".md",
    ".tmp",
  ],
  invalid_files: [".htaccess", ".gitignore", ".npmrc", ".env"],
  LogPath : "./src/logs/",
};
