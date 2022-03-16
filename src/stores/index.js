import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { unref } from 'vue'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(({ ssrContext }) => {
  const pinia = createPinia()

  if (process.env.MODE === 'ssr') {
    if (process.env.SERVER && ssrContext) {
      ssrContext.onRendered(() => {
        // unwrapping the state for serialization
        const state = unref(ssrContext.state)
        ssrContext.state = state
      })
    }
    if (process.env.CLIENT) {
      pinia.replaceState = (state) => {
        pinia.state.value = state
      }
    }
  }

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia
})
