const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, 'database');
const files = fs.readdirSync(DB_DIR).filter(f => f.endsWith('.md'));

const database = files.map(f => ({
    id: f.replace('.md', ''),
    filename: f
}));

fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
console.log("Mappa aggiornata.");