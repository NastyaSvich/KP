import api from "../api"

import * as ActionTypes from "../constants/actions"

export const logOut = () => dispatch => {
  dispatch({
    type: ActionTypes.LOGOUT
  })
}

export const logIn = loginData => dispatch => {
  api.post("/login", loginData).then(({ data }) => {
    if (data.message) {
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: "Неверный логин или пароль"
      })
    } else {
      dispatch({ type: ActionTypes.LOGIN, payload: data })
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: ""
      })
    }
  })
}

export const registration = regData => dispatch => {
  api.post("/registration", regData).then(({ data }) => {
    if (data.message === "such user already exist") {
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: "Такой пользователь уже существует"
      })
    } else if (data.message) {
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: "Логин или пароль не соответсвуют формату"
      })
    } else {
      dispatch({ type: ActionTypes.LOGIN, payload: data })
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: ""
      })
    }
  })
}
