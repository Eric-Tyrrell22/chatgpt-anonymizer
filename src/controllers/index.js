const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const prompt = `You are a bot trying to prevent de-anonymization. we need a new version that protects the author from de-anonymization using stylometry, while preserving the original meaning.`;

async function anonymizeText(req, res) {
  try {
    const { text } = req.body;

    // Send the user's text to OpenAI
    const openaiResponse = await axios.post(OPENAI_API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: text },
      ],
      max_tokens: 300,
      temperature: 0.7,
      n: 1,
      stop: 'Anonymized text:',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`,
      },
    });

    const anonymizedText = openaiResponse.data.choices[0].message.content

    res.json({ text: anonymizedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { chatgpt: anonymizeText };
