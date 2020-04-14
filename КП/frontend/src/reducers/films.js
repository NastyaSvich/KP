import { CREATE_FILM, GET_FILMS } from "../constants/actions"

export default function films(state = [], { type, payload }) {
  switch (type) {
    case CREATE_FILM:
      return state
    case GET_FILMS:
      return payload
    default:
      return state
  }
}
