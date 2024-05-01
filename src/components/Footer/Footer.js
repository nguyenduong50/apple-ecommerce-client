// import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
            <div className="customer col">
                <h5 className="text-uppercase">customer services</h5>
                <ul>
                    <li>
                        <a href="google.com">Help & Contact Us</a>
                    </li>
                    <li>
                        <a href="google.com">Returns & Refunds</a>
                    </li>
                    <li>
                        <a href="google.com">Online Stores</a>
                    </li>
                    <li>
                        <a href="google.com">Tems & Conditions</a>
                    </li>
                </ul>
            </div>
            <div className="customer col">
                <h5 className="text-uppercase">company</h5>
                <ul>
                    <li>
                        <a href="google.com">What We Do</a>
                    </li>
                    <li>
                        <a href="google.com">Available Services</a>
                    </li>
                    <li>
                        <a href="google.com">Latest Post</a>
                    </li>
                    <li>
                        <a href="google.com">FAQs</a>
                    </li>
                </ul>
            </div>
            <div className="customer col">
                <h5 className="text-uppercase">social media</h5>
                <ul>
                    <li>
                        <a href="google.com">Twitter</a>
                    </li>
                    <li>
                        <a href="google.com">Instagram</a>
                    </li>
                    <li>
                        <a href="google.com">Facebook</a>
                    </li>
                    <li>
                        <a href="google.com">Printerest</a>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
