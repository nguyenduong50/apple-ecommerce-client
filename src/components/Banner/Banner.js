import classes from './Banner.module.css';

const Banner = ({link, page, pageMap}) => {
    return(
        <div className={`${classes.banner} container`}>
            <div className="row bg-body-secondary py-5">
                <div className="col-md-6 py-4 ps-5">
                    <h3 className="fst-italic ms-4 mb-0 fs-2">{page}</h3>
                </div>
                <div className="col-md-6 py-4 ps-5 d-flex align-items-center justify-content-end">
                    <p className="fst-italic me-5 mb-0 fs-6 text-body-tertiary">
                        <span className='fw-bold text-dark'>{link}</span>
                        <span>{pageMap}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Banner;