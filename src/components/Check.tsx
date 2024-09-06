import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../styles/Generales.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  userid: string;
}

interface DraggableTaskProps {
  task: Task;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  toggleTaskCompletion: (id: number) => void;
  handleTaskClick: (task: Task) => void;
  handleEditChange: (e: ChangeEvent<HTMLInputElement>) => void;
  saveEdit: () => void;
  deleteTask: (id: number) => void;
  editTaskId: number | null;
  editTaskText: string;
}

const ItemType = 'TASK';

const DraggableTask: React.FC<DraggableTaskProps> = ({
  task,
  index,
  moveTask,
  toggleTaskCompletion,
  handleTaskClick,
  handleEditChange,
  saveEdit,
  deleteTask,
  editTaskId,
  editTaskText,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => dragRef(dropRef(node))}
      className={task.completed ? 'completed' : ''}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <input
      className='checkbox'
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      {editTaskId === task.id ? (
        <input
          type="text"
          value={editTaskText}
          onChange={handleEditChange}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              saveEdit();
            }
          }}
          autoFocus
          className="edit-task-input"
        />
      ) : (
        <span className="task-text" onClick={() => handleTaskClick(task)}>
          {task.text}
        </span>
      )}
      <button onClick={() => deleteTask(task.id)} className="delete-button">
        <i className='lnir-trash-can'></i>
      </button>
    </li>
  );
};

export function Checklist() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState<string>('');

  // Obtener el correo electrónico del usuario logueado desde localStorage
  const loggedInUserEmail = localStorage.getItem('loggedInUser');

  // Cargar las tareas del usuario logueado al montar el componente
  useEffect(() => {
    if (loggedInUserEmail) {
      const storedTasks = localStorage.getItem(`tasks_${loggedInUserEmail}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [loggedInUserEmail]);

  // Guardar las tareas del usuario logueado en localStorage cada vez que cambien
  useEffect(() => {
    if (loggedInUserEmail && tasks.length > 0) {
      localStorage.setItem(`tasks_${loggedInUserEmail}`, JSON.stringify(tasks));
    }
  }, [tasks, loggedInUserEmail]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() && loggedInUserEmail) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          userid: loggedInUserEmail, 
        },
      ]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editTaskId !== null) {
        saveEdit();
      } else {
        addTask();
      }
    }
  };

  const handleTaskClick = (task: Task) => {
    if (!task.completed) {
      setEditTaskId(task.id);
      setEditTaskText(task.text);
    }
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTaskText(e.target.value);
  };

  const saveEdit = () => {
    if (editTaskId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, text: editTaskText } : task
        )
      );
      setEditTaskId(null);
      setEditTaskText('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  const handleClearAllTasks = () => {
    if (loggedInUserEmail) {
      // Vaciar la lista en el localStorage para el usuario actual
      localStorage.removeItem(`tasks_${loggedInUserEmail}`);
      // Vaciar las tareas en el estado local
      setTasks([]);
    }
  };

  return (
    <div className="checklist">
      <h1 className='font-semibold text-sm mb-4 mt-2'>Vamos a cumplir tus metas:</h1>
      <div className="input-container relative">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Añadir nueva tarea"
        />
          <li onClick={addTask} className='lnir-plus absolute  right-[10px]  top-[7px]	text-[#051d05]  plus  '></li>
      </div>
      <button onClick={handleClearAllTasks} className="clear-button">
      <i className='lnir-trash-can mb-2 text-lg	'></i>
      </button>
      <ul>
        {tasks.map((task, index) => (
          <DraggableTask
            key={task.id}
            task={task}
            index={index}
            moveTask={moveTask}
            toggleTaskCompletion={toggleTaskCompletion}
            handleTaskClick={handleTaskClick}
            handleEditChange={handleEditChange}
            saveEdit={saveEdit}
            deleteTask={deleteTask}
            editTaskId={editTaskId}
            editTaskText={editTaskText}
          />
        ))}
      </ul>
    </div>
  );
}
