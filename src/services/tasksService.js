const index = () => sendRequest('/tasks');


const create = (taskFormData) =>
  sendRequest('/tasks', {
    method: 'POST',
    body: taskFormData,
  });

  

export { index, create, update, remove };
