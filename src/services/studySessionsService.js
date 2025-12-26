import { sendRequest } from './sendRequest';

const index = () => sendRequest('/studySessions');

export { index, create, remove };
