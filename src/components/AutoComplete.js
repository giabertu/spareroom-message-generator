import { AutoComplete } from 'antd';


function AutoCompleteLabelled ({options, placeholder, label}){
  
  return (
  <div>
    <h3>{label}</h3>
    <AutoComplete
      style={{width: 200}}
      options={options}
      placeholder={placeholder}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}/>
  </div>
);
}
export default AutoCompleteLabelled;