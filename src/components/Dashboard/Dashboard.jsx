import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import * as dashboardService from '../../services/dashboardService';
import styles from './Dashboard.module.css';

const Dashboard = ({ user }) => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setError('');
        const data = await dashboardService.getSummary();
        setSummary(data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      }
    };

    fetchSummary();
  }, []);

  const waterGoal = useMemo(() => {
    const raw = localStorage.getItem('waterGoal');
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : 8;
  }, []);

  const waterText = useMemo(() => {
    if (!summary?.wellness) return 'No wellness logs yet';
    const date = new Date(summary.wellness.date);
    const dateKey = date.toISOString().slice(0, 10);
    const todayKey = new Date().toISOString().slice(0, 10);
    const label = dateKey === todayKey ? 'Today' : 'Latest';
    return `${label}: ${summary.wellness.waterGlasses}/${waterGoal} glasses`;
  }, [summary, waterGoal]);

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome, {user.username}</h1>
        <div className={styles.quickLinks}>
          <Link to="/tasks">Tasks</Link>
          <Link to="/studySessions">Timer</Link>
          <Link to="/wellness">Wellness</Link>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {!summary ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.grid}>
          <div className={styles.card}>
            <h2>Tasks</h2>
            <p className={styles.big}>
              {summary.tasks.completed}/{summary.tasks.total}
            </p>
            <p className={styles.muted}>completed</p>
            <Link to="/tasks" className={styles.cta}>Manage tasks</Link>
          </div>

          <div className={styles.card}>
            <h2>Study</h2>
            <p className={styles.big}>{summary.study.totalHours}</p>
            <p className={styles.muted}>total hours</p>
            <Link to="/studySessions" className={styles.cta}>Start timer</Link>
          </div>

          <div className={styles.card}>
            <h2>Water</h2>
            <p className={styles.big}>{summary.wellness?.waterGlasses ?? 0}</p>
            <p className={styles.muted}>{waterText}</p>
            <Link to="/wellness" className={styles.cta}>Log wellness</Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default Dashboard;
