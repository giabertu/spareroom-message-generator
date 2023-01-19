import { DatePicker } from "antd";
import dayjs from 'dayjs'

const { RangePicker } = DatePicker;

function RangePickerLabelled({profileInfo, setProfileInfo}){

  function onChange(date, dateString){
    setProfileInfo({... profileInfo, rangePicked: dateString})
  }

  return (
    <div>
      <h4>Rent Duration</h4>
      <RangePicker size={'middle'} picker="month" popupStyle={{ scale: '0.8' }} onChange={onChange} 
      value={profileInfo && dayjs(profileInfo.rangePicked[0]).isValid() && dayjs(profileInfo.rangePicked[1], 'YYYY-MM').isValid() ? [dayjs(profileInfo.rangePicked[0], 'YYYY-MM'), dayjs(profileInfo.rangePicked[1], 'YYYY-MM')] : null }/>
    </div>
  )

}

export default RangePickerLabelled;


//dayjs(profileInfo.rangePicked.slice(0, 6), 'YY-MM'), dayjs(profileInfo.rangePicked.slice(6), 'YY-MM')]