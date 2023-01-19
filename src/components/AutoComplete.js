import { AutoComplete } from 'antd';


function AutoCompleteLabelled ({options, placeholder, label, profileInfo, setProfileInfo}){

  function onChange(value, option){
    setProfileInfo({...profileInfo, occupation: value});
  }
  
  return (
  <div>
    <h4>{label}</h4>
    <AutoComplete
      style={{width: 150}}
      options={options}
      placeholder={placeholder}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      onChange={onChange}
      value={profileInfo && profileInfo.occupation ? profileInfo.occupation : null}
      />
  </div>
);
}
export default AutoCompleteLabelled;