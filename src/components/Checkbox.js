import { Checkbox } from 'antd';


function CheckboxLabelled ({label}){

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <h3>{label}</h3>
      <Checkbox onChange={onChange}></Checkbox>
    </div>
  )

} 
export default CheckboxLabelled;