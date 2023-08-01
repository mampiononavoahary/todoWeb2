import React, { useState } from 'react';

const TodoItem = ({ index, task, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleDelete = () => {
    onDelete(index);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(index, updatedTask);
    setEditing(false);
  };

  return (
    <tr>
      <td>
        {editing ? (
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
        ) : (
          task
        )}
      </td>
      <td>
        {editing ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditing(false)}></button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Update</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TodoItem;
