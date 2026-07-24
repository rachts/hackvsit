const Tesseract = require("tesseract.js");
const fs = require("fs");

async function test() {
  console.log("Starting...");
  try {
    const { data: { text } } = await Tesseract.recognize(
      "https://tesseract.projectnaptha.com/img/eng_bw.png",
      "eng",
      { logger: m => console.log(m) }
    );
    console.log("Result:", text);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
