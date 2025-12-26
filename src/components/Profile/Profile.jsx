import { useEffect, useState } from 'react';
import * as userService from '../../services/userService';
import styles from './Profile.module.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
      try {
        setError('');
        setInfo('');
        const data = await userService.getCurrentUser();
        setProfile(data);
        setUsername(data.username || '');
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      }
    };
    load();
    }, []);

     const handleSave = async (e) => {
    e.preventDefault();
    if (!username.trim() || !profile) return;
    
    try {
      setSaving(true);
      setError('');
      setInfo('');
      const updated = await userService.updateCurrentUser({ username: username.trim() });
      setProfile(updated);
      setInfo('Profile updated.');
    } catch (err) {
      if (err.status === 404 || err.status === 405) {
        setError("Profile update isn't enabled on the backend yet. Add PUT /users/current-user then try again.");
      } else {
        setError(err.message || 'Failed to update profile');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1>Profile</h1>

      {error && <p className={styles.error}>{error}</p>}
      {info && <p className={styles.info}>{info}</p>}

      {!profile ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.card}>
          <div className={styles.meta}>
            <div>
              <strong>User ID:</strong> {profile._id}
            </div>
          </div>

          <form onSubmit={handleSave} className={styles.form}>
            <label>
              Username
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>

            <div className={styles.actions}>
              <button type="submit" disabled={saving || username.trim() === profile.username}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );

};  


export default Profile;
