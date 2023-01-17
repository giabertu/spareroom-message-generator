import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons'

import './App.css';
import OpenAiService from './api/OpenAiService';
import CollapseSection from './components/CollapseSection';
import Notification from './utils/classes/Notification';
import { defaultProfileInfo } from './utils/data/data';
import { getPropertyDescription } from './utils/classes/Script';

function App() {

  const [tabURL, setTabURL] = useState('');
  const [flatInfo, setFlatInfo] = useState('');
  const [clip, setClip] = useState(false);
  const [profileInfo, setProfileInfo] = useState(defaultProfileInfo);

  const [aiMessage, setAiMessage] = useState('');

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

  useEffect(async () => {
    await chrome.storage.session.set({ profileInfo: profileInfo })
    console.log('Profile info set inside session!')
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
      Notification.openSuccess(messageApi, 'Message copied to clipboard!')
      setClip(true);
    } catch (err) {
      Notification.openWarning(messageApi, 'There was an issue, try again later');
    }
  }

  const [loadings, setLoadings] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

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
      <div>
        {contextHolder}
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
    </div>
  );
}

export default App;

