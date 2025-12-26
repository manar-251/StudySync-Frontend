import { sendRequest } from './sendRequest';
const index = () => sendRequest('/studySessions');


const create = (sessionFormData) =>
  sendRequest('/studySessions', {
    method: 'POST',
    body: sessionFormData,
  });

const remove = (sessionId) =>
  sendRequest(`/studySessions/${sessionId}`, {
    method: 'DELETE',
  });

export { index, create, remove };
