import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTodo } from '../store/todoSlice'

const InputField = () => {
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('')

    const handleChange = (value) => {
        setInputValue(value)
    }


  return (
    <div>
        <input
            type='text'
            onChange={(event) => handleChange(event.target.value)}
            value={inputValue}
        />
        <button onClick={() => dispatch(addNewTodo(inputValue))}>ADD TODO</button>
    </div>
  )
}

export default InputField