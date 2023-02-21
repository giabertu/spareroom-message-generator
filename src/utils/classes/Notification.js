

class Notification {

  constructor(){}

  static openSuccess(messageApi, content){
    messageApi.open({
      type: 'success',
      content: content,
      // style: {
      //   marginTop: '20vh',
      // },
    });
  }

  static openWarning(messageApi, content){
    messageApi.open({
      type: 'warning',
      content: content,
    });
  }


}


export default Notification