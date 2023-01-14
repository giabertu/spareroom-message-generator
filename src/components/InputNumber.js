import { InputNumber } from 'antd';


function InputNumberWithTitle(){

  const onChange = (value) => {
    console.log('changed', value);
  };
  
  return (
    <div>
      <h3>Age</h3>
      <InputNumber min={15} max={100} defaultValue={20} onChange={onChange} />
    </div>
  )
} 
export default InputNumberWithTitle;