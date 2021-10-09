import { dateFormat } from "../../utils/DateUtil";

export enum Status {
  SUCCESS = 1,
  PENDING = 2,
  NEW = 3,
  FAILURE = 4
}

export default class Task<T> {
  private _status: Status = Status.NEW;
  // 执行的任务
  private _exec: () => Promise<T>;
  // 失败条件
  private _errCondition: (ret: T) => boolean;
  // 任务结果
  private _result: T;
  // 上次执行时间
  private _lastExecTime: string = dateFormat(new Date());

  // 进度属性 待设计
  private _percent: number = 0;

  constructor(exec: () => Promise<T>, errCondition: (ret: T) => boolean) {
    this._exec = exec;
    this._errCondition = errCondition;
  }

  /**
   * 任务执行
   * @returns Promise<T>
   */
  public execute(): Promise<T> {
    this.status = Status.PENDING;
    return new Promise(async (res, rej) => {
      this._lastExecTime = dateFormat(new Date());
      try {
        this.result = await this._exec();
      } catch (error) {
        this.status = Status.FAILURE;
        rej(this.result);
      }
      if (this._errCondition(this.result)) {
        this.status = Status.FAILURE;
        rej(this.result);
      }
      res(this.result)
    })
  }


	public get result(): T {
		return this._result;
	}

	public set result(value: T) {
		this._result = value;
	}


  public get status(): Status {
    return this._status;
  }
  public get lastExecTime(): string {
    return this._lastExecTime;
  }
  public get percent(): number {
    return this._percent;
  }

  public set status(value: Status) {
    if (value == Status.SUCCESS || value == Status.FAILURE) {
      this.percent = 100;
    }
    this._status = value;
  }
  public set lastExecTime(value: string) {
    this._lastExecTime = value;
  }
  public set percent(value: number) {
    this._percent = value;
  }

}