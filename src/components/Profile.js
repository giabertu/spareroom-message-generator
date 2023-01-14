import CascaderWithTitle from "./Cascader";
import CheckboxLabelled from "./Checkbox";
import InputNumberWithTitle from "./InputNumber";
import RangePickerLabelled from "./RangePicker";
import AutoCompleteLabelled from "./AutoComplete";
import { JSONParser } from "../utils/JSONParser";
import TagSelectorLabelled from "./TagSelector";

const parser = new JSONParser();
const occOptions = parser.getOccupations();
const hobbyOptions = parser.getHobbies();


function Profile(){

  return (
    <div className="flex-col">
      <h2>Profile Information</h2>
      <div className="flex-row">
        <CascaderWithTitle/>
        <InputNumberWithTitle/>
        <CheckboxLabelled label={'Smoker'}/>
        <CheckboxLabelled label={'Pets'}/>
        <RangePickerLabelled/>
        <AutoCompleteLabelled options={occOptions} label='Occupation' placeholder={'e.g. Developer'}/>
        <TagSelectorLabelled options={hobbyOptions} label='Hobbies' placeholder={'e.g. Swimming'}/>
      </div>
    </div>
  )

}



export default Profile;