import { useEffect, useMemo, useState } from 'react';
import * as taskService from '../../services/taskService';
import styles from './Tasks.module.css';

const emptyForm = { title: '', priority: 'medium', dueDate: '' };

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

    const isEditing = useMemo(() => !!editId, [editId]);
    const loadTasks = async () => {
         try {
      setError('');
      const data = await taskService.index();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    }
  };

    useEffect(() => {
    loadTasks();
  }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

     const startEdit = (task) => {
    setEditId(task._id);
    setForm({
      title: task.title || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || '',
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');

      if (!form.title.trim()) {
        setError('Title is required');
        return;
      }
      if (isEditing) {
        const updated = await taskService.update(editId, {
          title: form.title,
          priority: form.priority,
          dueDate: form.dueDate,
        });
         setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      } else {
        const created = await taskService.create(form);
        setTasks([created, ...tasks]);
      }

        cancelEdit();
    } catch (err) {
      setError(err.message || 'Failed to save task');
    }
  }; 

  const handleToggleCompleted = async (task) => {
    try {
      const updated = await taskService.update(task._id, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.remove(taskId);
      setTasks(tasks.filter((t) => t._id !== taskId));
      if (editId === taskId) cancelEdit();
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  };

  return (
    <main className={styles.container}>
      <h1>Tasks</h1>

      {error && <p className={styles.error}>{error}</p>}

      <section className={styles.card}>
        <h2>{isEditing ? 'Edit Task' : 'New Task'}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Finish report"
            />
          </label>

          <label>
            Priority
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </label>

          <label>
            Due date
            <input name="dueDate" value={form.dueDate} onChange={handleChange} placeholder="YYYY-MM-DD" />
          </label>

          <div className={styles.actions}>
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            {isEditing && (
              <button type="button" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className={styles.card}>
        <h2>Your Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul className={styles.list}>
            {tasks.map((t) => (
              <li key={t._id} className={styles.item}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={!!t.completed}
                    onChange={() => handleToggleCompleted(t)}
                  />
                  <span className={t.completed ? styles.done : ''}>{t.title}</span>
                </label>

                <span className={styles.meta}>Priority: {t.priority}</span>
                {t.dueDate && <span className={styles.meta}>Due: {t.dueDate}</span>}

                <div className={styles.rowActions}>
                  <button type="button" onClick={() => startEdit(t)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(t._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};



export default Tasks;
