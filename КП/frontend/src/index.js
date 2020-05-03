import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import configureStore from "./store/configureStore"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { saveState } from "./store/localStorage"

const store = configureStore()

store.subscribe(() => {
  saveState({
    user: store.getState().user
  })
})

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true
  }
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
