import { sendRequest } from './sendRequest';

const getSummary = () => sendRequest('/dashboard');

export { getSummary };
