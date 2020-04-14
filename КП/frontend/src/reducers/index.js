import { combineReducers } from "redux"
import films from "./films"
import message from "./message"
import user from "./user"
import currentFilm from "./currentFilm"

export default combineReducers({
  films,
  message,
  user,
  currentFilm
})
