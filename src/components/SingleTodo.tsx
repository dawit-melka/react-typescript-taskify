import React, { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import {IoArrowUndoSharp} from "react-icons/io5"
import { Todo } from "../model";
import "./styles.css";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index, completedTodos, setCompletedTodos}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editText } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    
    // console.log(todos);
    let newTodos: Todo[] = [];
    let newCompleted: Todo[] = [];
    console.log("-----")
    console.log(todos)
    console.log(completedTodos)
    for(let i = 0; i < todos.length; i++){
      if(todos[i].id == id){
        todos[i].isDone = !todos[i].isDone
        newCompleted.push(todos[i])
      }else {
        newTodos.push(todos[i])
      }
    }

    for(let i = 0; i < completedTodos.length; i++){
      if(completedTodos[i].id == id){
        completedTodos[i].isDone = !completedTodos[i].isDone
        newTodos.push(completedTodos[i])
      }else {
        newCompleted.push(completedTodos[i])
      }      
    }

    

    
    
    console.log({"newTodos": newTodos})
    console.log({"newCompleted": newCompleted})

    setCompletedTodos(newCompleted);
    setTodos(newTodos);
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref = {provided.innerRef}

        >
          {edit ? (
            <input
              ref={inputRef}
              value={editText}
              onChange={(event) => {
                setEditText(event.target.value);
              }}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos_single--text">{todo.todo}</s>
          ) : (
            <span className="todos_single--text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={(e) => {
                edit
                  ? handleEdit(e, todo.id)
                  : !todo.isDone
                  ? setEdit(true)
                  : setEdit(false);
              }}
            >
             {!todo.isDone? <AiFillEdit />:<></>}
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
            {todo.isDone?<IoArrowUndoSharp/> : <MdDone />}
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
