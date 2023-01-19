import { useEffect, useState } from 'react';
import { Button, message, Modal, QRCode } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons'

import './App.css';
import OpenAiService from './api/OpenAiService';
import CollapseSection from './components/CollapseSection';
import Notification from './utils/classes/Notification';
import { defaultProfileInfo } from './utils/data/data';
import { getPropertyDescription } from './utils/classes/Script';
import btc from './Bitcoin-BTC-icon.png'
import bg from './valley-bg.png'


function App() {

  const [tabURL, setTabURL] = useState('');
  const [flatInfo, setFlatInfo] = useState('');
  const [clip, setClip] = useState(false);
  const [profileInfo, setProfileInfo] = useState(defaultProfileInfo);

  const [aiMessage, setAiMessage] = useState('');
  
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
      setTabURL(tab.url);
    })()
  },[])

  useEffect(() => {
    (async () => {
      await chrome.storage.session.set({ profileInfo: profileInfo })
      console.log('Profile info set inside session!')
    })()
  }, [profileInfo]) 


  async function callService(){
    const service = new OpenAiService();
    const response = await service.generateMessage(flatInfo);

    console.log("OpenAI Response: " , response)
    console.log("OpenAI text: ", response.choices[0].text)

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
      setClip(true);
      return true;
    } catch (err) {
      console.log('There was an error copying the message to the clipboard')
      return false;
    }
  }

  const [loadings, setLoadings] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);

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
    <div className="App flex-col gap-1 debug">
      <h2>Spareroom Message Generator ⚡️</h2>
      <CollapseSection profileInfo={profileInfo} setProfileInfo={setProfileInfo} aiMessage={aiMessage}/>
      {/* {
        tabURL && <p>{tabURL.slice(0, 14)}</p>
      }
      {
        flatInfo && <p>{flatInfo}</p>
      }
      {
        clip && <h3>Copied!</h3>
      } */}
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
      <div className='stretch flex-row flex-end'>
        <button className='support' onClick={() => setModalOpen(true)}>Support</button>
        <img src={btc} className='width-20'/>
      </div>
      <Modal
        title="On chain bitcoin address"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}>
        {/* <h3>On chain Bitcoin address</h3> */}
        <div className='flex-row gap-1'>
          <p className='width-275'>
            Thank you for your kind contribution. I am glad you found this extension useful, and are willing to give something back. I accept donations only through bitcoin, permissionless, censorship resistant, internet-native money. ✨
          </p>
          <QRCode
            errorLevel="H"
            //hardcoded btc address
            value="bc1qud24ysr2vf4r4f6nuy573x4qcc4uw5q7vmjmf3"
            icon={btc}
            style={{width: 60}}
            /> 
        </div>
      </Modal>
    </div>
  );
}

export default App;

