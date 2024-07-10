const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = 3001; // Use a different port to avoid conflicts with the React app

const cors = require('cors');
app.use(cors());


app.get('/api/scrape', async (req, res) => {
  const url = 'http://www.ipu.ac.in/exam_notices.php';

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const scrapedData = [];

    $('table tr td a').each((index, element) => {
      if (index < 2) { // Limit to top 5 latest updated data
        const title = $(element).text().trim();
        const href = $(element).attr('href');

        // Ensure the href is an absolute URL if it's a relative one
        const absoluteHref = href.startsWith('http') ? href : `http://www.ipu.ac.in/${href}`;

        scrapedData.push({ title, href: absoluteHref });
      }
    });

    res.json(scrapedData);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
