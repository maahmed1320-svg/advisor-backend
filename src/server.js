import express    from 'express'
import cors       from 'cors'
import { router } from './routes/advisor.js'
import { router as chatRouter } from './routes/chat.js'

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: '*',   // allow any origin (Railway frontend URL)
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))
app.use(express.json())
app.use('/api', router)
app.use('/api/chat', chatRouter)

app.get('/', (_, res) => res.json({ status: 'ok', service: 'advisor-backend' }))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`)
})
