import { Router } from 'express'

export const router = Router()

router.post('/', async (req, res) => {
  const { messages, systemPrompt } = req.body
  if (!messages || !systemPrompt) return res.status(400).json({ error: 'Missing fields' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' })

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-key':       apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system:     systemPrompt,
        messages,
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(response.status).json(data)
    return res.json({ reply: data.content?.[0]?.text ?? '' })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})
