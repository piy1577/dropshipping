import admin from "firebase-admin";
import { cert } from "firebase-admin/app";

console.log(admin.app.length);
if (!admin.app.length) {
    const serviceAccount = {
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id,
        private_key: process.env.private_key,
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        auth_uri: process.env.auth_uri,
        token_uri: process.env.token_uri,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.client_x509_cert_url,
        universe_domain: process.env.universe_domain,
    };

    admin.initializeApp({ credential: cert(serviceAccount) });
}

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(501).end();
    }
    const { phoneNumber } = req.body;
    try {
        const user = await admin
            .auth()
            .createUser({ phoneNumber: phoneNumber });
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(300).end();
    }
};

export default handler;
