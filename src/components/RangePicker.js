import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

function RangePickerLabelled(){

  return (
    <div>
      <h3>Rent Duration</h3>
      <RangePicker size={'middle'} picker="month" popupStyle={{ scale: '0.8' }}/>
    </div>
  )

}

export default RangePickerLabelled;