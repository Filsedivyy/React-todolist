import { useState } from "react";

function ExampleComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Text");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <input type="text" value={text} onChange={handleChange} />
      ) : (
        <p>{text}</p>
      )}
      {isEditing ? (
        <button onClick={handleSaveClick}>Uložit</button>
      ) : (
        <button onClick={handleEditClick}>Editovat</button>
      )}
    </div>
  );
}

export default ExampleComponent;
