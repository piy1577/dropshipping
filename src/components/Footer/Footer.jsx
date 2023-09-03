import { AiOutlineInstagram, AiFillFacebook } from "react-icons/ai";
const Footer = () => {
    const date = new Date();
    return (
        <div className="footer">
            <div className="copyright">Copyright @{date.getFullYear()} </div>
            <div className="social">
                <span className="follow">Follow us: </span>{" "}
                <AiOutlineInstagram /> <AiFillFacebook />
            </div>
        </div>
    );
};

export default Footer;
