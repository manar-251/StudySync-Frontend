import { sendRequest } from './sendRequest';

const getCurrentUser = () => sendRequest('/users/current-user');

const updateCurrentUser = (payload) =>
  sendRequest('/users/current-user', {
    method: 'PUT',
    body: payload,
  });

export { getCurrentUser, updateCurrentUser };