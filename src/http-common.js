import axios from "axios";
import authHeader from './services/auth-header';

const baseURL = process.env.NODE_ENV !== 'production' ?
							  process.env.REACT_APP_BASE_URL_DEVELOPMENT :
								process.env.REACT_APP_BASE_URL_PRODUCTION;

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    ...authHeader()
  },
});