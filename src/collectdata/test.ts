import { HandleDom } from ".";
import { chromium } from 'playwright';

(async () => {
  try {
    const browser = await chromium.launch();
    // const browser = await chromium.launch({ headless: false}); // or firefox, webkit
    // const browser = await chromium.launch({ headless: false, slowMo: 100 }); // or firefox, webkit
  
    const page = await browser.newPage()
    await page.goto('https://www.copymanga.com/comic/hydxjxrwgb', {
      waitUntil: "load",
      timeout: 0
     });
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.screenshot({ path: `./example.png` });
  
    // #default全部 ul a[title]
    // #default全部 ul:first-child a
    const chapters = await page.$$('#default全部 ul:first-child a');
    for (const index in chapters) {
      const title = await chapters[index].getAttribute("title");
      const src = "https://www.copymanga.com" + await chapters[index].getAttribute("href");
      console.log(src)

      const subPage = await browser.newPage();
      // 等待 2s 加载
      await subPage.waitForTimeout(2000)
      const imgs = await page.$$('img');
      console.log(imgs.length);
      
      for (const imgIndex in imgs) {
        const imgSrc = await imgs[imgIndex].getAttribute("src")
        console.log(imgSrc);
      }
      // await subPage.screenshot({ path: `./caputer/${title}.png` });
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
})()


