const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const GAS_URL = 'https://script.google.com/macros/s/AKfycbyHaQXeoh8LPZRaxwM_rbKD49K4b-wBwrNlD2PyZonX1vdWKttze4mvIYyXf52TmX6stw/exec';

app.get('/api', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const response = await fetch(GAS_URL + '?' + params, { redirect: 'follow' });
    const data = await response.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Running on port 3000'));
