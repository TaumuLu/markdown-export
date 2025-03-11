import { MessageType } from '../constant'

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

  switch (request.type) {
    case MessageType.OpenOptions:
      chrome.tabs.create({ url: 'options.html' })
      break
  }
  sendResponse()
})
