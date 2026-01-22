import { BASE_URL} from "./apiService.js";
import { setUser } from "../state/store.js";

export async function login(email, password) {
    try {
        const response = await fetch(
            `${BASE_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);

        if (!response.ok) {
            throw new Error('Error to verify user credentials');
        }

        const users = await response.json();

        if (users.length === 0 || !Array.isArray(users)) {
            throw new Error('Invalid credentials');
        }

        const user = users[0];
        setUser(user);

        return {success: true, user};
    } catch (error) {
        return {success: false, error: error.message};
    }
}

export async function register(userData) {
    try {
        const response = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(userData.email)}`);

        if (!response.ok) {
            throw new Error ('Error to verify existing user');
        }

        const existingUsers = await response.json();

        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            throw new Error ('Email is already registered');
        }

        const registerResponse = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!registerResponse.ok) {
            throw new Error ('Error to register new user');
        }

        const newUser = await registerResponse.json();
        setUser(newUser);

        return {success: true, user: newUser};
    } catch (error) {
        return {success: false, error: error.message};
    }
}