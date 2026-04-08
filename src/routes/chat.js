import { Router } from 'express'

export const router = Router()

router.post('/', async (req, res) => {
  const { messages, systemPrompt } = req.body
  if (!messages || !systemPrompt) return res.status(400).json({ error: 'Missing fields' })

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' })

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content })),
        ],
      }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message ?? 'OpenAI error' })
    return res.json({ reply: data.choices?.[0]?.message?.content ?? '' })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})