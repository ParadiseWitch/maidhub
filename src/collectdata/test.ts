import { chromium } from 'playwright';
import axios from "axios";
import Log from "../../utils/log";
const fs = require("fs");

const download = async (src, name) => {
  const res = await axios({
    method: 'get',
    url: src,
    responseType: 'stream'
  });
  res.data.pipe(fs.createWriteStream(name));
}

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 100});

    const page = await browser.newPage()
    await page.goto('https://www.copymanga.com/comic/hydxjxrwgb', {
      waitUntil: "load",
      timeout: 0
    });
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.screenshot({ path: `./example.png` });

    const chapters = await page.$$('#default全部 ul:first-child a');
    for (let index = 0; index < 2; index++) {
      const title = await chapters[index].getAttribute("title");
      const src = "https://www.copymanga.com" + await chapters[index].getAttribute("href");
      const subPage = await browser.newPage();
      await subPage.goto(src)
      const imgsNum = parseInt(await (await subPage.$(".comicCount")).textContent())
      Log.log(`----------------------${title}----------------------`);
      Log.log(`${src}`);

      // await subPage.waitForSelector('.comicIndex :text("2")')
      let curIndex = 1;
      while (curIndex >= imgsNum) {
        curIndex = parseInt(await (await subPage.$(".comicIndex")).textContent());
      }
      
      console.log("yes!");
      
      const imgs = await subPage.$$('img');
      console.log(imgs.length);
      
      for (let imgIndex = 0; imgIndex < imgs.length; imgIndex++) {
        const imgSrc = await imgs[imgIndex].getAttribute("src");
        // TODO        
        Log.log(`${title} 第${imgIndex}张, ${imgSrc}`)
      }
      await subPage.screenshot({ path: `./caputer/${title}.png` });
      await subPage.close();
    }
    await browser.close()
  } catch (error) {
    console.error(error);
  }

  // new HandleDom("https://www.copymanga.com/comic/hydxjxrwgb").init().then(hd => {
  //   console.console.log("hd", hd.dom);
  //   const rets = hd.getDomAttr(".tab-content ul a", "title");
  //   console.console.log(rets);
  // })
})();



