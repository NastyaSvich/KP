import { ERROR_MESSAGE } from "../constants/actions"

export default function films(state = "", { type, payload }) {
  switch (type) {
    case ERROR_MESSAGE:
      return payload
    default:
      return state
  }
}
