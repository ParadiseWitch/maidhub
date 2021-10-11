import Task from "./Task";
const nodeSchedule = require("node-schedule")

export default class Schedule<T> {
  private _cron: string;
  private _task: Task<T>;
  constructor(cron: string,task : Task<T>) {
    this.cron = cron;
    this.task = task;
  };

  public static scheduleJob<T>(cron: string, task: Task<T>):Promise<T> {
    return new Promise((res, rej) => {
      nodeSchedule.scheduleJob(cron, () => {
        task.execute().then(res).catch(rej)
      })
    })
  }

  public get cron(): string {
    return this._cron;
  }
  public get task(): Task<T> {
    return this._task;
  }
  public set cron(value: string) {
    this._cron = value;
  }
  public set task(value: Task<T>) {
    this._task = value;
  }
}