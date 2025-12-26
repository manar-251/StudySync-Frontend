const index = () => sendRequest('/tasks');
import { request } from "./apiClient";

const create = (taskFormData) =>
  sendRequest('/tasks', {
    method: 'POST',
    body: taskFormData,
  });

const update = (taskId, taskFormData) =>
  sendRequest(`/tasks/${taskId}`, {
    method: 'PUT',
    body: taskFormData,
  });

const remove = (taskId) =>
  sendRequest(`/tasks/${taskId}`, {
    method: 'DELETE',
  });

export { index, create, update, remove };
