import Axios from 'axios';

const instance =Axios.create({
    baseURL:'https://my-burger-app-decfc.firebaseio.com/'
});
export default instance;