import { ERROR_MESSAGE } from "../constants/actions"

export default function videos(state = "", { type, payload }) {
  switch (type) {
    case ERROR_MESSAGE:
      return payload
    default:
      return state
  }
}
