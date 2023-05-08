# Guide Account Helper

导账助手

## 开发环境

1、安装 Node.js 的 LTS 版本，下载地址：

> <https://nodejs.org/zh-cn/>

2、更改 npm 源，提高安装速度：

```bash
npm config set registry https://registry.npm.taobao.org/
```

3、安装开发工具：

```bash
npm i @nuo-common/ndk -g --registry=http://192.168.210.169:7001/
```

_注：开发工具只需全局安装一次，在使用过程中按照提示信息操作即可。_

## 开发流程

1、检查 `ndk.config.js` 文件配置信息是否符合要求，比如入口配置，接口代理等，详细信息请看文件中的注释信息。

_注：修改的配置信息需要重启开发环境才会生效。_

2、启动本地开发服务器：

```bash
ndk dev
```

_注：开发服务器集成了热更新功能，修改内容保存后即时生效。_

3、检测代码：

```bash
ndk lint
```

_注：推荐使用 [VS Code](https://code.visualstudio.com/Download) 编辑器并安装 EditeorConfig ， ESLint 和 Prettier 插件，可在编写过程中提供实时代码检测及代码格式化功能。_

4、编译打包代码：

```bash
ndk build
```

_注：打包结果存放在 `dist` 目录中。_

5、验证打包结果：

```bash
ndk start
```

6、提交变更。

_注：提交变更前，请确认代码正常可用并已编译打包。_


```bash
src文件夹名称
components = 组件
config = 配置
hooks = hooks管理
redux = 状态管理
services = 接口管理
utils = 函数管理
views = 页面管理
```

```bash
window.ClientAPI
页面调用接口直接调用
window.ClientAPI 或 ClientAPI
对象内的函数
```
