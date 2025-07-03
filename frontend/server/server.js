const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Statische Bilder aus /public/images bereitstellen
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Beispielroute für Testzwecke (optional)
app.get('/', (req, res) => {
  res.send('Express-Server läuft!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});