import { sendRequest } from './sendRequest';
const index = () => sendRequest('/wellnessLogs');

const createOrUpdate = (logFormData) =>
  sendRequest('/wellnessLogs', {
    method: 'POST',
    body: logFormData,
  });

const remove = (logId) =>
  sendRequest(`/wellnessLogs/${logId}`, {
    method: 'DELETE',
  });

export { index, createOrUpdate, remove };
