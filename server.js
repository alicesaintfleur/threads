const express = require('express');
const path = require('path');

// Node 18+ has global fetch. If you're unsure, uncomment next line:
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint — API key stays on the server
app.post('/api/generate', async (req, res) => {
  const { system, user } = req.body;

  if (!system || !user) {
    return res.status(400).json({ error: 'Missing system or user prompt.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY missing at runtime");
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1000,
        system,
        messages: [
          {
            role: 'user',
            content: user
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", data);
      return res.status(response.status).json({
        error: 'Anthropic API error',
        detail: data
      });
    }

    const text = data.content?.map(c => c.text || '').join('') || '';

    res.json({ text });

  } catch (err) {
    console.error("Server crash:", err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// Catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Threads Generator running on port ${PORT}`);
});
