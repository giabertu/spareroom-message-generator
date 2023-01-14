import { InputNumber } from 'antd';


function InputNumberWithTitle(){

  const onChange = (value) => {
    console.log('changed', value);
  };
  
  return (
    <div>
      <h3>Age</h3>
      <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
    </div>
  )
} 
export default InputNumberWithTitle;