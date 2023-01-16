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
  const [flatInfo, setFlatInfo] = useState('');
  const [clip, setClip] = useState(false);
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

  // chrome.tabs.onUpdated.addListener(
  //   function(tabId, changeInfo, tab) {
  //     if (changeInfo.url) {
  //       console.log("Tab URL has changed to: " + changeInfo.url);
  //     }
  //   }
  // );

  function getPropertyDescription(){
    return document.querySelector('.detaildesc').textContent + ' New flatmate preferences: ' + document.querySelector(".feature--household-preferences").children[1].textContent;
  }



  useEffect(async () => {
    const result = await chrome.storage.session.get(['profileInfo']);
    console.log('The session stored is: ', result.profileInfo)
    setProfileInfo(result.profileInfo);

    //get current tab
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);

    //get flatdescription if on spareroom
    if (tab && tab.url.includes('www.spareroom.co.uk')){
      const [res] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getPropertyDescription,
      });
      setFlatInfo(res.result);
    }
   
    setTabURL(tab.url);
    return tab;

  },[])

  useEffect(() => {
  
    chrome.storage.session.set({ profileInfo: profileInfo }).then(() => {
      console.log("Value is set to " + profileInfo);
    });

  }, [profileInfo])


  async function callService(){
    const service = new OpenAiService();
    const response = await service.generateMessage(flatInfo);

    console.log("OpenAI Response: " , response)
    console.log("OpenAI text: ", response.choices[0].text)

    setAiMessage(response.choices[0].text);
    await copyContent(response.choices[0].text);
  }

  async function copyContent(text) {
    try {
      await navigator.clipboard.writeText(text);
      setClip(true);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
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
        tabURL && <p>{tabURL.slice(0, 14)}</p>
      }
      {
        flatInfo && <p>{flatInfo}</p>
      }
      {
        clip && <h3>Copied!</h3>
      }
      <Button
          type="primary"
          icon={<CloudDownloadOutlined />}
          loading={loadings[1]}
          disabled={!flatInfo}
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
