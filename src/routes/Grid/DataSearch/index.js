import { injectReducer } from 'store/reducers'
import { injectSagas } from 'store/sagas'

export default (store) => ({
  path: 'curd',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'System.import' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    Promise.all([
      import(/* webpackChunkName: "grid" */ './containers')
    ]).then(([Containers]) => {
      const modules = require('./modules')
      const reducer = modules.default
      const sagas = modules.sagas
      injectReducer(store, { key: 'grid_curd', reducer })
      injectSagas(store, { key: 'grid_curd', sagas })
      /*  Return getComponent   */
      cb(null, Containers.default)
    })
  }
})
