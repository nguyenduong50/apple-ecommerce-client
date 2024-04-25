import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
            <div className="customer col">
                <h5 className="text-uppercase">customer services</h5>
                <ul>
                    <li>
                        <a href="#">Help & Contact Us</a>
                    </li>
                    <li>
                        <a href="#">Returns & Refunds</a>
                    </li>
                    <li>
                        <a href="#">Online Stores</a>
                    </li>
                    <li>
                        <a href="#">Tems & Conditions</a>
                    </li>
                </ul>
            </div>
            <div className="customer col">
                <h5 className="text-uppercase">company</h5>
                <ul>
                    <li>
                        <a href="#">What We Do</a>
                    </li>
                    <li>
                        <a href="#">Available Services</a>
                    </li>
                    <li>
                        <a href="#">Latest Post</a>
                    </li>
                    <li>
                        <a href="#">FAQs</a>
                    </li>
                </ul>
            </div>
            <div className="customer col">
                <h5 className="text-uppercase">social media</h5>
                <ul>
                    <li>
                        <a href="#">Twitter</a>
                    </li>
                    <li>
                        <a href="#">Instagram</a>
                    </li>
                    <li>
                        <a href="#">Facebook</a>
                    </li>
                    <li>
                        <a href="#">Printerest</a>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
