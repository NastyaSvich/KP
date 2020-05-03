import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "../reducers"
import thunk from "redux-thunk"
import { logger } from "redux-logger"
import { loadState } from "./localStorage"

const middlewares = [thunk]
const enhancers = []

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
  const devToolsExtension =
    typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
)

const persistedState = loadState()

export default function configureStore() {
  return createStore(rootReducer, persistedState, composedEnhancers)
}
