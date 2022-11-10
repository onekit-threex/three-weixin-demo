class Navigator {
  constructor() {
    //const systemInfo = wx.getSystemInfoSync()
    this.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
    this.platform = "android"//systemInfo.platform;
    this.mediaDevices = {
      getUserMedia() {
        return new Promise((resolve) => {
          resolve();
        });
      },
    };
  }
}

export default new Navigator();
