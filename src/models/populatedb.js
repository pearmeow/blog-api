import client from "./client";
import db from "./queries";

async function main() {
    const deleted = await client.user.deleteMany();
    console.log(deleted);
    await db.createUser("Pear", "meowmeow");
    await db.createUser("Pea", "meowmeow");
    await db.createUser("Pe", "meowmeow");
    await db.createUser("P", "meowmeow");
    const users = await db.readUser();
    const singleton = await db.readUser(12);
    console.log("ye olde separator -------------");
    console.log(users);
    console.log(singleton);
}

main();
