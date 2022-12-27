# DHTML-WEIXIN

#### 介绍
ThreeX，全平台Three.JS原生引擎。本项目是Three.JS的微信小程序原生移植版本。完美效果，完美移植。
本项目分为3个部分：

- 【DHTML依赖库】本项目。标准NPM版，W3标准的DHTML兼容库。（MIT开源）
- 【ThreeX核心库】微信小程序标准插件，重构了ThreeJS内核，深度适配DHTML，深度适配WebGL，并强力压缩体积。（2023年计划开源）
- 【ThreeX扩展库】部分重构threejs扩展库，深度适配DHTML，深度适配WebGL。（MIT开源）


#### 问题反馈
QQ群：185654475

#### 软件架构
软件架构说明


#### 安装教程

1. 新建或打开微信小程序项目。
2. 终端窗口执行：

```
npm i dhtml-weixin
```

3. 小程序开发工具顶部主菜单->工具->构建npm。

#### 使用教程
1. 导入需要的类

```
import {window,document} from 'dhtml-weixin'
```

2. 使用API

```
console.error(window.innerWidth, window.innerHeight)
```



#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
