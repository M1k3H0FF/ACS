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
pID,
instructor,
}) {
    const SALT_COUNT = 10;
    const hashed_password = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {
            rows: [user],
        } = await client.query(
            `
            INSERT INTO users(first_name, last_name, email, address, username, password, pID, instructor)
            Values ($1, $2, $3, $4, $5, $6, $7,$8)
            RETURNING *;
            `,
            [first_name, last_name, email, address, username, pID, instructor, hashed_password]
        );
        delete user.password;
        console.log("user", user)
        return user;
    } catch (error) {
        console.error("error creating user", error);
        throw error;
    }
}


//loginUser (username,password) | return (token, userID)

async function loginUser({username, password}) {
    const tempUser = await getUserByname(username);
    const hashedPassword = tempUser.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if(passwordsMatch) {
        delete tempUser.password;
        return tempUser;

    }else {
        console.log("Error getting user!");
        return null;
    }
    
}

async function getUserByname(username) {
    try{
        const{
            rows: [user],
        } = await client.query(
            `
            SELECT *
            FROM users
            WHERE username=$1;
            `,
            [username]
        );
        return user;
    }   catch (error) {
        console.error("Error getting user by username!");
        throw error;
    }
    
}