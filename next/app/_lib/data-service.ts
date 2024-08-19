const baseURL = process.env.API_URL;

export async function getAddresses(accessToken: string) {
    const response = await fetch(`${baseURL}/users/address/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    return data;
}
