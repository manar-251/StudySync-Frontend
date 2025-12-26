import { sendRequest } from './sendRequest';
const index = () => sendRequest('/studySessions');


const create = (sessionFormData) =>
  sendRequest('/studySessions', {
    method: 'POST',
    body: sessionFormData,
  });


export { index, create, remove };
