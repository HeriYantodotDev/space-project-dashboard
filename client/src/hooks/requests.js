import { toast } from 'react-toastify';

const API_URL = 'https://localhost:8000/v1';
const postContentType = {
  "Content-Type": "application/json"
};

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, z) => {
    return z.flightNumber - a.flightNumber;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: postContentType,
      body: JSON.stringify(launch),
    })
  } catch(err) {
    return {
      ok: false
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    // modify the code to alert if something error. 
    const response = await fetch(`${API_URL}/launches/${id}`, {
      method: "delete"
    });
    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
    }

     
  } catch(err) {
    return {
      oke: false
    }
  }
}


export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch
};