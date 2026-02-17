const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint — API key stays on the server, never exposed to users
app.post('/api/generate', async (req, res) => {
  const { system, user } = req.body;

  if (!system || !user) {
    return res.status(400).json({ error: 'Missing system or user prompt.' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        system,
        messages: [{ role: 'user', content: user }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: 'Anthropic API error', detail: err });
    }

    const data = await response.json();
    const text = data.content.map(c => c.text || '').join('');
    res.json({ text });

  } catch (e) {
    res.status(500).json({ error: 'Server error: ' + e.message });
  }
});

// Catch-all: serve the app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Threads Generator running on port ${PORT}`));
