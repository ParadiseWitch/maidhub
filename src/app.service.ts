import { Injectable } from '@nestjs/common';
import { HandleDom } from './collectdata';
import Schedule from './schedule';
import Task from './schedule/Task';
import to from "../utils/to";

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const task = new Task<string[]>(
      async () => {
        const handleDom = await new HandleDom("https://www.ruanyifeng.com/blog/atom.xml").init();
        return handleDom.getDomText("entry author name")
      },
      ret => !ret
    )
    let [err, ret] = await to(Schedule.scheduleJob<string[]>("1-30 * * * * *", task));
    if (err) {
      return "something error," + err;
    } else {
      return ret.join("\n");
    }
  }
}
