import { Cascader } from 'antd';


const options = [
  {
    value: 'omnivore',
    label: 'omnivore',
  },
  {
    value: 'vegetarian',
    label: 'vegetarian',
  },
  {
    value: 'vegan',
    label: 'vegan',
  },
  {
    value: 'flexitarian',
    label: 'flexitarian',
  },
  {
    value: 'pescatarian',
    label: 'pescatarian',
  },
];


function CascaderWithTitle({profileInfo, setProfileInfo}){
  
  const onChange = (value) => {
    console.log(value);
    setProfileInfo({...profileInfo, diet: value})
  };
  return (
    <div>
      <h4>Diet</h4>
      <Cascader options={options} onChange={onChange} placeholder="Please select" value={ profileInfo !== undefined ? profileInfo.diet : null} style={{width: 150}} />
    </div>
  )
 
}; 
export default CascaderWithTitle;