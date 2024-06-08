import { type } from '@testing-library/user-event/dist/type'
import {Action} from './App'

export default function Operationbutton ({operation, dispatch}) {
  return <button className="btns_input input_op" onClick={ () => 
    dispatch({ type: Action.CHOOSE_OPERATION, payload: {operation} })}>
        {operation}
        </button>
}