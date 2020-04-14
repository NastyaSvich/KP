import { combineReducers } from "redux"
import videos from "./videos"
import message from "./message"
import user from "./user"
import currentVideo from "./currentVideo"

export default combineReducers({
  videos,
  message,
  user,
  currentVideo
})
