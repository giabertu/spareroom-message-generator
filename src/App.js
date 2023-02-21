import { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons'

import './App.css';
import OpenAiService from './api/OpenAiService';
import CollapseSection from './components/CollapseSection';
import Notification from './utils/classes/Notification';
import SupportModal from './components/SupportModal';
import { defaultProfileInfo, getParsedProfile } from './utils/data/data';
import { getPropertyDescription } from './utils/classes/Script';
import btc from './Bitcoin-BTC-icon.png'
import spareroom from './spareroom-ext-logo.png'


function App() {

  const [flatInfo, setFlatInfo] = useState('');
  const [profileInfo, setProfileInfo] = useState(defaultProfileInfo);
  const [aiMessage, setAiMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    (async () => {
     const [sessionResult, tabQueryResult] = await Promise.all([
      chrome.storage.session.get(['profileInfo']),
      chrome.tabs.query({active: true, lastFocusedWindow: true}) 
     ]);
      console.log('The session stored is: ', sessionResult.profileInfo)
      setProfileInfo(sessionResult.profileInfo);
      //get current tab
      const [tab] = tabQueryResult
      
      //get flatdescription if on spareroom UK or US
      if (tab && (tab.url.includes('www.spareroom.co.uk') || tab.url.includes('www.spareroom.com'))){
        const [res] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: getPropertyDescription,
        });
        setFlatInfo(res.result);
      }
    })()
  },[])

  useEffect(() => {
    (async () => {
      await chrome.storage.session.set({ profileInfo: profileInfo })
      console.log('Profile info set inside session!')
    })()
  }, [profileInfo]) 

  async function handleGenerateMessage() {
    setLoading(true);
    if (flatInfo){
      const profileString = getParsedProfile(profileInfo)
      const response = await fetch("https://spareroom-ext-server.vercel.app/newmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({flatInfo, profileString}),
      });
      console.log("Edge function returned.");
      console.log(response)
      
      try{
        if (!response.ok) {
          console.log(response.statusText)
          throw new Error(response.statusText);
        }
        
        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
          return;
        }
        
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setAiMessage((prev) => prev + chunkValue);
        }
        setLoading(false);
        Notification.openSuccess(messageApi, "Message generated! Click \"Copy Message\" to copy.")
      } catch (e){
        Notification.openWarning(messageApi, "An unknown error occured, try again later")
      }
    
    //triggered only if flatInfo is empty string
    } else {
      Notification.openWarning(messageApi, "It seems like you are not on a listing page. Click on a Spareroom listing and try again")
    }
  };


  return (
    <div className="App flex-col gap-1">
      <div>
        <img src={spareroom} className='width-60 m-l-20'/>
        <h2>Spareroom Message Generator ⚡️</h2>
      </div>
      <CollapseSection profileInfo={profileInfo} setProfileInfo={setProfileInfo} aiMessage={aiMessage} messageApi={messageApi}/>
      <div>
        {contextHolder}
        <Button
          type="primary"
          icon={<CloudDownloadOutlined />}
          loading={loading}
          disabled={!flatInfo}
          onClick={handleGenerateMessage}>
          Generate Message
        </Button>
      </div>
      <div className='stretch flex-row flex-end'>
        <button className='support' onClick={() => setModalOpen(true)}>Support</button>
        <img src={btc} className='width-20'/>
      </div>
      <SupportModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  );
}

export default App;

