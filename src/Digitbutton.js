import { type } from '@testing-library/user-event/dist/type'
import {Action} from './App'

export default function Digitbutton ({digit, dispatch}) {
  return <button className="btns_input" onClick={ () => dispatch({ type: Action.ADD_DIGIT, payload: {digit} })}>{digit}</button>
}