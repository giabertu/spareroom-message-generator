import CascaderWithTitle from "./Cascader";
import CheckboxLabelled from "./Checkbox";
import InputNumberWithTitle from "./InputNumber";
import RangePickerLabelled from "./RangePicker";
import AutoCompleteLabelled from "./AutoComplete";
import { JSONParser } from "../utils/JSONParser";
import TagSelectorLabelled from "./TagSelector";
import { useEffect } from "react";

const parser = new JSONParser();
const occOptions = parser.getOccupations();
const hobbyOptions = parser.getHobbies();


function Profile({profileInfo, setProfileInfo}){

  useEffect(()=>{


  }, [])

  // chrome.storage.session.set({ key: value }).then(() => {
  //   console.log("Value is set to " + value);
  // });

  return (
    <div className="flex-col">
      <h2>Profile Information</h2>
      <div className="flex-row">
        <RangePickerLabelled profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

        <AutoCompleteLabelled options={occOptions} label='Occupation' placeholder={'e.g. Developer'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

        <CascaderWithTitle profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

        <InputNumberWithTitle profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

        <TagSelectorLabelled options={hobbyOptions} label='Hobbies' placeholder={'e.g. Swimming'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>

        <CheckboxLabelled label={'Smoker'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
        
        <CheckboxLabelled label={'Pets'} profileInfo={profileInfo} setProfileInfo={setProfileInfo}/>
      </div>
    </div>
  )

}



export default Profile;