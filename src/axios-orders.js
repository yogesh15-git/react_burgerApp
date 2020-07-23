import axios from 'axios';

const instance = axios.create({
    baseURL:'https://my-burger-app-decfc.firebaseio.com/'
});

export default instance;