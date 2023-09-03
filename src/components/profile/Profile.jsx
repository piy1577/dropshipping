import { useEffect, useState } from "react";
import { useCart } from "../store";
import { signOut } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user } = useCart();
    const router = useNavigate();
    const [firstInput, setFirstInput] = useState({
        name: "",
        phoneNumber: 0,
        email: "",
    });

    useEffect(() => {
        if (user) {
            setFirstInput({
                name: user?.displayName,
                phoneNumber: user?.phoneNumber,
                email: user?.email,
            });
        }
    }, [user]);

    return (
        <div className="profile">
            <h1>Change your Profile</h1>
            <form className="inputs">
                <label>Name: </label>
                <input
                    type="text"
                    value={firstInput.name}
                    onInput={(e) =>
                        setFirstInput((t) => {
                            return { ...t, name: e.target.value };
                        })
                    }
                />
                <div className="btn">
                    <button>Submit</button>
                </div>
            </form>
            <form className="inputs">
                <label>Phone Number: </label>
                <input
                    type="text"
                    value={firstInput.phoneNumber}
                    onInput={(e) =>
                        setFirstInput((t) => {
                            return { ...t, phoneNumber: e.target.value };
                        })
                    }
                />
                <div className="btn">
                    <button>Submit</button>
                </div>
            </form>

            <form className="inputs">
                <label>Email: </label>
                <input
                    type="text"
                    value={firstInput.email}
                    onInput={(e) =>
                        setFirstInput((t) => {
                            return { ...t, email: e.target.value };
                        })
                    }
                />
                <div className="btn">
                    <button>Submit</button>
                </div>
            </form>
            <div className="btn">
                <button onClick={() => signOut(router)}>Sign Out</button>
            </div>
        </div>
    );
};

export default Profile;
