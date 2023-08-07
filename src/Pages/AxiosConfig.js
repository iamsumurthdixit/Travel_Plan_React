import axios from 'axios';

const token = Cookies.get("jwt") || ''; 

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios;
