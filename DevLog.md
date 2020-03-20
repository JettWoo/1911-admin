### 前期准备工作

环境搭建：

- UI框架：Ant React Pro
- JS框架：react
- 网络请求：axios
- 预处理语言：less
- 屏幕适配方案：
- 路由插件：react-router-dom
- 全局状态管理：react-redux & redux
- 其他插件

### 项目搭建

- 创建项目：create-react-app 1911-admin
- 使用npm run eject来暴露webpack的配置文件(如果这步报错没关系，其实我们只需要在之前运行 git add . 命令，然后再运行 git commit -m "init" 命令就可以解决。)

### less样式解析环境搭建

1. 安装：npm install less less-loader --save-dev

2. 安装完之后还是不能用的，因为react脚手架默认配置的是sass依赖，需要我们手动在config目录下的webpack.config.js里配置less, 最简单的做法就是搜索sass, 把对sass的处理改为less的处理，比如文件匹配的正则改为less, 样式文件的loader改为less-loader

   .less文件加载

   ```javascript
   {
     test: lessRegex, //引入文件是否满足正则表达式 xxx.scss  xxx.sass 
     exclude: lessModuleRegex, //包含的文件  xxx.module.scss xxx.module.sass
     use: getStyleLoaders(
       {
         importLoaders: 3,
         sourceMap: isEnvProduction && shouldUseSourceMap,
       },
       'less-loader'
     ),
     sideEffects: true,
   },
   ```

   .module.less文件加载

   ```javascript
   {
     // test: sassModuleRegex,
     test: lessModuleRegex,
     use: getStyleLoaders(
       {
         importLoaders: 3,
         sourceMap: isEnvProduction && shouldUseSourceMap,
         modules: {
           // 加一个单独的名字
           getLocalIdent: getCSSModuleLocalIdent,
         },
       },
       // 'sass-loader'
       'less-loader'
     ),
   },
   ```

3. 这样就可以直接import less文件了

##### 样式覆盖问题解决：

1. 保证类名不重复 BEM命名法，button-error-small button_success--big

2. 样式模块化, 将样式写在.module.less文件中，通过之前的配置，我们可以将类名映射为全局唯一的类名

   ```javascript
   import Style from './app.module.less'
   {/* app_box__lP-4H */}
   {/*<h1 className={Style.box}>后台管理系统</h1>*/}
   ```

3. css in component-style

### Ant Design Pro使用

1. 安装：npm install antd

2. 使用：参考官网

   1. 全局引入

      在index.js中

      ```javascript
      import 'antd/dist/antd.css';
      ```

       在其他组件中引入要用的组件

      ```javascript
      import { Button } from 'antd'
      ```

      按这个使用，在实际开发中是还有优化空间的，比如无法进行主题配置，而且一次性加载全部的antd组件的样式(gzipped后一共60kb, 比较耗性能)

      此时我们需要对create-react-app的默认配置进行自定义，

   2. 按需引入

      ```javascript
      import Button from 'antd/es/button';
      import 'antd/es/button/style'; // 或者 antd/es/button/style/css 加载 css 文件
      ```

      也可以使用babel-plugin-import, 然后在webpack.config.js配置，这里配置选项有很多，推荐使用`{ "libraryName": "antd", style: true }`

      在webpack.config.js中搜索babel-plugin-import，然后加上面的配置项。

      ```javascript
      ReactDOM.render(<Button>xxxx</Button>);
       
            ↓ ↓ ↓ ↓ ↓ ↓
       
      var _button = require('antd/lib/button');
      require('antd/lib/button/style');
      ReactDOM.render(<_button>xxxx</_button>);
      ```

      这样的话就不要在index.js中一次性引入全部的css了

      这里还有个问题，在antd默认使用less2.7.3，而我们之前装的less不是这个版本，所以我们要把less版本回退到2.7.3

3. 