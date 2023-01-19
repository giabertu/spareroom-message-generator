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
    })()
  },[])

  useEffect(() => {
    (async () => {
      await chrome.storage.session.set({ profileInfo: profileInfo })
      console.log('Profile info set inside session!')
    })()
  }, [profileInfo]) 


  async function handleGenerateMessage(){
    const service = new OpenAiService();
    const profileString = getParsedProfile(profileInfo)
    const response = await service.generateMessage(flatInfo, profileString);

    setAiMessage(response.choices[0].text);
    const success = await copyContent(response.choices[0].text);
    if (success){
      Notification.openSuccess(messageApi, 'Message copied to clipboard!')
    } else {
      Notification.openWarning(messageApi, 'There was an issue, try again later');
    }
  }

  async function copyContent(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.log('There was an error copying the message to the clipboard')
      return false;
    }
  }

  return (
    <div className="App flex-col gap-1">
      <div>
        <img src={spareroom} className='width-60 m-l-20'/>
        <h2>Spareroom Message Generator ⚡️</h2>
      </div>
      <CollapseSection profileInfo={profileInfo} setProfileInfo={setProfileInfo} aiMessage={aiMessage}/>
      <div>
        {contextHolder}
        <Button
          type="primary"
          icon={<CloudDownloadOutlined />}
          loading={loading}
          disabled={!flatInfo}
          onClick={() => {
            setLoading(true);
            handleGenerateMessage();
            setLoading(false);
          }}>
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



//  icons in manifestt  
// "16": "favicon.ico",
    // "48": "logo192.png",
    // "128": "logo512.png"