const signup = async (formData) => {
  const res = await sendRequest('/auth/sign-up', {
    method: 'POST',
    body: formData,
  });

  if (res?.token) {
    setToken(res.token);
    return getUser();
  }

  return null;
};

const signin = async (user) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.token) {
      window.localStorage.setItem('token', json.token);
      const rawPayload = json.token.split('.')[1];
      const jsonPayload = window.atob(rawPayload);
      const user = JSON.parse(jsonPayload);
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUser = () =>  {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  } catch (error) {
    return null;
  };
};

const signout = () => {
  localStorage.removeItem('token');
};

export { signup, signin, getUser, signout };