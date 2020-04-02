import { LOGIN, LOGOUT, EDIT } from "../constants/actions"

export default function films(state = {}, { type, payload }) {
  switch (type) {
    case LOGIN:
      return payload
    case LOGOUT:
      return {}
    case EDIT:
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}
