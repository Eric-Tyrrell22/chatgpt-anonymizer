const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const PROMPT         = `You are a bot trying to prevent de-anonymization. we need a new version that protects the author from de-anonymization using stylometry, while preserving the original meaning.`;

async function anonymizeText( text, secret = null ) {
	secret ??= process.env.OPEN_AI_KEY;
  const openaiResponse = await axios.post(OPENAI_API_URL, {
    model: "gpt-3.5-turbo",
    messages: [
      { role: 'system', content: PROMPT },
      { role: 'user', content: text },
    ],
    max_tokens: 300,
    temperature: 0.7,
    n: 1,
    stop: 'Anonymized text:',
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ secret }`,
    }
  });

  return openaiResponse.data.choices[0].message.content
}

module.exports = { anonymizeText };
