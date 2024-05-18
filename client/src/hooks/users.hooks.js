/* eslint-disable no-throw-literal */
const API_URL = "http://localhost:8000"

export const userPostRequest = async ({postDetails, route}) => {
    const response =  await fetch(`${API_URL}/users/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postDetails)
    })

    const data = await response.json()
    return data
}

export const userGetRequest = async ({ route }) => {
    const response =  await fetch(`${API_URL}/users/${route}`)
    const data = await response.json()
    if(!data.ok) throw new Error(data.error)
    return data
}

export const droneGetRequest = async () => {
    const response =  await fetch(`${API_URL}/drones/availability`)
    const data = await response.json()
    if(!data.ok) throw new Error(data.error)
    return data
}

export const deliveryGetRequest = async ({ route }) => {
    try {
      const response = await fetch(`${API_URL}/deliveries/${route}`);
      if (!response.ok) {
        throw {
          status: response.status,
          statusText: response.statusText,
          data: await response.json(),
        };
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        // Handle regular JavaScript errors
        throw error;
      } else {
        // Handle errors that conform to React Query's error convention
        throw {
          status: error.status || 'UNKNOWN_ERROR',
          statusText: error.statusText || 'An unknown error occurred',
          data: error.data || null,
        };
      }
    }
  };

export const deliveryPostRequest = async ({postDetails, route}) => {
    const response =  await fetch(`${API_URL}/deliveries/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postDetails)
    })

    const data = await response.json()
    return data
}
