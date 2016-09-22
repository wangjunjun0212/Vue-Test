import request from 'superagent'
import { rootPath, errHandler } from './config'

const xhr = ({ url, body = null, method = 'get' }) => {
  // P.S: 此处引入了 ES6 的 Promise 实现
  return new Promise((resolve, reject) => {
    request[method.toLowerCase()](rootPath + url)
      // 跨域允许带上 cookie（http://visionmedia.github.io/superagent/#cors）
      .withCredentials()
      .send(body)
      .end((err, re) => {
        if (err)
          return errHandler(err)

        if (!re.body)
          return resolve(null)

        if (re.body._code)
          return errHandler(re.body._msg)

        resolve(re.body)
      })
  })
}

export default xhr
