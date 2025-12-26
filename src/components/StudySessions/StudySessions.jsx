import { useEffect, useMemo, useRef, useState } from 'react';
import * as studySessionService from '../../services/studySessionService';
import styles from './StudySessions.module.css';

const formatElapsed = (totalSeconds) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
};

const StudySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [note, setNote] = useState('');
  const startMsRef = useRef(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const loadSessions = async () => {
    try {
      setError('');
      const data = await studySessionService.index();
      setSessions(data);
    } catch (err) {
      setError(err.message || 'Failed to load study sessions');
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      const start = startMsRef.current;
      if (!start) return;
      setElapsedSec((Date.now() - start) / 1000);
    };

    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [isRunning]);


    const stats = useMemo(() => {
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
    const totalHours = +(totalMinutes / 60).toFixed(2);
    return { count: sessions.length, totalMinutes, totalHours };
  }, [sessions]);

   const handleStart = () => {
    setError('');
    setIsRunning(true);
    startMsRef.current = Date.now();
    setElapsedSec(0);
  };

  const handleStopAndSave = async () => {
    try {
      setError('');
      const start = startMsRef.current;
      if (!start) return;

      const end = Date.now();
      const minutes = Math.max(1, Math.round((end - start) / 60000));

      const payload = {
        startTime: new Date(start).toISOString(),
        endTime: new Date(end).toISOString(),
        durationMinutes: minutes,
        status: 'completed',
        note: note.trim(),
      };

      const created = await studySessionService.create(payload);
      setSessions([created, ...sessions]);
 setIsRunning(false);
      startMsRef.current = null;
      setElapsedSec(0);
      setNote('');
    } catch (err) {
      setError(err.message || 'Failed to save session');
    }
 } ;

 const handleCancel = () => {
    setIsRunning(false);
    startMsRef.current = null;
    setElapsedSec(0);
  };

   const handleDelete = async (id) => {
    try {
      await studySessionService.remove(id);
      setSessions(sessions.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete session');
    }
  };

  return (
    <main className={styles.container}>
      <h1>Study Timer</h1>
      {error && <p className={styles.error}>{error}</p>}
      <section className={styles.card}>
        <h2>Timer</h2>

        <div className={styles.timerRow}>
          <div className={styles.timer}>{formatElapsed(elapsedSec)}</div>

            {!isRunning ? (
            <button type="button" onClick={handleStart}>
              Start
            </button>
) : (
            <div className={styles.timerActions}>
              <button type="button" onClick={handleStopAndSave}>
                Stop & Save
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
          <label className={styles.note}>
          Note (optional)
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What did you study?" />
        </label>
        <p className={styles.hint}>
          Tip: stopping will automatically save a session with your start/end time.
        </p>
      </section>


        <section className={styles.card}>
        <h2>Study Stats</h2>
        <ul className={styles.stats}>
          <li>
            <strong>Total sessions:</strong> {stats.count}
          </li>
          <li>
            <strong>Total time:</strong> {stats.totalHours} hours
          </li>
        </ul>
      </section>
       <section className={styles.card}>
        <h2>Study History</h2>
        {sessions.length === 0 ? (
          <p>No sessions yet.</p>
        ) : (
          <ul className={styles.list}>
            {sessions.map((s) => (
              <li key={s._id} className={styles.item}>
                <div>
                  <strong>{new Date(s.startTime).toLocaleString()}</strong> →{' '}
                  <strong>{new Date(s.endTime).toLocaleString()}</strong>
                </div>
                <div className={styles.meta}>Duration: {s.durationMinutes} min</div>
                {s.note && <div className={styles.meta}>Note: {s.note}</div>}
                <button type="button" onClick={() => handleDelete(s._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      </main>
  );
};  