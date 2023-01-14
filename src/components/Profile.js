import CascaderWithTitle from "./Cascader";
import InputNumberWithTitle from "./InputNumber";



function Profile(){


  return (
    <div className="flex-col">
      <h2>Profile Information</h2>
      <div className="flex-row">
        <CascaderWithTitle/>
        <InputNumberWithTitle/>
      </div>
    </div>
  )

}



export default Profile;