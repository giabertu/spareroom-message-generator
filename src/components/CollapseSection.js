import { Collapse, Button} from 'antd';
import CascaderWithTitle from "./Cascader";
import CheckboxLabelled from "./Checkbox";
import InputNumberWithTitle from "./InputNumber";
import RangePickerLabelled from "./RangePicker";
import AutoCompleteLabelled from "./AutoComplete";
import TagSelectorLabelled from "./TagSelector";
import SetupList from './SetupList';
import { occOptions, hobbyOptions } from '../utils/data/data';
import InputField from './InputField';
import Notification from '../utils/classes/Notification';

import { CopyOutlined } from '@ant-design/icons';

const { Panel } = Collapse;


function CollapseSection({profileInfo, setProfileInfo, aiMessage, messageApi}) {

  const onChange = (key) => {
    console.log(key);
  };

  async function onClick() {
    try {
      await navigator.clipboard.writeText(aiMessage);
      Notification.openSuccess(messageApi, 'Message copied to clipboard!')
    } catch (err) {
      Notification.openWarning(messageApi, 'There was an issue copying to the clipboard, please copy the message in \'Message Preview\' manually.');
      console.log('There was an error copying the message to the clipboard ', err)
    }
  }

  return (
    <Collapse onChange={onChange} className='stretch'>
      <Panel header="Usage Steps" key="1" className=''>
        <SetupList/>
      </Panel>
      <Panel header="Profile Information" key="2" className=''>
        <div className="flex-row gap-1">
          <RangePickerLabelled profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <AutoCompleteLabelled options={occOptions} label='Occupation' placeholder={'e.g. Developer'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <InputField label={'Name'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
          
          <InputNumberWithTitle profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <TagSelectorLabelled options={hobbyOptions} label='Hobbies' placeholder={'e.g. Swimming'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <CascaderWithTitle profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <CheckboxLabelled label={'Smoker'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
          
          <CheckboxLabelled label={'Pets'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
        </div>
      </Panel>
      <Panel header="Message Preview" collapsible={aiMessage ? '' : 'disabled'} key='3'>
        <p className='pre-line'>{aiMessage}</p>
        <Button 
          type="dashed"
          icon={<CopyOutlined />}
          onClick={onClick}
          >
            Copy Message
        </Button>
      </Panel>
    </Collapse>
  );
};
export default CollapseSection;