import { Input } from 'antd'
import { UserOutlined } from '@ant-design/icons';



function InputField({profileInfo, setProfileInfo, label}) {

  function handleChange(e){
    console.log(e)
    setProfileInfo({...profileInfo, name: e.target.value})
  }


  return (
    <div>
      <h4>{label}</h4>
      <Input placeholder="default size" onChange={handleChange} prefix={<UserOutlined />} value={profileInfo && profileInfo.name ? profileInfo.name : ''} />
    </div>
  )

}

export default InputField;