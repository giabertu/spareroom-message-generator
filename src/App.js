import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Profile from './components/Profile';

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
      <Profile/>
      <button onClick={getCurrentTab}>Click Me</button>
      {
        tabURL && <p>{tabURL}</p>
      }
    </div>
  );
}

export default App;


//www.spareroom.co.uk/flatshare/flatshare_detail.pl?flatshare_id=16543345&search_id=&city_id=&flatshare_type=offered&search_results=%2Fflatshare%2F%3Ffilter%3Dshortlist%26flatshare_type%3Doffered&