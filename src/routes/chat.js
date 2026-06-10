import { Router } from 'express'

export const router = Router()

router.post('/', async (req, res) => {
  const { messages, systemPrompt } = req.body
  if (!messages || !systemPrompt) {
    return res.status(400).json({ error: 'Missing required system fields' })
  }

  // 💡 FIXED: Changed from 'env' to the standard global node execution pointer 'process.env'
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured in environment variables' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 1200, // Boosted slightly to ensure long study plan answers don't truncate mid-sentence
        temperature: 0.5, // Keeps responses focused on facts without hallucinating prerequisites
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content })),
        ],
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: data.error?.message ?? 'OpenAI Gateway encountered an error processing token contexts' 
      })
    }

    return res.json({ reply: data.choices?.[0]?.message?.content ?? '' })

  } catch (e) {
    console.error("Express Chat Route Error:", e);
    // 💡 FIXED: Guarantees a clean JSON structure is returned to prevent proxy hangups
    if (!res.headersSent) {
      return res.status(500).json({ error: `Connection Refused: ${e.message}` })
    }
  }
})