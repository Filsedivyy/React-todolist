import React, { useState } from "react";

const AllTasks = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterInputValue, setFilterInputValue] = useState("");
  const [editingTasks, setEditingTasks] = useState([]);

  const generateUniqueId = () => {
    let newId;
    do {
      newId = Math.floor(Math.random() * 1000000);
    } while (todos.some((todo) => todo.id === newId));
    return newId;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newTodo = { id: generateUniqueId(), name: inputValue.trim() };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const filterHandleChange = (event) => {
    const filterValue = event.target.value;
    setFilterInputValue(event.target.value);
  };

  function clearFilter() {
    setFilterInputValue("");
  }

  function tasksHandler(identifikator) {
    const deletedTask = todos.filter((oneTask) => {
      return oneTask.id !== identifikator;
    });
    setTodos(deletedTask);
  }

  function deleteAll() {
    setTodos([]);
  }

  function toggleEditing(identifikator) {
    setEditingTasks((prevEditingTasks) =>
      prevEditingTasks.includes(identifikator)
        ? prevEditingTasks.filter((id) => id !== identifikator)
        : [...prevEditingTasks, identifikator]
    );
    console.log(editingTasks);
  }

  return (
    <div className="todo-list">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Zapiš úkol"
      />
      <div className="filter-container">
        <input
          placeholder="filter"
          className="filter"
          value={filterInputValue}
          onChange={filterHandleChange}
        />
        <button onClick={clearFilter}>Smazat</button>
      </div>

      <button className="deleteAll" onClick={deleteAll}>
        Smazat vše
      </button>
      <ul>
        {todos
          .filter(
            (todo) =>
              filterInputValue.length === 0 ||
              todo.name.includes(filterInputValue)
          )
          .map((todo) => (
            <li key={todo.id}>
              {editingTasks.includes(todo.id) ? (
                <input
                  className="edit-input"
                  type="text"
                  value={todo.name}
                  onChange={(e) =>
                    setTodos((prevTodos) =>
                      prevTodos.map((prevTodo) =>
                        prevTodo.id === todo.id
                          ? { ...prevTodo, name: e.target.value }
                          : prevTodo
                      )
                    )
                  }
                />
              ) : (
                <p>{todo.name}</p>
              )}
              <div className="buttons-container">
                <button onClick={() => toggleEditing(todo.id)}>
                  {editingTasks.includes(todo.id) ? "Uložit" : "Edit"}
                </button>
                <button onClick={() => tasksHandler(todo.id)}>Smazat</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AllTasks;
