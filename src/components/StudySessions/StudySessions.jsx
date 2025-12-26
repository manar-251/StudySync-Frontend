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

  
};  