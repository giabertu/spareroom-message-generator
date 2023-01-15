import { Select } from 'antd';



function TagSelectorLabelled({label, options, placeholder, profileInfo, setProfileInfo}){


  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setProfileInfo({...profileInfo, hobbies: value})
  };


  return (
  
    <div>
      <h3>{label}</h3>
      <Select
        mode="tags"
        style={{width: 150}}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        value={profileInfo && profileInfo.hobbies ? profileInfo.hobbies : null}
      />
    </div>
  );
}
export default TagSelectorLabelled;