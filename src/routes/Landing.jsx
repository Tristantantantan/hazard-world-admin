import hazardLogo from '../assets/hazard-logo.png';
import Navbar from '../components/Navbar';

export const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="landing-section d-flex align-items-center justify-content-center text-center text-md-start">
        <div className="container">
          <div className="mx-auto mx-md-0 landing-content">
            <img
              src={hazardLogo}
              alt="Hazard World Logo"
              className="img-fluid mb-3 landing-logo"
            />

            <h4 className="my-3 landing-title">
              Nature&apos;s Fury. A Volcanologist&apos;s Journey
            </h4>

            <p className="landing-text">
              Venture through perilous regions in search of Mt. Thesaurus&apos;
              hidden treasure.
            </p>

            <div className="mt-3">
              <a
                href="https://drive.google.com/file/d/1h5u2DqtaJxYZsM2wjSgD_SJ37HsBrYyp/view?usp=drive_link"
                className="btn btn-primary landing-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-download me-2"></i>
                Download Game
              </a>
            </div>

            <ul className="list-unstyled d-flex flex-wrap justify-content-center justify-content-md-start mt-3 mb-0 landing-info">
              <li className="me-3"><span>Android</span></li>
              <li className="me-3"><span>APK</span></li>
              <li><span>335 MB</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
