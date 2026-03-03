const f1Username = process.env.F1_USERNAME;
const f1Password = process.env.F1_PASSWORD;

let token;
let expirationTime = Date.now();

async function getAccessToken() {
    const tokenUrl = "https://api.openf1.org/token";
    const params = new URLSearchParams();
    params.append("username", f1Username);
    params.append("password", f1Password);

    try {
        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });

        if (response.ok) {
            const now = Date.now();
            const tokenData = await response.json();
            expirationTime = now + tokenData.expires_in * 1000;
            return tokenData.access_token;
        } else {
            console.error(
                "Error obtaining token:",
                response.status,
                await response.text(),
            );
            return null;
        }
    } catch (error) {
        console.error("Network error or other issue:", error);
        return null;
    }
}

export async function getToken() {
    const now = Date.now();

    if (now < expirationTime && token !== undefined) {
        return token;
    }

    const newToken = await getAccessToken();
    if (newToken === null) {
        return null;
    }

    token = newToken;
    return newToken;
}
