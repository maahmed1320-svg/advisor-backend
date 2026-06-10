import express    from 'express'
import cors       from 'cors'
import { router } from './routes/advisor.js'
import { router as chatRouter } from './routes/chat.js'

const app  = express()
const PORT = process.env.PORT || 3001

// Define allowed origins
const allowedOrigins = [
  'http://localhost:5173', // Your local development frontend
  'https://advisor-frontend-production.up.railway.app' // ADD YOUR RAILWAY FRONTEND URL HERE
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true // Enable if you ever need to use cookies or auth headers
}))

app.use(express.json())
app.use('/api', router)
app.use('/api/chat', chatRouter)

app.get('/', (_, res) => res.json({ status: 'ok', service: 'advisor-backend' }))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`)
})