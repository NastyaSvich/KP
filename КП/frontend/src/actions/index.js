import api from "../api"

import * as ActionTypes from "../constants/actions"

const AuthStr = token => {
  return "Bearer ".concat(token)
}

const removeFalsy = obj => {
  let newObj = {}
  Object.keys(obj).forEach(prop => {
    if (obj[prop]) {
      newObj[prop] = obj[prop]
    }
  })
  return newObj
}

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

export const getRoliks = () => dispatch => {
  api.get("/roliks").then(({ data }) => {
    if (data.message) {
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: "Авторизуйтесь"
      })
    } else {
      dispatch({ type: ActionTypes.GET_ROLIKS, payload: data.data })
    }
  })
}

export const sortRoliks = sortField => dispatch => {
  if (sortField) {
    api.get(`/roliks?sort_field=${sortField}`).then(({ data }) => {
      console.log(data)
      dispatch({ type: ActionTypes.GET_ROLIKS, payload: data.data })
    })
  } else {
    api.get("/roliks").then(({ data }) => {
      if (data.message) {
        dispatch({
          type: ActionTypes.ERROR_MESSAGE,
          payload: "Авторизуйтесь"
        })
      } else {
        dispatch({ type: ActionTypes.GET_ROLIKS, payload: data.data })
      }
    })
  }
}

export const filterRoliks = filterString => dispatch => {
  if (filterString) {
    api
      .get(`/roliks?filter=year&filter_value=${filterString}`)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: ActionTypes.GET_ROLIKS, payload: data.data })
      })
  } else {
    api.get("/roliks").then(({ data }) => {
      if (data.message) {
        dispatch({
          type: ActionTypes.ERROR_MESSAGE,
          payload: "Авторизуйтесь"
        })
      } else {
        dispatch({ type: ActionTypes.GET_ROLIKS, payload: data.data })
      }
    })
  }
}

export const searchRoliks = searchString => dispatch => {
  api.get(`/roliks?search_value=${searchString}`).then(({ data }) => {
    if (data.message) {
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: "Авторизуйтесь"
      })
    } else {
      dispatch({ type: ActionTypes.GET_ROLIKS, payload: data.data })
    }
  })
}

export const getRolik = id => dispatch => {
  api.get(`/rolik/${id}`).then(({ data }) => {
    if (data.message) {
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: "Err"
      })
    } else {
      dispatch({ type: ActionTypes.GET_ROLIK, payload: data })
    }
  })
}

export const editUser = (user, token) => dispatch => {
  api
    .put("/user", removeFalsy(user), {
      headers: { Authorization: AuthStr(token) }
    })
    .then(({ data }) => {
      if (data.message) {
        dispatch({
          type: ActionTypes.ERROR_MESSAGE,
          payload: "Пароль не соответствует формату"
        })
      } else {
        dispatch({ type: ActionTypes.EDIT, payload: data })
        dispatch({
          type: ActionTypes.ERROR_MESSAGE,
          payload: ""
        })
      }
    })
}

export const rateRolik = (feedback, token) => async dispatch => {
  await api
    .post("/feedback", feedback, {
      headers: { Authorization: AuthStr(token) }
    })
    .then(({ data }) => {
      console.log(data)
      if (data.message === "user left feedback already") {
        dispatch({
          type: ActionTypes.ERROR_MESSAGE,
          payload: "Вы уже оставляли отзыв"
        })
      }
    })
  await api.get(`/rolik/${feedback.rolikId}`).then(({ data }) => {
    if (data.message) {
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: "Err"
      })
    } else {
      dispatch({ type: ActionTypes.GET_ROLIK, payload: data })
    }
  })
}

export const editRolik = (rolik, token, id) => async dispatch => {
  await api
    .put(`/rolik/${id}`, rolik, {
      headers: { Authorization: AuthStr(token) }
    })
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.EDIT_ROLIK,
        payload: data
      })
    })
}

export const deleteRolik = (token, id) => async dispatch => {
  await api
    .delete(`/rolik/${id}`, {
      headers: { Authorization: AuthStr(token) }
    })
    .then(() => {
      dispatch({
        type: ActionTypes.DELETE_ROLIK
      })
    })
  await api.get("/roliks").then(({ data }) => {
    if (data.message) {
      dispatch({
        type: ActionTypes.ERROR_MESSAGE,
        payload: "Авторизуйтесь"
      })
    } else {
      dispatch({ type: ActionTypes.GET_ROLIKS, payload: data.data })
    }
  })
}
