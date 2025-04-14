const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Openverse Media Search API',
      version: '1.0.0',
      description: 'Interactive API documentation'
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ✅ Route to download raw API spec JSON
app.get('/api-spec.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// ✅ Route definitions
app.use('/auth', authRoutes);
app.use('/search', searchRoutes);

// ✅ Start server only if not in test mode
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ Export app for testing
module.exports = app;
