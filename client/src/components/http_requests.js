import { authActions } from "../store";
import store from "../store";

export const login = async (e, input, setError, dispatch, redirect) => {
    e.preventDefault();
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });
        const response = await res.json();
        if (res.ok) {
            if (response.success) {
                const date = new Date();
                date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
                document.cookie = `jwt=${response.token};expires=${date.toUTCString};path=/`;
                dispatch(authActions.login(response.user));
                redirect("/");
            }
        } else {
            setError(response.error);
        }
    } catch (err) {
        console.log(err);
    }
};

export const signup = async (e, input, setError, dispatch, redirect) => {
    setError({ name: "", email: "", password: "" });
    e.preventDefault();
    if (input.name.trim().length === 0) {
        setError((t) => {
            return { ...t, name: "Name is required" };
        });
        return;
    }
    if (input.email.trim().length === 0) {
        setError((t) => {
            return { ...t, email: "email is required" };
        });
    }
    if (input.password.length < 6) {
        setError((t) => {
            return {
                ...t,
                password: "Password should contain more than 6 character",
            };
        });
        return;
    }
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });
        const response = await res.json();
        if (response.success) {
            const date = new Date();
            date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
            document.cookie = `jwt=${response.token
                };expires=${date.toUTCString()};path=/`;
            console.log(response.user);
            dispatch(authActions.login(response.user));
            redirect("/");
        } else {
            setError(response.error);
        }
    } catch (err) {
        console.log(err);
    }
};

export const googleLogin = async (credentialResponse, dispatch, redirect) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/google/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${credentialResponse.credential}`,
            },
        }
    );
    const response = await res.json();
    if (response.success) {
        const date = new Date();
        date.setTime(
            date.getTime() + 3 * 24 * 60 * 60 * 1000
        );
        console.log(date.getTime());
        document.cookie = `jwt=${response.token}; expires=${date.toUTCString()};path=/`;
        dispatch(authActions.login(response.user));
        redirect("/");
    } else {
        alert("login Failed");
    }
}

export const googleSignup = async (credentialResponse, dispatch, redirect) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/google/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${credentialResponse.credential}`,
            },
        }
    );
    const response = await res.json();
    if (response.success) {
        const date = new Date();
        date.setTime(
            date.getTime() + 3 * 24 * 60 * 60 * 1000
        );
        document.cookie = `jwt=${response.token
            };expires=${date.toUTCString()};path=/`;
        console.log(response.user);
        dispatch(authActions.login(response.user));
        redirect("/");
    } else {
        alert("signup Failed");
    }
}

export const getProduct = async (id) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/${id}`);
        const response = await res.json();
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const homeLoader = async (setLoad, setData) => {
    try {
        setLoad(true)
        const res = await fetch(import.meta.env.VITE_BACKEND);
        const response = await res.json();
        const data = await Promise.all(response.map(getProduct))
        setData(data);
        setLoad(false)
    } catch (err) {
        console.log(err);
    }
}

export const productLoader = async (id, setLoad, setData) => {
    setLoad(true)
    const data = await getProduct(id);
    setData(data);
    setLoad(false);
}

export const uploadImage = async (data) => {
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

    try {
        await fetch(`${import.meta.env.VITE_BACKEND}/image`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookie}`
            },
            body: JSON.stringify({ image: data.url })
        })
    } catch (err) {
        console.log(err);
    }
}

export const imageUploadHandler = async (e, dispatch) => {
    const file = e.target.files[0];
    if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

        fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME
            }/image/upload`,
            {
                method: "POST",
                body: data,
            }
        ).then((res) =>
            res.json().then((data) => {
                dispatch(authActions.changeImage(data.url));
                uploadImage(data);
            })
        );
    }
}

export const changePasswordHandler = async (input) => {
    const { currentPassword, newPassword, confirmPassword } = input;
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];


    if (newPassword !== confirmPassword) {
        alert('New Password and Confirm Password does not match');
        return;
    }
    if (currentPassword.length < 6) {
        alert('Current Password should be greater than 6 character');
        return;
    }
    if (newPassword.length < 6) {
        alert('New Password should be greater than 6 character');
        return;
    }
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/changePassword`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookie}`
            },
            body: JSON.stringify({ currentPassword, newPassword })
        })
        const response = await res.json();
        console.log(response);
        if (!response.success) {
            alert('Password change failed')
        } else {
            alert('Password changed successfully')
        }
    } catch (err) {
        alert(err);
    }
}

export const changeName = async (input) => {
    const { name } = input
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/name`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookie}`
            },
            body: JSON.stringify({ name })
        })
        const response = await res.json();
        console.log(response);
        if (!response.success) {
            alert('Name change failed')
        } else {
            alert('Name changed successfully')
        }
    } catch (err) {
        alert(err);
    }
}

export const changeEmail = async (input) => {
    const { email } = input;
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookie}`
            },
            body: JSON.stringify({ email })
        })
        const response = await res.json();
        console.log(response);
        if (!response.success) {
            alert('Email change failed')
        } else {
            alert('Email changed successfully')
        }
    } catch (err) {
        alert(err);
    }
}

export const cartHandler = async () => {
    // console.log(cart);
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];
    const cart = store.getState().cart

    try {
        await fetch(`${import.meta.env.VITE_BACKEND}/cart`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookie}`
            },
            body: JSON.stringify({ cart })
        })
    } catch (err) {
        console.log(err);
    }
}

export const paymentHandler = async (amount, redirect) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/payment/getkey`);
    const { key } = await res.json();
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
    });

    const { order } = await response.json();
    const detail = store.getState();

    var options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: detail.name,
        image: detail.profileImage,
        order_id: order.id,
        show_coupons: true,
        handler: async function (response) {
            paymentVerificationHandler(response, redirect)
        },
        prefill: {
            name: detail.name,
            email: detail.email,
            contact: "9000090000"
        },
        theme: {
            color: "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
}

const paymentVerificationHandler = async (response, redirect) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/payment/verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature })
    })
    const data = await res.json();
    if (data.success) {
        redirect(`/paymentsuccess?reference=${response.razorpay_payment_id}`)
    }
}