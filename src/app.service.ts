import { Injectable } from '@nestjs/common';
import { HandleDom } from './collectdata';
import Schedule from './schedule';
import Task from './schedule/Task';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const task = new Task<string[]>(async () => {
      const handleDom = await new HandleDom("https://www.ruanyifeng.com/blog/atom.xml").init();
      return handleDom.getDomText("entry authro name")
    }, ret => !!ret)
    const retStr: string = (await Schedule.scheduleJob<string[]>("30 * * * * *", task)).join("\n");
    return retStr;
    // return 'Hello World!';
  }
}
