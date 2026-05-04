const fs = require('fs');
const path = require('path');

// Percorsi relativi per massima portabilità
const DB_DIR = path.join(__dirname, 'database');
const OUTPUT = path.join(__dirname, 'database.json');

try {
    const files = fs.readdirSync(DB_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => ({
            id: f.replace('.md', ''),
            filename: f
        }));

    fs.writeFileSync(OUTPUT, JSON.stringify(files, null, 2));
    console.log("Index updated.");
} catch (e) {
    console.error("Failed to index:", e);
}
