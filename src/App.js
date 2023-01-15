// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
// import Profile from './components/Profile';
import OpenAiService from './api/OpenAiService';
import CollapseSection from './components/CollapseSection';
import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons'

function App() {

  const [tabURL, setTabURL] = useState('');
  const [profileInfo, setProfileInfo] = useState({
    diet: '',
    smoker: false,
    pets: false,
    age: 20,
    rangePicked: '',
    occupation: '',
    hobbies: '' //this will be an array of strings when the user selects tags
  });

  const [aiMessage, setAiMessage] = useState('');


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

  async function callService(){
    const service = new OpenAiService();
    const response = await service.generateMessage();
    console.log("OpenAI Response: " , response)
    console.log("OpenAI text: ", response.choices[0].text)
    setAiMessage(response.choices[0].text);
    await copyContent(response.choices[0].text);
  }

  async function copyContent(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error('Failed to copy: ', err);
      /* Rejected - text failed to copy to the clipboard */
    }
  }

  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };


  return (
    <div className="App flex-col debug">
      <h2>Spareroom Message Generator ⚡️</h2>
      <CollapseSection profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
      {
        tabURL && <p>{tabURL}</p>
      }
      <Button
          type="primary"
          icon={<CloudDownloadOutlined />}
          loading={loadings[1]}
          onClick={() => {
            callService();
            enterLoading(1);
          }}>
          Generate Message
        </Button>
    </div>
  );
}

export default App;


//www.spareroom.co.uk/flatshare/flatshare_detail.pl?flatshare_id=16543345&search_id=&city_id=&flatshare_type=offered&search_results=%2Fflatshare%2F%3Ffilter%3Dshortlist%26flatshare_type%3Doffered&