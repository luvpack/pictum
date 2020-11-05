import axios from 'axios'
import {API_URL} from "../config.js";

const fetch = axios.create({baseURL: API_URL})

export default fetch
