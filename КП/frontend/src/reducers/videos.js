import { CREATE_VIDEO, GET_VIDEOS } from "../constants/actions"

export default function videos(state = [], { type, payload }) {
  switch (type) {
    case CREATE_VIDEO:
      return state
    case GET_VIDEOS:
      return payload
    default:
      return state
  }
}
