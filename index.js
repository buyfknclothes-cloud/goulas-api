const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwHBG8LtYnyBOd7AZ3EptQ9v5-WIpnyiL0tqqusG03UbSn-JUlf4tOlyY6hZqKprOv8Qw/exec';
app.get('/api', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const response = await fetch(GAS_URL + '?' + params, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json, text/javascript, */*'
      }
    });
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch(e) {
      res.status(500).json({ error: 'GAS returned HTML instead of JSON', preview: text.substring(0, 200) });
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Running on port 3000'));
