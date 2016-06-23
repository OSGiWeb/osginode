# OSGiNode Application TODO list

## Bugs
- ~~无用户名和密码登陆问题，加判定。~~
- 改造或删除 SmartAdmin UI 控件中 reflux store 相关的代码，解决部分由于存在两种 store 而产生的兼容性问题。
- ~~用户登录和注册界面统一在一个界面的问题，解决错误 message 信息的初始化问题。~~
- 已经登陆的用户使用 F5 更新 /home 页面时，必须重新登陆，考虑使用 session 记录已登陆的用户信息。
- 在 sign up 成功后，提示“用户已经注册”信息。
- 切换成中文后，在切入到别的主页，如‘私有仓库’，'Recent projects' 没有自动翻译。
- 下载 jquery-maskedinput，打包到scripts.js中，并激活uivalidation功能。
- 如果插件Uploading File上传/更新成功，但插件信息创建/更新不成功，需要删除该上传/更新的file信息。
- res.setHeader 下载附件名中有中文出现无法下载问题/程序崩溃




## Technology
- 如何上传和下载文件，主框架下载，插件下载，装配完成后下载
- Node项目如何与Git, SVN等代码管理工具结合，考虑主框架的维护是否需要使用Git/SVN
- 6月底技术要求：
  1. 插件仓库完成，包括公有，私有，插件提交流程，上传/下载等；
  2. 插件骨架代码生成，包括生成的代码外部运行CMAKE,并用QT Creator打开，并编译成功；
  3. 应用配置和生成功能完成，包括从最简化框架生成+编译（Hello World），相关示例代码生成，
     公有插件中选取插件生成项目级应用框架代码等；
  4. 插件远程升级和部署，需要在OSGi框架下用 C++ 开发相关界面，并可以通过配置文档显示远程插件仓库信息，
     并通过匹配加载对应插件（dll+资源加载），实现自动化升级和部署。
- 重构应用程序，使用 Material-ui (react based) 作为UI主要构成，不使用 SmartAdmin 框架
- 升级 Node.js 到 5.x ( Git 上很多示例项目已经开始使用 5.x )

## Recent TODOs
- 当插件删除时，删除所有相关的 GridFS 中的文件数据，如源码包、库文件和文档等
- 发布插件时的批量长传进度条
- 私有插件仓库只显示该登录用户提交的插件
- 公共插件仓库 UI 改造
- Check 插件发布流程的validation,出现了不上传附件无法发布插件的情况


## Features
- 每次大改动之后，执行一遍 npm run build，生成 production 环境下的代码并运行，观察是否有错误
- 更换首页图片，改为插件平台相关
- 参考 SmartAdmin Theme 中如何将所有需要的js库文件打包到一起，并统一定义reference的文件名
  s.a.:'/webpack/scripts'，打包后即可使用 ScriptLoader.jsx 中的 'loadScript()' 函数
- 下载 google 字体： import url(https://fonts.googleapis.com/css?family=Montserrat:400,700)
- UI 选型和适配
- ~~登陆的不同用户在 home 页面对应的用户名 / 中文用户名（添加中文姓名validation check on sign up）~~
- 使用高级的互动的 form validation check 方式/控件，e.g. SmartAdmin - Form Validation
- 创建导航栏树结构： Smart Menu from 'menu-items.json' / Six level menu from UI elements,
  使用 Redux + Fetch 换掉 SmartMenu 组建中的 reflux store + jquery，实际就是改写整个'/layout/navigation'
  component 集合
  #### 导航栏树结构改造
  ```
  Navigation Tree:
  -> Navigation [page]
  -> SmartMenu [component|json(rawItems.item)]
  -> SmartMenuList [component|NavigationStore.initRawItems()->.normalize()->return new MenuItem(item)->._setInitialItem/.getData()]
  -> SmartMenuItem [component|item={item} key={item._id}]
  -> SmartMenuItem->render() [component]
  ```

  ```
    Data flow and Component render:
    -> dispatch() redux store data change action in 'SmartMenuItem' component
    -> trigger data reload in render() function in 'Navigation' component
    -> render 'Navigation' container component and subcomponents, i.e.: 'SmartMenu', 'SmartMenuList', 'SmartMenuItem'
  ```
- 创建类 Profile 和 Projects 主界面结构 from App-Views
- ~~参考 Forms->Wizards 创建流程结构；参考 Tables->Data Tables 可查找和过滤的数据表结构~~
- 修改action, reducer名称，带上action, reducer前缀or后缀
- 生成插件框架代码或在已有项目中添加新的插件后，通过 Web端 / Nodejs 直接调用Cmake并配置
  参数生成QT项目树，并打开QT->加载该项目
- 主页添加新闻和推送等功能
- 测试应用程序在各个浏览器和平台的效果
- PluginRepository 组件和数据库实现部分添加异常处理机制
- 所有Form控件添加 validation
- ~~Datatables 的中文化问题~~
- ~~在新添加插件时加入依赖填写栏，可以用<select2>控件+版本号输入的方式~~
- ~~在提升插件私有->公有时，需要上传插件的dll格式文件和资源包~~
- 删除所有reflux相关components

## Code Generator
- ~~加入插件：修改主cmakelist.txt和数据库相关配置代码~~