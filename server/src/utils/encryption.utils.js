import { hash, verify } from 'argon2';

export async function hashPassword(password) {
    try {
        // Hash password
        const hashedPassword = await hash(password);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw new Error('Error hashing password');
    }
}

export async function verifyPassword(hashedPassword, userInputPassword) {
    try {
        // Verify password
        const isPasswordValid = await verify(hashedPassword, userInputPassword);
        return isPasswordValid;
    } catch (err) {
        console.error('Error verifying password:', err);
        throw new Error('Error verifying password');
    }
}

async function main() {
    const password = 'user123'; // User's password
    const hashedPassword = await hashPassword(password);

    // Simulate user login with input password
    const userInputPassword = 'user123';
    const isPasswordValid = await verifyPassword(hashedPassword, userInputPassword);
    console.log('Is password valid?', isPasswordValid);
}

