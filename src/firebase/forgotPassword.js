import { sendPasswordResetEmail } from "firebase/auth";
import * as firebase from ".";

const handler = async ({ email }) => {
    try {
        var transport = createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMPT_PASS,
            },
        });

        const url = window.location.origin;

        const link = sendPasswordResetEmail(firebase.auth, email, {
            url,
        });

        const message = `Click on the link to reset the Password: ${link} .If you have not requested then please ignore.`;

        await transport.sendMail({
            to: email,
            subject: "Reset Password",
            from: process.env.EMAIL_ID,
            text: message,
        });

        console.log("Password sent Successfully");
    } catch (err) {
        console.error(err);
    }
};

export default handler;
