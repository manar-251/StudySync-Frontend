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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      if (!form.date) {
        setError('Date is required');
        return;
      }

      const payload = {
        date: form.date,
        waterGlasses: Number(form.waterGlasses),
        exerciseMinutes: Number(form.exerciseMinutes),
        sleepHours: Number(form.sleepHours),
      };

      const saved = await wellnessLogService.createOrUpdate(payload);
        setLogs((prev) => {
        const exists = prev.some((l) => l._id === saved._id);
        if (exists) return prev.map((l) => (l._id === saved._id ? saved : l));
        return [saved, ...prev];
      });

      setForm(emptyForm);
    } catch (err) {
      setError(err.message || 'Failed to save wellness log');
    }
  };

  const handleDelete = async (id) => {
    try {
      await wellnessLogService.remove(id);
      setLogs(logs.filter((l) => l._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete log');
    }
  };
    return (
        <main className={styles.container}>
           <h1>Wellness</h1>

      <section className={styles.card}>
        <h2>Water Goal</h2>
        <div className={styles.goalRow}>
          <label>
            Goal (glasses/day)
            <input type="number" min="1" value={waterGoal} onChange={(e) => setWaterGoal(Number(e.target.value))} />
          </label>

          <div className={styles.progress}>
            <strong>Today:</strong> {todayWater}/{waterGoal}
          </div>

          <div className={styles.goalActions}>
            <button type="button" onClick={() => quickAddWater(1)}>+1 glass</button>
            <button type="button" onClick={() => quickAddWater(-1)} disabled={todayWater <= 0}>-1</button>
          </div>
        </div>
      </section> 
     {error && <p className={styles.error}>{error}</p>}
        <section className={styles.card}>
        <h2>Daily Log (Upsert)</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Date
            <input type="date" name="date" value={form.date} onChange={handleChange} />
          </label>

          <label>
            Water glasses
            <input
              type="number"
              min="0"
              name="waterGlasses"
              value={form.waterGlasses}
              onChange={handleChange}
            />
          </label>
        

          <label>
            Exercise minutes
            <input
              type="number"
              min="0"
              name="exerciseMinutes"
              value={form.exerciseMinutes}
              onChange={handleChange}
            />
          </label>

          <label>
            Sleep hours
            <input
              type="number"
              min="0"
              name="sleepHours"
              value={form.sleepHours}
              onChange={handleChange}
            />
          </label>

          </form>
        </section>
        </main>

    );
};

export default Wellness;
