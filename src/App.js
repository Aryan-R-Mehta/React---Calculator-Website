import React, { useReducer } from 'react'
import Digitbutton from './Digitbutton'
import Operationbutton from './Operationbutton'
import './App.css'
import { type } from '@testing-library/user-event/dist/type'

export const Action = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}


function reducer(state, {type, payload}){
  switch(type){
    case Action.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          current_operand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.current_operand === "0" ) {
        return state
      }
      if(payload.digit === "." && state.current_operand.includes(".") ){ 
        return state
      }

      return {
        ...state, 
        current_operand: `${state.current_operand || ""}${payload.digit}`,
      }
    case Action.CLEAR:
      return {}
    case Action.DELETE_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          current_operand: null,
          overwrite: false
        }
      }
    if(state.current_operand == null) return state
    if(state.current_operand.length == 1){
      return{...state, current_operand: null}
    }

    return{
      ...state,
      current_operand: state.current_operand.slice(0,-1)
    }

    case Action.EVALUATE:
      if(state.operation == null  || 
        state.current_operand == null ||
        state.pre_operand == null
      ){
        return state
      }

      return{
        ...state,
        overwrite: true,
        pre_operand: null,
        operation: null,
        current_operand: evaluate(state),
      }

    case Action.CHOOSE_OPERATION:
      if(state.current_operand == null && state.pre_operand == null){
        return state
      }
      if(state.pre_operand == null){
        return{
          ...state,
          operation: payload.operation,
          pre_operand: state.current_operand,
          current_operand: null
        }
      }
      if(state.current_operand == null){
        return{
          ...state,
          operation: payload.operation,
        }
      }
      return {
        state,
        pre_operand: evaluate(state),
        operation: payload.operation,
        current_operand: null
      }
  }
}

function evaluate({ current_operand, pre_operand, operation}){
  const prev = parseFloat(pre_operand);
  const curr = parseFloat(current_operand);
  if(isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + curr;
      break
    case "-":
      computation = prev - curr;
      break
    case "*":
      computation = prev * curr;
      break
    case "/":
      computation = prev / curr;
      break
  }
  return computation.toString()
}

const Integer_formater = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})
function formatoperand(operand) {
  if(operand == null) return 
  const [integer, decimal ] = operand.split('.')
  if(decimal == null) return Integer_formater.format(integer)
    return `${Integer_formater.format(integer)}.${decimal}`
}

function App() {
  const [{ current_operand, pre_operand, operation}, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
    <div className="App">
        <div class="container">
        <div class="box">
            <div className="output_section">
              <div className="pre_operand">{formatoperand(pre_operand)} {operation} </div>
              <div className="current_operand">{formatoperand(current_operand)} </div>
            </div>
            <div className="input_section">
              <div className="btns_input big_input input_del" onClick={() => dispatch({type: Action.CLEAR})}>AC</div>
              <div className="btns_input input_del" onClick={() => dispatch({type: Action.DELETE_DIGIT})}>DEL</div>
              <Operationbutton operation='/' className="btns_input input_op" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="1" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="2" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="3" dispatch={dispatch}/>
              <Operationbutton operation='*' className="btns_input input_op" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="4" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="5" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="6" dispatch={dispatch}/>
              <Operationbutton operation='+' className="btns_input input_op" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="7" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="8" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="9" dispatch={dispatch}/>
              <Operationbutton operation='-' className="btns_input input_op" dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="." dispatch={dispatch}/>
              <Digitbutton className="btns_input" digit="0" dispatch={dispatch}/>
              <div className="btns_input input_op big_input" onClick={() => dispatch({type: Action.EVALUATE})}>=</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
