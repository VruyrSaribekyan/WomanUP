import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { ITodo } from "../../types";
import Todo from "../Todo/Todo";

export default function TodoList() {
  const [todoList, setTodoList] = useState<ITodo[]>();
  useEffect(() => {
    const todoRef = firebase.database().ref("Todo");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot?.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setTodoList(todoList);
    });
  }, []);

  return (
    <div>
      {todoList
        ? todoList.map((todo, index) => <Todo todo={todo} key={index} />)
        : null}
    </div>
  );
}
