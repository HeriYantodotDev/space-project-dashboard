import { toast } from 'react-toastify';

const API_URL = 'v1';
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
  //add toast when it successful.
  try {
    const response = await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: postContentType,
      body: JSON.stringify(launch),
    })

    if (response.status === 201) {
      toast.success("🚀 A new launch is created!");
    }

    if (response.status === 400) {
      const data = await response.json();
      toast.error(data.error);
    }

    return response;

  } catch(err) {
    return {
      ok: false
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    const response = await fetch(`${API_URL}/launches/${id}`, {
      method: "delete"
    });

    if (response.status === 200) {
      toast.success("😢 Your launch is deleted");
    }

    const data = await response.json();

    if (data.error) {
      toast.error(`${data.error}`);
    }

    return response;

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