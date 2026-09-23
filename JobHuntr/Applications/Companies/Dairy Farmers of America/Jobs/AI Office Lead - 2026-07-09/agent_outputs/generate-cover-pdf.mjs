import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "Cover Letter.html");
const pdfPath = path.join(__dirname, "..", "final_files", "James Oehring Cover Letter - Dairy Farmers of America.pdf");

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
await page.pdf({
  path: pdfPath,
  format: "Letter",
  margin: { top: "0.7in", right: "0.7in", bottom: "0.7in", left: "0.7in" },
  printBackground: true,
});
await browser.close();
console.log("PDF written:", pdfPath);
