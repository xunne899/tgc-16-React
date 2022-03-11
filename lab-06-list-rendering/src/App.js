import logo from './logo.svg';
import './App.css';
import TodoList from "./TodoList"

function App() {

  // to understand list rendering, two important concepts
  // 1. JSX elements are just JavaScript objects
  // 2. we can render ARRAYS of JSX elements
  let bulletPoints = [
    <li>One</li>,
    <li>Two</li>,
    <li>Three</li>
  ]

  return (
    <div>
      <h1>My Todos</h1>
      {bulletPoints}
      <TodoList/>
    </div>
  );
}

export default App;
