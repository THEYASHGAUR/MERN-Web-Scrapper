const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://www.ipu.ac.in/exam_notices.php';

axios.get(url)
  .then(response => {
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

    console.log(scrapedData);
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
