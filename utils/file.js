const fs = require("fs").promises;
const { logger } = require("./logger");
const TOKEN_FILE = "token.json";

// Function to save the token
async function saveToken(data) {
  try {
    let tokens = [];
    try {
      const fileData = await fs.readFile(TOKEN_FILE, "utf8");
      tokens = JSON.parse(fileData);
    } catch (error) {
      logger("No previous tokens found.", "error");
    }

    const tokenExists = tokens.some((token) => token.username === data.username);

    if (tokenExists) {
      logger(`Token for ${data.username} already exists.`);
    } else {
      tokens.push(data);

      await fs.writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2));
      logger("Token saved successfully!", "success");
    }
  } catch (error) {
    logger("Error saving token:", "error", error);
  }
}

// Function to read all saved tokens
async function readToken() {
  try {
    const data = await fs.readFile(TOKEN_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    logger("No tokens found. Please login first.", "error");
    process.exit(1);
  }
}

async function loadProxies() {
  try {
    const data = await fs.readFile("proxy.txt", "utf8");
    return data.split("\n").filter((proxy) => proxy.trim() !== "");
  } catch (error) {
    logger("Error reading proxy file:", "error", error);
    return [];
  }
}

module.exports = { saveToken, readToken, loadProxies };
