## <a name="features">&sect; 技术栈</a>
> 详情可参阅 `package.json`

* Vue 1.0.18
* Vue Router
* Ajax 请求库（Vue Resource / Superagent / jQuery-Ajax）
* Webpack
* ES6 + Babel
* Mint UI

***

## <a name="getting-started">&sect; 快速开始</a>
> 在开始前，希望您已通读如下资料
> * [Vue.js Guide](http://cn.vuejs.org/guide/)
> * [Vue.js API](http://cn.vuejs.org/api/)
> * [Vue Router 文档](http://router.vuejs.org/zh-cn/index.html)

> 同时您还需要熟悉 ES6，详情参考阮老师的[教程](http://es6.ruanyifeng.com/)

### <a name="installation">⊙ 安装</a>
> 推荐升级到 node 5.x + npm 3.x 环境
> 推荐使用 `cnpm` 或手动切换到淘宝 npm 源
> `npm set registry https://registry.npm.taobao.org/`

> 虽然我们已经切换到了淘宝 npm 源，但安装 `node-sass@3.8.0` 的时候还是很有可能卡住
> 因为它的安装需要从 Github 的 AWS 服务器拉取二进制文件，因此您可以为它指定源：
> `npm i node-sass@3.8.0 --registry=https://registry.npm.taobao.org`

**最后需要全局安装跨平台环境配置器 `npm i cross-env -g`**

### <a name="start">⊙ 启动</a>
先后在 `msg-board-api`、`vue-demo` 的命令窗口下，敲下 `npm start`
如无意外，默认浏览器就会自动打开 `localhost:8080`，您立即可以看到效果
若浏览器没有自动弹出，则请自行手动访问

***

## <a name="architecture">&sect; 项目架构</a>
### <a name="tree">⊙ 目录结构</a>
```
.
├── build/ # Webpack 配置目录
├── dist/# build 生成的生产环境下的项目
├── src/ # 源码目录（开发都在这里进行）
│ ├── assets/# 放置需要经由 Webpack 处理的静态文件
│ ├── components/# 组件（COMPONENT）
│ ├── directives/# 指令
│ ├── filters/ # 过滤器
│ ├── routes/# 路由
│ ├── services/# 服务（SERVICE，用于统一管理 XHR 请求）
│ ├── views/ # 路由视图基页（VIEW）
│ ├── app.js # 启动文件
│ ├── index.html # 静态基页
├── static/# 放置无需经由 Webpack 处理的静态文件
├── .babelrc # Babel 转码配置
├── .eslintignore# （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc# ESLint 配置
├── .gitignore # （配置）需被 Git 忽略的文件（夹）
├── package.json # （这个就不用多解释了吧）
```
> 您可以根据业务需求改动目录结构。最常见的例子就是在 `src/` 新建一个 `utils/` 用于存放工具函数
> （若 `utils/` 目录使用频繁，建议配置 [路径别名](#alias)）


### <a name="service-layer">⊙ 引入服务层</a>
在本示例项目中，Service 层的主要功能是：**封装好与后端 API 一一对应的函数。**
> 例如，后端用于用户登录的API为 `/login`
> 那么前端 `services/userService.js` 这个服务类中就对应存在一个名为 `login` 的函数
> 只需要调用 `userService.login({ 用户帐号密码 })` 即可实现请求

### <a name="ajax">⊙ Ajax</a>
本示例项目封装出统一的 `xhr` 函数提供 Ajax 请求：

```javascript
// 详见 src/services/xhr/
const xhr = ({ url, body = null, method = 'get' }) => {
return <then>
}
```
服务层直接引入该 `xhr` 函数即可
毋须理会底层封装的是什么库

> 例如，一开始用 jQuery 的 `$.ajax`
> 之后项目升级，已经不需要 jQuery 了，改用 Superagent
> 那么也就是用 Superagent 重新实现 `xhr` 函数即可
> 服务层不需要更改任何代码
> 可以把 `xhr` 理解成是一个 **接口**

***

## <a name="development">&sect; 开发</a>
### <a name="webpack-configure">⊙ Webpack 配置</a>

* 前端开发服务器为 `localhost:8080`，可在 `build/webpack.config.dev.js` 中找到
> 后端 RESTful API 基地址写在了 `src/services/xhr/config.js` 中，请根据实际自行修改

* 框架 / 类库 须单独打包。若您还需要引入别的 Package，则将其添加到 `build/webpack.base.conf.js` 中的 `vendor`

* <a name="alias">**路径别名**</a> 的定义位于 `build/webpack.base.conf.js`，好处就是**引入与重构都很方便**
> 例如，在某组件中，引入 `userService` 需要 `import userService from '../../../services/userService'`
> 但有了路径别名后，只需要 `import userService from 'SERVICE/userService'`
> 相比于 AngularJS 中的依赖注入，这种方式依赖于构建工具，显得更为简单
>

* 开发**全局变量**，由 `webpack.DefinePlugin` 提供（详见 `build/webpack.base.conf.js`）
> 默认有 `__DEV__` 与 `__PROD__` 两个全局变量
> 若要继续添加，则还需要在 `.eslintrc` 中 `globals` 同步写入
> 由此即可根据当前运行环境执行对应的代码（例子见 `src/app.js` 中有关 Devtools 的配置）
>
> 在此需要提醒，在 `package.json` 中设置 `NODE_ENV` 要注意末尾空格的[问题](http://stackoverflow.com/questions/11104028/#38948727)
> 最好就是使用前 `trim` 一下：`process.env.NODE_ENV.trim()`

### <a name="standard">⊙ 规范</a>
> 开发规范请参考 [**最佳实践**](./best-practice.md)
> 本示例项目的代码极尽详细地添加了注释，其中不乏最佳实践提示

### <a name="devtools">⊙ DevTools</a>
> [vue-devtools Github 地址](https://github.com/vuejs/vue-devtools)
> 注意：Vue 1.0.8+ 需要显式设置 `Vue.config.devtools = true`

***

## <a name="testing">&sect; 测试</a>
> 请自行选择测试工具

***

## <a name="deployment">&sect; 部署</a>
> 在 `vue-demo` 的命令窗口下，敲下 `npm run build`，将会在项目根目录下生成 `dist/`
