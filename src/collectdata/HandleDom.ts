import cheerio, { CheerioAPI } from "cheerio";
import axios from "axios";

export default class HandleDom {
  url: string;
  dom: string;
  $: CheerioAPI;
  constructor(url: string) {
    this.url = url
  }

  public async init(): Promise<HandleDom> {
    const res = await axios.get(this.url);
    this.dom = res.data;
    this.$ = cheerio.load(this.dom, {
      decodeEntities: false
    });
    return this;
  }

  /**
   * 根据选择器获取元素属性值数组
   * @param DOM html字符串
   * @param seletor
   * @returns 属性值数组
   */
  public getDomAttr(seletor: string, attr: string): string[] {
    const $ = this.$;
    let ret: string[] = [];
    $(seletor).each(function (item) {
      const src = $(this).attr(attr);
      ret.push(src);
    })
    return ret;
  }
  public getDomText(seletor: string): string[] {
    const $ = this.$;
    let ret: string[] = [];
    $(seletor).each(function (item) {
      const text = $(this).text();
      console.log(text);
      ret.push(text);
    })
    return ret;
  }
}



