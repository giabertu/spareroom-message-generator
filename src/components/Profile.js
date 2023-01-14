import CascaderWithTitle from "./Cascader";
import CheckboxLabelled from "./Checkbox";
import InputNumberWithTitle from "./InputNumber";



function Profile(){


  return (
    <div className="flex-col">
      <h2>Profile Information</h2>
      <div className="flex-row">
        <CascaderWithTitle/>
        <InputNumberWithTitle/>
        <CheckboxLabelled label={'Smoker'}/>
        <CheckboxLabelled label={'Pets'}/>
      </div>
    </div>
  )

}



export default Profile;