const puppeteer = require("puppeteer");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Generalized scraper function
async function scrapePage(url, selectors, callback) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const result = await page.$$eval(
    selectors.join(","),
    (elements, selectors) => {
      const data = {};
      selectors.forEach((selector, index) => {
        if (elements[index]) {
          data[selector] = elements[index].textContent.trim();
        }
      });
      return data;
    },
    selectors
  );

  callback(result);

  await browser.close();
}

// Read URL from the user
rl.question("Please enter the URL: ", (url) => {
  const selectors = [
    "href",
    ".company-name",
    ".industry",
    ".location",
    ".total-employees",
    ".benefits",
  ];

  scrapePage(url, selectors, (data) => {
    console.log("Scraped Data:", data);
  });

  rl.close();
});
