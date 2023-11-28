import axios from "axios";

const apiKey = 'live_Z1Y0VLELo6wqyIRs2FblybzWHVt18K0NvpREAV1fHKDMIAB840lz9fjaDUqnEXnR'; 

const Api = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  headers: {
    'x-api-key': apiKey,
  },
});

export default Api;
