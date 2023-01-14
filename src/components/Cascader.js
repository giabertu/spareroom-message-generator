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

const onChange = (value) => {
  console.log(value);
};

function CascaderWithTitle(props){

  return (
    <div>
      <h3>Diet</h3>
      <Cascader options={options} onChange={onChange} placeholder="Please select" />
    </div>
  )
 
}; 
export default CascaderWithTitle;