import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Profile from './components/Profile';

function App() {

  const [tabURL, setTabURL] = useState('');
  const [profileInfo, setProfileInfo] = useState({
    diet: '',
    smoker: false,
    pets: false,
    age: 20,
    rangePicked: ''
  });


  useEffect(()=>{
    chrome.storage.session.get(['profileInfo']).then((result) => {
      console.log("Value currently is " + result.profileInfo);
      setProfileInfo(result.profileInfo);
    });
  },[])

  useEffect(() => {
  
    chrome.storage.session.set({ profileInfo: profileInfo }).then(() => {
      console.log("Value is set to " + profileInfo);
    });

  }, [profileInfo])


  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    setTabURL(tab.url);
    return tab;
  }


  return (
    <div className="App">
      <Profile profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
      <button onClick={getCurrentTab}>Click Me</button>
      {
        tabURL && <p>{tabURL}</p>
      }
      { profileInfo && <p>{profileInfo.diet}</p>}
      {profileInfo && <p>{profileInfo.smoker ? 'true' : 'false'}</p>}
      {profileInfo && <p>{profileInfo.pets ? 'true' : 'false'}</p>}
      { profileInfo && <p>{profileInfo.age}</p>}
      { profileInfo && <p>{profileInfo.rangePicked[0]}</p>}
      { profileInfo && <p>{profileInfo.rangePicked[1]}</p>}
      {/* { profileInfo && <p>{profileInfo.rangePicked.slice(0,7)}</p>} */}
      
    </div>
  );
}

export default App;


//www.spareroom.co.uk/flatshare/flatshare_detail.pl?flatshare_id=16543345&search_id=&city_id=&flatshare_type=offered&search_results=%2Fflatshare%2F%3Ffilter%3Dshortlist%26flatshare_type%3Doffered&