import classes from './OtherInfo.module.css';

const OtherInfo = () => {
    return(
        <div className={`${classes["other-info"]} container mt-3 mb-5`}>
            <div className="row bg-body-secondary ps-5 py-5 d-flex justify-content-center">
                <div className="col-md-4 ps-5 py-2">
                    <h4 className="fst-italic fs-5 fw-normal ps-4">FREE SHIPPING</h4>
                    <p className="fst-italic fs-6 text-body-tertiary ps-4">Free shipping worldwide</p>
                </div>
                <div className="col-md-4 ps-5 py-2">
                    <h4 className="fst-italic fs-5 fw-normal ps-4">24 X 7 SERVICE</h4>
                    <p className="fst-italic fs-6 text-body-tertiary ps-4">Free shipping worldwide</p>
                </div>
                <div className="col-md-4 ps-5 py-2">
                    <h4 className="fst-italic fs-5 fw-normal ps-4">FESTIVAL OFFER</h4>
                    <p className="fst-italic fs-6 text-body-tertiary ps-4">Free shipping worldwide</p>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6 px-0">
                    <h4 className="fst-italic fs-4">LET'S BE FRIENDS!</h4>
                    <p className="fst-italic fs-6 text-body-tertiary">Nisi nisi tempor consequat laporis nisi</p>
                </div>
                <div className="col-md-6 px-0 d-flex justify-content-end">
                    <input className="form-control" placeholder="Enter your email address"/>
                    <button className="btn btn-dark px-4">Subscribe</button>
                </div>
            </div>
        </div>
    );
}

export default OtherInfo;