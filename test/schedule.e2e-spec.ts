import Task from "src/schedule/Task";
import { Schedule } from "./../src/schedule";

describe('schedule', () => {
  test('1', () => {
    Schedule.scheduleJob('1-30 * * * * *', new Task(() => {
      console.log('scheduleCronstyle:' + new Date());
      return Promise.resolve("")
    }, ret => !!ret))
  })
})
