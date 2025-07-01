const express = require("express");
const next = require("next");

const nextApp = next({ dev: true });
const handleRequest = nextApp.getRequestHandler();

const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

async function startServer() {
  await nextApp.prepare();

  const app = express();

  app.use(express.json());

  app.use('/api/users', userRoutes);
  app.use('/api/restaurants', restaurantRoutes);

  app.all('*', (req, res) => {
    return handleRequest(req, res);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});