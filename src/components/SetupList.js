import { List } from 'antd';
import { listItems } from '../utils/data/data.js'

function SetupList(){

  return (
    <List
      size="small"
      header={<h3>How do I use this extension?</h3>}
      // footer={<div>Footer</div>}
      bordered
      dataSource={listItems}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  );
}

export default SetupList;