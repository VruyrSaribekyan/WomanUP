import React, { useRef, useState } from "react";
import firebase from "../../firebase";
import styles from "./Todo.module.css";
import { ITodo } from "../../types";
import dayjs from "dayjs";
import Modal from "../Modal/Modal";

export default function Todo({ todo }: { todo: ITodo }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAfter, setIsAfter] = useState<unknown>(dayjs().isAfter(todo.date));
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);
  const deleteTodo = (): void => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.remove();
  };

  const completeTodo = (): void => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.update({
      complete: !todo.complete,
    });
  };

  const editTodo = (): void => {
    setDisable((prev) => !prev);
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.update({
      title: newTitle,
    });
    if (!disable) inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  const handleOpenModal = (isOpen: boolean) => {
    setOpenModal(isOpen);
  };

  return (
    <>
      {openModal ? (
        <Modal open={handleOpenModal} url={todo.url} />
      ) : (
        <div
          onClick={() => {
            setDisable(false);
          }}
          className={isAfter ? styles.finished : styles.listItem}
        >
          <li
            className={todo.complete ? styles.completed : styles.notCompleted}
          >
            <input
              ref={inputRef}
              style={
                disable
                  ? { pointerEvents: "visible" }
                  : { pointerEvents: "none" }
              }
              type="text"
              value={todo.title === "" ? newTitle : todo.title}
              className={styles.list}
              onChange={handleChange}
            />
            <div className={styles.wrapper}>
              <img
                onClick={() => handleOpenModal(true)}
                className={styles.uploadedImage}
                src={todo.url}
              />
              <button
                className={!isAfter ? styles.btn : styles.btnUnset}
                onClick={completeTodo}
              >
                <img
                  src={todo.complete ? "complete.png" : "completed.png"}
                  alt="completed"
                />
              </button>
              {!todo.complete ? (
                <button
                  className={!isAfter ? styles.btn : styles.btnUnset}
                  onClick={editTodo}
                >
                  <img src="edit.png" alt="edit" />
                </button>
              ) : null}
              <button className={styles.btn} onClick={deleteTodo}>
                <img src="delete.png" alt="delete" />
              </button>
            </div>
          </li>
        </div>
      )}
    </>
  );
}
