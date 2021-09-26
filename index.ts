import { HandleDom } from "./collectdata";

(async () => {
  const handleDom = await new HandleDom("http://www.ruanyifeng.com/blog/").init();
  const data = handleDom.getDomAttr("#homepage .module-list-item a","href");
  console.log(data);
})()

