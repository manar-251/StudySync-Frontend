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
  const res = await sendRequest('/auth/sign-in', {
    method: 'POST',
    body: formData,
  });

    if (res?.token) {
    setToken(res.token);
    return getUser();
  }

  return null;
};

const getUser = () =>  {
  try {
    const token = getToken();    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
  } catch (error) {
    return null;
  };
};

const signout = () => {
  clearToken();
};

export { signup, signin, getUser, signout };