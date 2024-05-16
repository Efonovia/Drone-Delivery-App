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
    const response =  await fetch(`${API_URL}/deliveries/${route}`)
    const data = await response.json()
    if(!data.ok) throw new Error(data.error)
    return data
}

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
