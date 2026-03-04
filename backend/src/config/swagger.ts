import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🎬 Movie Watchlist API',
      version: '1.0.0',
      description:
        'REST API for Movie Watchlist App — supports user auth and full CRUD for movies',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local Development Server',
      },
    ],
    // ← Defines the Bearer token security scheme used across protected routes
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token. Example: eyJhbGc...',
        },
      },
      schemas: {
        // ─── User Schemas ───────────────────────────────
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@test.com' },
            password: { type: 'string', example: 'password123', minLength: 6 },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'john@test.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '64b1f2c3d4e5f6a7b8c9d0e1' },
                name: { type: 'string', example: 'John Doe' },
                email: { type: 'string', example: 'john@test.com' },
                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5...' },
              },
            },
          },
        },
        // ─── Movie Schemas ───────────────────────────────
        MovieRequest: {
          type: 'object',
          required: ['title', 'imdbID'],
          properties: {
            title: { type: 'string', example: 'Inception' },
            poster: { type: 'string', example: 'https://m.media-amazon.com/...' },
            imdbID: { type: 'string', example: 'tt1375666' },
            rating: { type: 'number', example: 9, minimum: 0, maximum: 10 },
            watched: { type: 'boolean', example: false },
            year: { type: 'string', example: '2010' },
            type: { type: 'string', example: 'movie' },
            watchedDate: { type: 'string', example: '2026-03-03' },
          },
        },
        MovieUpdateRequest: {
          type: 'object',
          properties: {
            rating: { type: 'number', example: 10, minimum: 0, maximum: 10 },
            watched: { type: 'boolean', example: true },
            watchedDate: { type: 'string', example: '2026-03-03' },
          },
        },
        MovieResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '64b1f2c3d4e5f6a7b8c9d0e1' },
                user: { type: 'string', example: '64b1f2c3d4e5f6a7b8c9d0e2' },
                title: { type: 'string', example: 'Inception' },
                poster: { type: 'string', example: 'https://...' },
                imdbID: { type: 'string', example: 'tt1375666' },
                rating: { type: 'number', example: 9 },
                watched: { type: 'boolean', example: false },
                year: { type: 'string', example: '2010' },
                type: { type: 'string', example: 'movie' },
                watchedDate: { type: 'string', example: '' },
                createdAt: { type: 'string', example: '2026-03-03T00:00:00.000Z' },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message here' },
          },
        },
      },
    },
  },
  // ← Tell swagger-jsdoc where to look for JSDoc comment blocks
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;