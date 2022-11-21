import "./App.css";
import Forms from "./components/Forms/Forms";
import TodoList from "./components/TodoList/TodoList";
import Title from "./components/Title/Title";
function App() {
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Title />
        </div>
        <div>
          <Forms />
        </div>
        <div>
          <TodoList />
        </div>
      </div>  
    </div>
  );
}

export default App;
