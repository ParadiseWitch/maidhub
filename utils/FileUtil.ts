const fs = require("fs")
class FileUtil {

  constructor(parameters) {

  }

  /**
   * //TODO 判断文件是否存在
   * @returns 
   */
  public static isExist(path: string): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      fs.access(path, fs.constants.F_OK, (err) => {
        resolve(!err)
      })
    })
  }

  public static read(path: string): Promise<string> {
    return new Promise(async (res, rej) => {
      if (!(await FileUtil.isExist(path))) {
        rej(new Error(`文件不存在：${path}`));
      }
      fs.readFile(path, "utf-8", function (err, data: string) {
        if (err) rej(err);
        res(data);
      });
    })
  }

  public static append(path: string, data: string): Promise<void> {
    return new Promise(async (res, rej) => {
      fs.appendFile(path, data, (err) => {
        if (err) rej(err);
        res();
      });
    })
  }

  public static write(path: string, data: string): Promise<void> {
    return new Promise((res, rej) => {
      fs.writeFile(path, data, (err) => {
        if (err) rej(err);
        res();
      });
    })
  }
}