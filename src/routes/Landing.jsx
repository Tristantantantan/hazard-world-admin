import hazardLogo from '../assets/hazard-logo.png';
import Navbar from '../components/Navbar';

export const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="full-screen-bg d-flex align-items-center justify-content-center text-center text-md-start px-3 px-md-5">
        <div className="container">
          <div className="mx-auto mx-md-0" style={{ maxWidth: '180px' }}>
            <img
              src={hazardLogo}
              alt="Hazard World Logo"
              className="img-fluid mb-3"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <h4 className="my-3 fw-semibold">
              Nature&apos;s Fury. A Volcanologist&apos;s Journey
            </h4>
            <p className="mb-4">
              Venture through perilous regions in search of Mt. Thesaurus&apos; hidden treasure.
            </p>

            <a
              href="https://l.facebook.com/l.php?u=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1h5u2DqtaJxYZsM2wjSgD_SJ37HsBrYyp%2Fview%3Fusp%3Ddrive_link%26fbclid%3DIwZXh0bgNhZW0CMTAAAR3hUkJa8Ctjp78FzXokmc-_TsUUBy2NNmVPOVyQvJdGhdFvx1oEJWLb2y8_aem_vKUfQmnytakCk8l679uu7Q&h=AT37g4kcAnVWDcceqy5jHuFKuN07mBLnu4yFPLVxWlgbr12n9R-Qt5fLM0qzg7_IvXJL-HsPLlBdkP39nyfGemyqg4Y_BvPDF17PxsRL-jm8NlAvAomLhzkJ2aiA0CjP6R8jdA"
              className="btn btn-primary btn-lg w-100 w-md-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-download me-2"></i>
              Download Game
            </a>

            <ul className="list-unstyled d-flex flex-wrap justify-content-center justify-content-md-start mt-3 mb-0">
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
