import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async function (text, { rejectWithValue, dispatch }) {

    try {

      const todo = {
        userId: 1,
        title: text,
        completed: false,
      };

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo)
        }
      )

      if(!response.ok) {
        throw new Error('Server Error. Can`t create todo')
      }

      const data = await response.json();

      console.log(data)

      dispatch(addTodo(text))
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Can`t delete");
      }

      dispatch(removeTodo(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((el) => el.id === id);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Server error. Can`t change status");
      }

      const data = await response.json();
      console.log(data);

      dispatch(toggleTodoComplete(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  // В первы параметр этой функции попадает то, что отправил в нее при вызове dispatch
  // Если нажать ctr+_ то можно посмотреть доступные для ввода параметры
  // rejectWithValue нужен для обработки возможной ошибки. С его помощью, возникшая ошибка будет передана на обработку в метод экстраредьюсера
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      if (!response.ok) {
        throw new Error("Getting data error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    newId: 4,
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: state.newId,
        text: action.payload,
        completed: false,
      });
      state.newId += 1;
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload;
      });
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [deleteTodo.rejected]: setError,
    [toggleStatus.rejected]: setError,
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
