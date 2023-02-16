import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, toggleStatus } from '../store/todoSlice'

export const TodoItem = ( {id, text, completed} ) => {

    const dispatch = useDispatch();

    const uncompletedStyles = {
        textDecoration: 'none'
    }

    const completedStyles = {
        textDecoration: 'line-through'
    }


    return (
      <li>
          <input 
              type='checkbox'
              checked={completed}
              onChange={() =>  dispatch(toggleStatus(id))}
          />
          <span style={completed ? completedStyles : uncompletedStyles}>{text}</span>
          <button onClick={() => dispatch( deleteTodo(id) )}>Remove</button>
      </li>
    )
}
