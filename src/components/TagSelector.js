import { Select } from 'antd';



function TagSelectorLabelled({label, options, placeholder}){


  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
      />
    </div>
  );
}
export default TagSelectorLabelled;