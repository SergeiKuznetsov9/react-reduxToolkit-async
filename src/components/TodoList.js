import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TodoItem } from './TodoItem';
import { fetchTodos } from '../store/todoSlice';


const TodoList = () => {

  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos.todos)

  useEffect( () => {
    dispatch(fetchTodos())
  }, [dispatch]) 



  return (
    <ul>
    {
        todos.map( element => (<React.Fragment key= {element.id}>
            <TodoItem
                id = {element.id}
                text = {element.title}
                completed = {element.completed}
            />
          <hr/>
        </React.Fragment>
        ))
      }

</ul>
  )
}

export default TodoList
