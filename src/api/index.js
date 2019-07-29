
import { createAPI } from 'create-api'
import {baseUrl} from "../../config/index"
const isProd = process.env.NODE_ENV !== 'development'

const proUrl = 'http://106.12.205.37:8080' // 生产环境api地址
const devUrl = '/api' // 开发api地址

const FaceUrl = isProd ? proUrl : devUrl
var config = {
  baseURL: FaceUrl,
  client: {
    baseURL: FaceUrl,
    timeout: 10000,
    hasMessage:true,
    hasLoading:true,
  },
  server: {
    baseURL: baseUrl,
    timeout: 10000
  }
}
const api = createAPI(config)
export {config}
export default api
