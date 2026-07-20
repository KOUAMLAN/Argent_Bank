const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connecter les routes utilisateurs sur /api/v1/user
// Cela donne : /api/v1/user/login, /api/v1/user/profile, etc.
app.use('/api/v1/user', userRoutes)

// Swagger Documentation
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: { title: 'Argent Bank API', version: '1.0.0', description: 'Argent Bank API Documentation' },
        servers: [{ url: `http://localhost:${PORT}` }],
        components: {
            securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./routes/*.js'], 
}
const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})