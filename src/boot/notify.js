import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top-right',
  timeout: 5000,
  progress: true,
  html: true,
  actions: [{ icon: 'close', color: 'white', attrs: { round: true, dense: true } }]
})
