import { useEffect, useState } from 'react';
import * as wellnessLogService from '../../services/wellnessLogService';
import styles from './Wellness.module.css';

const emptyForm = {
  date: '',
  waterGlasses: 0,
  exerciseMinutes: 0,
  sleepHours: 0,
};

const Wellness = () => {
    const [logs, setLogs] = useState([]);
    const [waterGoal, setWaterGoal] = useState(() => {
    const raw = localStorage.getItem('waterGoal');
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : 8;
  }); 

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const loadLogs = async () => {
    try {
      setError('');
      const data = await wellnessLogService.index();
      setLogs(data);
    } catch (err) {
      setError(err.message || 'Failed to load wellness logs');
    }
  };

   useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    localStorage.setItem('waterGoal', String(waterGoal));
  }, [waterGoal]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayLog = logs.find((l) => new Date(l.date).toISOString().slice(0, 10) === todayKey);
  const todayWater = todayLog?.waterGlasses || 0;

  const quickAddWater = async (delta) => {
    try {
      setError('');
      const payload = {
        date: todayKey,
        waterGlasses: Number(todayWater) + Number(delta),
        exerciseMinutes: Number(todayLog?.exerciseMinutes || 0),
        sleepHours: Number(todayLog?.sleepHours || 0),
      };
      const saved = await wellnessLogService.createOrUpdate(payload);
      setLogs((prev) => {
        const exists = prev.some((x) => x._id === saved._id);
        if (exists) return prev.map((x) => (x._id === saved._id ? saved : x));
        return [saved, ...prev];
      });
    } catch (err) {
      setError(err.message || 'Failed to update water');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  

};

export default Wellness;
