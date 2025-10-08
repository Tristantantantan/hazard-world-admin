import hazardLogo from '../assets/hazard-logo.png';
import Navbar from '../components/Navbar';

export const Landing = () => {
    return (
        <>
            <Navbar />
            <div className="full-screen-bg">
                <div className="container">
                    <div className="w-50">
                        <img src={hazardLogo} alt="Logo" width="100" height="20" />
                        {/* <h1>Hazard World</h1> */}
                        <h4 className='my-4'>Nature&apos;s Fury. A Volcanologist&apos;s Journey</h4>
                        <span>Venture through perilous regions in search of Mt. Thesaurus&apos; hidden treasure.</span>
                        <div className="mt-4">
                            <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1h5u2DqtaJxYZsM2wjSgD_SJ37HsBrYyp%2Fview%3Fusp%3Ddrive_link%26fbclid%3DIwZXh0bgNhZW0CMTAAAR3hUkJa8Ctjp78FzXokmc-_TsUUBy2NNmVPOVyQvJdGhdFvx1oEJWLb2y8_aem_vKUfQmnytakCk8l679uu7Q&h=AT37g4kcAnVWDcceqy5jHuFKuN07mBLnu4yFPLVxWlgbr12n9R-Qt5fLM0qzg7_IvXJL-HsPLlBdkP39nyfGemyqg4Y_BvPDF17PxsRL-jm8NlAvAomLhzkJ2aiA0CjP6R8jdA" className="btn btn-primary">
                                <i className="bi bi-download me-2"></i>
                                Download Game
                            </a>
                        </div>
                        <div className="d-flex mt-2">
                            <li className="me-4">
                                <span>Android</span>
                            </li>
                            <li className="me-4">
                                <span>APK</span>
                            </li>
                            <li className="me-4">
                                <span>335 MB</span>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}