import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body

  const apiKey = process.env.PERPLEXITY_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Missing API key' })

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: 'あなたは信頼できるアシスタントです。' },
          { role: 'user', content: message },
        ],
        stream: false,
      }),
    })

    const text = await response.text()
    console.log('▶️ Perplexity raw response:', text)

    if (!response.ok) {
      return res.status(500).json({ error: 'Perplexity API error', detail: text })
    }

    let json
    try {
      json = JSON.parse(text)
    } catch (e) {
      console.error('❌ JSON parse error:', e)
      return res.status(500).json({ error: 'レスポンスの解析に失敗しました', detail: text })
    }

    const reply = json.choices?.[0]?.message?.content ?? 'すみません、うまく取得できませんでした。'
    res.status(200).json({ reply })
  } catch (error) {
    console.error('Perplexity API fetch error:', error)
    res.status(500).json({ error: 'Perplexity API通信に失敗しました。' })
  }
}