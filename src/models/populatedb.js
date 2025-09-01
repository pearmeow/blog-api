import client from "./client.js";
import * as db from "./queries.js";

async function main() {
    const user = await db.readUserFromUsername("Pear");
    console.log("ye olde separator -------------");
    console.log(user);
    console.log(await db.updateUser(user.id, undefined, undefined, undefined));
}

main();
