import { auth } from ".";

const handler = async (router) => {
    try {
        await auth.signOut();
        router.push("/");
    } catch (err) {
        console.error(err);
    }
};

export default handler;
