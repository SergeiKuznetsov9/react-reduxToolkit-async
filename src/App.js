import { useSelector } from 'react-redux';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

function App() {

  const {status, error} = useSelector(state => state.todos)

  return (<>
  <InputField />
  <br/>
  <br/>


  {status === 'loading' && <h1>Loading...</h1>}
  {error && <h1>Error occured: {error}</h1>}
    <div className="App">
      <TodoList />
    </div>
    </>);
}

export default App;
