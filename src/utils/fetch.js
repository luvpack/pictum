import axios from 'axios'
import {setupCache} from "axios-cache-adapter";

import {API_URL} from "../config.js";

const cache = setupCache({maxAge: 15 * 60 * 1000})

const fetch = axios.create({baseURL: API_URL, adapter: cache.adapter})

export default fetch
