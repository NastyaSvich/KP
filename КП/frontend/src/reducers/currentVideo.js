import { GET_VIDEO, RATE_VIDEO, EDIT_VIDEO } from "../constants/actions"

export default function videos(state = {}, { type, payload }) {
  switch (type) {
    case GET_VIDEO:
      return payload
    case RATE_VIDEO:
      return state
    case EDIT_VIDEO:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}
