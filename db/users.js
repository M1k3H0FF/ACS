const client = require("./client");
const bcrypt = require("bcrypt");

//database function: user

async function createUser({
first_name,
last_name,
email,
address,
username,
password,
student_id,
}) {
    const SALT_COUNT = 10;
    const hashed_password = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            INSERT INTO users(first_name, last_name, email, address, username, password, student_id)
            Values ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
            `,
            [first_name, last_name, email, address, username, student_id, hashed_password]
        );
        delete user.password;
        console.log("user", user)
        return user;
    } catch (error) {
        console.error("error creating user", error);
        throw error;
    }
}