import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { ITodo } from "../../types";
import styles from "./Forms.module.css";
export default function Forms() {
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [date, setDate] = useState<any>("");
  const [files, setFiles] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleGetDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]?.name);
    }
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file);
  };

  const createTodo = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const todoRef = firebase.database().ref("Todo");

    const todo: Omit<ITodo, "id"> = {
      title,
      complete: false,
      file: file,
      date: date,
      url: `https://firebasestorage.googleapis.com/v0/b/todo-list-womanup.appspot.com/o/${file}?alt=media&token=6d59c554-19e9-4d0c-bad8-bf391a362f87`,
    };
    todoRef.push(todo);
    setTitle("");
    setDate("");
  };
  return (
    <form className={styles.upload} onSubmit={createTodo}>
      <input
        className={styles.dateInput}
        onChange={handleGetDate}
        type="datetime-local"
        value={date}
        required
      />
      <input
        type="text"
        placeholder="Enter a Todo..."
        className={styles.input}
        value={title}
        required
        onChange={handleChange}
      />
      <input
        onChange={handleChangeFile}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
      />
      <label htmlFor="contained-button-file">
        <span className={styles.uploadImage}>
          <img src="file.png" alt="file" />
        </span>
      </label>
      <button className={styles.btn} type="submit">
        Add
      </button>
    </form>
  );
}
