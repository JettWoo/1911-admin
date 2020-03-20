import React from 'react';
import Style from './app.module.less'
import { Button } from 'antd'
function App() {
  return (
    <div className="App">
      {/* app_box__lP-4H */}
      <h1 className={Style.box}>后台管理系统</h1>
      <Button type='primary'>Button</Button>
    </div>
  );
}

export default App;
