// import { sendPasswordResetEmail } from "firebase/auth";
// import { createTransport } from "nodemailer";
// import * as firebase from ".";

// const handler = async ({ email }) => {
//     try {
//         const options = {
//             host: import.meta.env.VITE_SMPT_HOST,
//             port: import.meta.env.VITE_SMPT_PORT,
//             auth: {
//                 user: import.meta.env.VITE_SMPT_USER,
//                 pass: import.meta.env.VITE_SMPT_PASS,
//             },
//         };
//         console.log(options);
//         var transport = createTransport(options);

//         const url = window.location.origin;

//         const link = sendPasswordResetEmail(firebase.auth, email, {
//             url,
//         });

//         const message = `Click on the link to reset the Password: ${link} .If you have not requested then please ignore.`;

//         await transport.sendMail({
//             to: email,
//             subject: "Reset Password",
//             from: import.meta.env.VITE_EMAIL_ID,
//             text: message,
//         });

//         console.log("Password sent Successfully");
//     } catch (err) {
//         console.error(err);
//     }
// };

// export default handler;
