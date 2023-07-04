import { type MessageType } from '../constant'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import preload from '../contents/preload?script'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import switchTheme from '../contents?script'

chrome.runtime.onInstalled.addListener(() => {})

// chrome.runtime.onConnect.addListener(function (port) {
//   if (port.name === 'popup') {
//     port.onDisconnect.addListener(function () {
//       console.log('popup has been closed')
//     })
//   }
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // const tab = sender.tab
  // const senderId = sender.tab?.id
  // const payload = request.payload

  // switch (request.type) {
  //   case MessageType.UpdateDomain:
  // }
  sendResponse()
})
