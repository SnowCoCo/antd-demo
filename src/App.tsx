import logo from './logo.svg';
import './App.less';
import {Button} from 'antd';

import RefsAndDom from './components/RefsAndDom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <RefsAndDom></RefsAndDom>
        <Button type="primary">Click Me !</Button>
      </header>
    </div>
  );
}

export default App;