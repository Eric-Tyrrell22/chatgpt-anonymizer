const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

async function anonymizeText(req, res) {
  try {
    const { text } = req.body;

    // Send the user's text to OpenAI
    const openaiResponse = await axios.post(OPENAI_API_URL, {
			model: "text-davinci-003",
      prompt: `The following paragraphs are written by someone. I need a new version that uses appropriate language and protects the author from de-anonymization using stylometry, while preserving the original meaning. \nOriginal text: ${text}\nAnonymized text:`,
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

    // Extract the anonymized text from OpenAI's response
    const anonymizedText = openaiResponse.data.choices[0].text.trim();

    res.json({ text: anonymizedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { chatgpt: anonymizeText };
