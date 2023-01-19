import { Modal, QRCode } from "antd"
import btc from '../Bitcoin-BTC-icon.png'


function SupportModal({setModalOpen, modalOpen}) {

  return (
      <Modal
        title="On chain bitcoin address"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}>
        {/* <h3>On chain Bitcoin address</h3> */}
        <div className='flex-row gap-1'>
          <p className='width-275'>
            Thank you for your kind contribution. I am glad you found this extension useful, and are willing to give something back. I accept donations only through bitcoin, permissionless, censorship resistant, internet-native money. ✨
          </p>
          <QRCode
            errorLevel="H"
            //hardcoded btc address
            value="bc1qud24ysr2vf4r4f6nuy573x4qcc4uw5q7vmjmf3"
            icon={btc}
            style={{width: 60}}
            /> 
        </div>
      </Modal>
  )

}


export default SupportModal