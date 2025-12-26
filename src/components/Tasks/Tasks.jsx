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


};

export default Tasks;
