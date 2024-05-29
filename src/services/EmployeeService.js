import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:9090/api/v1';

export const listEmployees = () =>  axios.get(REST_API_BASE_URL);

