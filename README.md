# 音乐训练

## 启动项目

是的，您可以使用yarn来启动Nuxt项目，而不是使用npm。以下是使用yarn启动Nuxt项目的步骤：

1. 首先，确保您已经在项目的根目录下安装了yarn。如果没有安装，请在终端中运行以下命令进行安装：

```
npm install -g yarn
```

2. 确保您的项目中已经有一个有效的`package.json`文件。如果没有，请在终端中导航到项目的根目录，并运行以下命令来生成`package.json`文件：

```
yarn init
```

根据提示填写相关信息即可。

3. 接下来，您需要安装Nuxt.js和其他依赖项。在终端中运行以下命令：

```
yarn add nuxt
```

这将会安装Nuxt.js及其相关依赖。

4. 安装完成后，您可以在`package.json`文件中的`scripts`部分添加一个启动命令。打开`package.json`文件，找到`scripts`部分，并添加以下内容：

```
"scripts": {
  "dev": "nuxt"
}
```

这将会创建一个名为`dev`的脚本，用于启动开发服务器。

5. 最后，您可以在终端中运行以下命令来启动Nuxt项目：

```
yarn dev
```

这将启动一个本地开发服务器，并在浏览器中打开项目。

希望这些步骤可以帮助您成功启动Nuxt项目。如果您有任何进一步的问题，请随时问我。

## 项目打包

nuxt打包不会生成map文件诶

```
yarn generate
```



## 音源文件

在public/audio文件夹下。

标准：从钢琴的A0音开始，一直到C8，包括黑键，一共88个音符，每个音符时长为4秒钟。

前端会每四秒切割一下。自动分成一个一个的音符。

如果是用音乐软件生成音色文件，那就是bpm=120，四四拍，一个音符占一小节就可以了。



## 目录结构

```python
├── app.vue # Nuxt 3 应用程序中的主组件 入口组件
├── components # 组件目录，支持自动导入
├── layouts # 布局目录
├── composables # 公共函数，支持自动导入
├── assets # 静态资源目录 与vue项目的assets相同
├── middleware # 路由中间件框架
├── nuxt.config.ts  # Nuxt 配置文件，可以理解成vue.config.js 文件名必须是nuxt.config 后缀名可以是.js,.ts或.mjs
├── package.json
├── pages # 基于文件的路由
├── plugins #插件
├── public # 不会参与打包，与vue项目的public类似直接挂在服务器的根目录
├── README.md
├── server
├── tsconfig.json
└── yarn.lock

```

