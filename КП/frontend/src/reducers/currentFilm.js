import { GET_FILM, RATE_FILM, EDIT_FILM } from "../constants/actions"

export default function films(state = {}, { type, payload }) {
  switch (type) {
    case GET_FILM:
      return payload
    case RATE_FILM:
      return state
    case EDIT_FILM:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}
