const client = require("./client");

async function dropTables() {
    try{
        client.connnect();
        console.log("Dropping All Tables...");
        await client.query(`
            DROP TABLE IF EXISTS users;
            `);
            console.log("Finished dropping tables");
    } catch (error){
        console.log("Error dropping tables");
        throw error;
    }
    
}

async function createTables(){
    try {
        console.log("Starting to build tables...");

        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(20) NOT NULL,
                last_name VARCHAR(40) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                address VARCHAR(255) NOT NULL,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                pID VARCHAR(4) NOT NULL,
                instructor BOOLEAN DEFAULT false
            );
            INSERT INTO users(first_name,last_name,email,address,password,pID,instructor)
            Values
             ('Zeus','Yang','tincidunt.orci@icloud.ca','3893 Iaculis Street','YZeus', 'abc123','0001','false'),
    ('Kalia','Park','vulputate.nisi.sem@google.edu','726 Eu Road','kaliapart','sadlk;fj','0002','false'),
    ('Phelan','Oneil','vel.pede.blandit@icloud.couk','1704 Enim Rd.','DPete','abcdef','0003','false'),
    ('Declan','Petersen','imperdiet.erat@icloud.org','188-821 Sed, Ave','Pouch','nightmare','0004','false'),
    ('Tana','Kline','ante.dictum@yahoo.couk','662-532 Arcu Street','TheKline','a;sldkjf','0005','false'),
    ('Ad','Min','admin@gracelandshopper.com', '1000 Cool Drive', 'Admin','$2b$10$6njV7c1/.mlaT9DVhdYk2O/9/RjdFNMHPRitW7ySxzxxfOsE1fKOm','1001','true');
            `);
            console.log("Finished building tables!");
    }catch (error){
        console.error("Error building tables")
        throw error;
    }
}
async function rebuildDB(){
    try{
        await dropTables();
        await createTables();
    }catch(error) {
        console.error(error);
    }
}

module.exports = {
    rebuildDB,
    dropTables,
    createTables,
};