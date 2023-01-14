import { Checkbox } from 'antd';


function CheckboxLabelled ({label, profileInfo, setProfileInfo}){

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (label == 'Smoker'){
      setProfileInfo({...profileInfo, smoker: e.target.checked})
    } else {
      setProfileInfo({...profileInfo, pets: e.target.checked})
    }
  };

  return (
    <div>
      <h3>{label}</h3>
      <Checkbox onChange={onChange} checked={profileInfo && label == 'Smoker'? profileInfo.smoker : profileInfo.pets}></Checkbox>
    </div>
  )

} 
export default CheckboxLabelled;

//checked={profileInfo[label] ? true : false}