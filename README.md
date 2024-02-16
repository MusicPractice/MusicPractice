# 音乐训练

项目设计详见figma

## 启动项目

```
yarn; yarn dev -o
```

## 项目打包

```
yarn generate
```

## 音源文件

全部的音频文件一律放在 assets 文件夹中。

assets/audio 存放所有有音高乐器的音源文件。

assets/audio/音色文件夹/

```
0_01.mp3
...
0_12.mp3
...
6_12.mp3
```

前面的数字表示八度组号，后面的0~12的数字表示第几个半音。

## 乐理相关的计算业务逻辑

主要放在services中。



