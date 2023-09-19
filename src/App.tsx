import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragHandler = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId == source.droppableId)
    )
      return;
    let add,
      active = todos,
      complete = completedTodos;
    if (source.droppableId == 'TodosList') {
      add = active[source.index];
      add.isDone = !add.isDone
      //remove the element at that index
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      add.isDone = !add.isDone
      complete.splice(source.index, 1);
    }

    if (destination.droppableId == 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(source.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragHandler}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
