const fs = require('fs');
const content = fs.readFileSync('/src/data/itinerary.ts', 'utf8');
const fixed = content.replace(/\},[\s\S]*?\{\s+day: 4,/g, '},\n  {\n    day: 4,');
fs.writeFileSync('/src/data/itinerary.ts', fixed);
