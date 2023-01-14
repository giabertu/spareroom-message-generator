import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [tabURL, setTabURL] = useState('');

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    setTabURL(tab.url);
    return tab;
  }


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
      <button onClick={getCurrentTab}>Click Me</button>
      </header>
      {
        tabURL && <p>{tabURL}</p>
      }
    </div>
  );
}

export default App;
