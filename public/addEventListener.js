;(function () {
  const appName = 'markdown-export'
  console.info('\x1B[36m%s\x1B[0m', appName)

  const DispatchEventType = {
    Switch: `${appName}__dispatch-switch`,
    MatchMedia: `${appName}__dispatch-matchMedia`,
  }

  const DispatchType = {
    Preload: 'preload',
    GetListeners: 'getListeners',
  }

  document.addEventListener(DispatchEventType.Switch, function (e) {
    const { type, payload } = e.detail || {}
    switch (type) {
      case DispatchType.GetListeners:
        emitGetListeners()
        break
    }
  })
})()
