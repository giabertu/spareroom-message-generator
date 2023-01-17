import { Collapse } from 'antd';
import CascaderWithTitle from "./Cascader";
import CheckboxLabelled from "./Checkbox";
import InputNumberWithTitle from "./InputNumber";
import RangePickerLabelled from "./RangePicker";
import AutoCompleteLabelled from "./AutoComplete";
import TagSelectorLabelled from "./TagSelector";
import SetupList from './SetupList';
import { occOptions, hobbyOptions } from '../utils/data/data';

const { Panel } = Collapse;


function CollapseSection({profileInfo, setProfileInfo}) {

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Collapse onChange={onChange} className='stretch'>
      <Panel header="Usage Steps" key="1" className=''>
        <SetupList/>
      </Panel>
      <Panel header="Profile Information" key="2" className=''>
        <div className="flex-row">
          <RangePickerLabelled profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <AutoCompleteLabelled options={occOptions} label='Occupation' placeholder={'e.g. Developer'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <CascaderWithTitle profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <InputNumberWithTitle profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <TagSelectorLabelled options={hobbyOptions} label='Hobbies' placeholder={'e.g. Swimming'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <CheckboxLabelled label={'Smoker'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
          
          <CheckboxLabelled label={'Pets'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
        </div>
      </Panel>
    </Collapse>
  );
};
export default CollapseSection;