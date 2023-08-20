import { updateProfile } from "firebase/auth";

import { auth } from ".";

const Profile = async (input) => {
    try {
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: input.name,
            });
            console.log(`profile updated successfully`);
            // const phoneProvider = new PhoneAuthProvider(auth);
        }
    } catch (err) {
        console.error(err);
    }
};

export default Profile;
