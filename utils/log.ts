const fs = require('fs')
const logPath = '/path/'
const logName = 'log.txt'

export const log = (content: any) => {
  fs.writeFile(logPath + logName, content, err => {
    if (err) {
      console.error(err)
      return
    }
    //文件写入成功。
  })  
}

