# OSGiNode Application TODO list

## Bugs
- ~~无用户名和密码登陆问题，加判定。~~
- 改造或删除 SmartAdmin UI 控件中 reflux store 相关的代码，解决部分由于存在两种 store 而产生的兼容性问题。
- ~~用户登录和注册界面统一在一个界面的问题，解决错误 message 信息的初始化问题。~~
- 已经登陆的用户使用 F5 更新 /home 页面时，必须重新登陆，考虑使用 session 记录已登陆的用户信息。
- 在 sign up 成功后，提示“用户已经注册”信息。
- 切换成中文后，在切入到别的主页，如‘私有仓库’，'Recent projects' 没有自动翻译。
- 下载 jquery-maskedinput，打包到scripts.js中，并激活uivalidation功能。




## Technology
- 如何上传和下载文件，主框架下载，插件下载，装配完成后下载
- Node项目如何与Git, SVN等代码管理工具结合，考虑主框架的维护是否需要使用Git/SVN




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
- 参考 Forms->Wizards 创建流程结构；参考 Tables->Data Tables 可查找和过滤的数据表结构
- 修改action, reducer名称，带上action, reducer前缀or后缀
- 生成插件框架代码或在已有项目中添加新的插件后，通过 Web端 / Nodejs 直接调用Cmake并配置
  参数生成QT项目树，并打开QT->加载该项目
- 主页添加新闻和推送等功能
- 测试应用程序在各个浏览器和平台的效果
- PluginRepository 组件和数据库实现部分添加异常处理机制
- 所有Form控件添加 validation
- Datatables 的中文化问题
- 私有插件仓库只显示该登录用户提交的插件
- 在新添加插件时加入依赖填写栏，可以用<select>控件+版本号输入的方式
