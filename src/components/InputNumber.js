import { InputNumber } from 'antd';


function InputNumberWithTitle({profileInfo, setProfileInfo}){

  const onChange = (value) => {
    console.log('changed', value);
    setProfileInfo({...profileInfo, age: value})
  };
  
  return (
    <div>
      <h4>Age</h4>
      <InputNumber min={15} max={100} onChange={onChange} value={profileInfo ? profileInfo.age : 20}/>
    </div>
  )
} 
export default InputNumberWithTitle;