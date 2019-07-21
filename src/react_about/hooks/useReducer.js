import React, { useState } from 'react'

function useReducer(reducer, initialState) {
  const [state, setState] = useState[initialState]

  function dispatch(action) {
    const nextState = reducer(state, action)
    setState(nextState)
  }

  return [state, dispatch]
}

const todosReducer = (state, action) => {
  const { type, text } = action
  switch (type) {
  case 'add':
    return [...state, text]
  default:
    return state
  }
}

function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, [])

  function handleAddClick(text) {
    dispatch({ type: 'add', text })
  }
  //...
}
