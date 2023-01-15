import { Collapse } from 'antd';
import CascaderWithTitle from "./Cascader";
import CheckboxLabelled from "./Checkbox";
import InputNumberWithTitle from "./InputNumber";
import RangePickerLabelled from "./RangePicker";
import AutoCompleteLabelled from "./AutoComplete";
import TagSelectorLabelled from "./TagSelector";
import { JSONParser } from '../utils/JSONParser'

const parser = new JSONParser();
const occOptions = parser.getOccupations();
const hobbyOptions = parser.getHobbies();
const { Panel } = Collapse;


function CollapseSection({profileInfo, setProfileInfo}) {

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange} className='stretch'>
      <Panel header="Profile Information" key="1" className=''>
        <div className="flex-row">
        {/* <h2>Profile Information</h2> */}
          <RangePickerLabelled profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <AutoCompleteLabelled options={occOptions} label='Occupation' placeholder={'e.g. Developer'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <CascaderWithTitle profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <InputNumberWithTitle profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <TagSelectorLabelled options={hobbyOptions} label='Hobbies' placeholder={'e.g. Swimming'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

          <CheckboxLabelled label={'Smoker'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
          
          <CheckboxLabelled label={'Pets'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
        </div>
      </Panel>
      {/* <Panel showArrow={false} header="This is panel header with no arrow icon" key="2">
        <p>{text}</p>
      </Panel> */}
    </Collapse>
  );
};
export default CollapseSection;