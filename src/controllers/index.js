const { anonymizeText } = require('../openai');

async function chatgpt(req, res) {
  try {
    const { text } = req.body;

    // Send the user's text to OpenAI
    const anonymizedText= await anonymizeText( text );


    res.json({ text: anonymizedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { chatgpt };
