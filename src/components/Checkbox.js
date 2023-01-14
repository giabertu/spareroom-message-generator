import { Checkbox } from 'antd';


function CheckboxLabelled ({label}){

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Checkbox onChange={onChange}>{label}</Checkbox>
  )

} 
export default CheckboxLabelled;