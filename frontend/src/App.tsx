import React from 'react';

const App: React.FC = () => {
  return (
  <div>
    <header className="header-area">
        <div className="navbar-area navbar-one navbar-transparent">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg">
                            <a className="navbar-brand" href="#">
                                {/* <img src="assets/images/logo.svg" alt="Logo"></img> */}
                            </a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarOne" aria-controls="navbarOne" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="toggler-icon"></span>
                                <span className="toggler-icon"></span>
                                <span className="toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse sub-menu-bar" id="navbarOne">
                                <ul className="navbar-nav m-auto">
                                    <li className="nav-item active">
                                        <a className="page-scroll" href="#home">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#about">Our Principles</a>
                                    </li>                                    
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#pricing">Our Studies</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#who">Who we are</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="page-scroll" href="#contact">Contact</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="navbar-btn d-none d-sm-inline-block">
                                <ul>
                                    <li><a className="light" href="http://bit.ly/CFLdocs" target="_blank">DOCUMENTATION AND CODES</a></li>
                                </ul>
                            </div>
                        </nav> 
                    </div>
                </div> 
            </div> 
        </div>

        <div id="home" className="header-content-area d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="header-wrapper">
                            <div className="header-content">
                                <h3 className="header-title">Consumer Finance Link</h3>
                                <p className="text">We help researchers safely qualify participants for surveys based on verified financial data.</p>
                                <div className="header-btn rounded-buttons">
                                    <a className="main-btn rounded-one" href="/studies/study?studyname=1&participantId=1234&studyId=5678&assignmentId=9012">See a sample study</a>
                                </div>
                                
                            </div> 

                            <div className="header-image d-none d-lg-block">
                                <div className="image">
                                    <img src="assets/images/header.png" alt="Header"></img>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> 
            </div> 
            <div className="header-shape">
                <img src="assets/images/header-shape.svg" alt="shape"></img>
            </div> 
        </div> 
    </header>    

    <section id="features" className="features-area pt-60 pb-100">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-7 col-sm-9">
                    <div className="single-features text-center mt-40">
                        <div className="features-icon">
                            <i className="lni-target-audience"></i>                            
                        </div>
                        <div className="features-content">
                            <h4 className="features-title"><a href="#">Researchers</a></h4>
                            <p className="text">Ever wanted to know the claims made by survey respondents about their finances are true? For example, do they have student loans, or use Uber twice a month?</p>
                            {/* <div className="features-btn rounded-buttons">
                                <a className="main-btn rounded-one" href="#">KNOW MORE</a>
                            </div> */}
                        </div>
                    </div> 
                </div>
                <div className="col-lg-4 col-md-7 col-sm-9">
                    <div className="single-features text-center mt-40">
                        <div className="features-icon">
                            <i className="lni-user"></i>                            
                        </div>
                        <div className="features-content">
                            <h4 className="features-title"><a href="#">Survey Takers</a></h4>
                            <p className="text">Would you like to get paid more for your survey responses by <i>safely</i> and <i>anonymously</i> verifying eligibility information?</p>
                            {/* <div className="features-btn rounded-buttons">
                                <a className="main-btn rounded-one" href="#">KNOW MORE</a>
                            </div> */}
                        </div>
                    </div> 
                </div>
                <div className="col-lg-4 col-md-7 col-sm-9">
                    <div className="single-features text-center mt-40">
                        <div className="features-icon">
                            <i className="lni-emoji-cool"></i>                            
                        </div>
                        <div className="features-content">
                            <h4 className="features-title"><a href="#">The CFL (us)</a></h4>
                            <p className="text">We offer an open-source application that uses a trusted third-party to verify the eligbility of survey participants based on information contained in financial accounts.</p>
                            {/* <div className="features-btn rounded-buttons">
                                <a className="main-btn rounded-one" href="#">KNOW MORE</a>
                            </div> */}
                        </div>
                    </div> 
                </div>
            </div> 
        </div> 
    </section>

    <section id="about" className="about-area pt-70 pb-100">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="about-feature mt-30">
                        <div className="about-feature-image">
                            <img src="assets/images/about.png" alt="feature"></img>
                        </div>
                        <div className="about-feature-content">
                            <h2 className="feature-title">Our principles</h2>
                            <p className="text">
We employ several measures to protect privacy while facilitating a seamless and secure process of reading financial data to survey responses. Here are the key privacy protection:</p>
                        </div>
                    </div> 
                </div>
                <div className="col-lg-6">
                    <div className="about-feature-items d-sm-flex mt-30">
                        <div className="feature-items-icon">
                            <img src="assets/images/feature-icon-1.png" alt="Icon"></img>
                        </div>
                        <div className="feature-items-content media-body">
                            <h5 className="items-title">Transparency</h5>
                            <p className="text">Our codes and methodology are provided our <a href="http://bit.ly/CFLdocs" target="_blank"><u>docs</u></a>. </p>
                        </div>
                    </div> 
                    <div className="about-feature-items d-sm-flex mt-30">
                        <div className="feature-items-icon">
                            <img src="assets/images/feature-icon-2.png" alt="Icon"></img>
                        </div>
                        <div className="feature-items-content media-body">
                            <h5 className="items-title">Trusted Third-Party Intermediary</h5>
                            <p className="text">We never obtain sensitive information (usernames, or passwords). Plaid acts as a secure channel to establish a connection between CFL and participants' financial institutions. In many cases (e.g., when OAuth is used), participants authenticate directly with their financial institutions. Plaid doesn't see credentials either.</p>
                        </div>
                    </div> 
                    <div className="about-feature-items d-sm-flex mt-30">
                        <div className="feature-items-icon">
                            <img src="assets/images/feature-icon-3.png" alt="Icon"></img>
                        </div>
                        <div className="feature-items-content media-body">
                            <h5 className="items-title">We save (nearly) nothing.</h5>
                            <p className="text">As we never get credentials, we can't save them. But we also don't save any sensitive data, like access tokens, reducing the risk of unauthorized access.</p>
                        </div>
                    </div> 
                    <div className="about-feature-items d-sm-flex mt-30">
                        <div className="feature-items-icon">
                            <img src="assets/images/feature-icon-4.png" alt="Icon"></img>
                        </div>
                        <div className="feature-items-content media-body">
                            <h5 className="items-title">One study at a time</h5>
                            <p className="text">We don't store access tokens, or unique financial information. No participant response can be associated across multiple studies.</p>
                        </div>
                    </div> 
                </div>
            </div> 
        </div> 
    </section>


        <section id="pricing" className="pricing-area pt-95 pb-100">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section-title text-center pb-20">
                        <h4 className="title">Our available studies</h4>
                        <p className="text">We have some studies that you can take to explore how CFL and fintech apps works. All are in sandbox environment, which means that you can't use real bank accounts to log in.</p>
                    </div>
                </div>
            </div>
            
            <div className="row justify-content-center">                
                <div className="col-lg-4 col-md-7 col-sm-9">
                    <div className="pricing mt-40">
                        <div className="pricing-baloon">
                            {/* <img src="assets/images/baloon.svg" alt="baloon"></img> */}
                        </div>
                        <div className="pricing-header">
                            <h5 className="sub-title">Verification: Transactions</h5>                            
                            <p className="year"><br/><u>Recent</u> Uber customer:</p>
                        </div>
                        <div className="pricing-list">
                            <ul>
                                <li><i className="lni-check-mark-circle"></i> Paid Uber <b>1x</b> or more</li> 
                                <li><i className="lni-check-mark-circle"></i> In your last <b>5</b> transactions</li>
                                <li><i className="lni-check-mark-circle"></i> Using a single financial account (debit/credit).</li>                               
                            </ul>
                        </div>
                        <div className="pricing-btn rounded-buttons text-center">
                            <a className="main-btn rounded-one" href="/studies/study?studyname=1&participantId=1234&studyId=5678&assignmentId=9012">GET STARTED</a>
                        </div>                        
                    </div> 
                </div>     
                         
                <div className="col-lg-4 col-md-7 col-sm-9">
                    <div className="pricing mt-40">
                        <div className="pricing-baloon">
                            {/* <img src="assets/images/baloon.svg" alt="baloon"></img> */}
                        </div>
                        <div className="pricing-header">
                            <h5 className="sub-title">Verification: Account Type</h5>                            
                            <p className="year"><br/>Student debt holder:</p>
                        </div>
                        <div className="pricing-list">
                            <ul>
                            <li><i className="lni-check-mark-circle"></i> Have a <b>student loan account</b></li>
                            <li><i className="lni-check-mark-circle"></i> The account has <b>at least $5000</b> in outstanding balance.</li>                             
                            </ul>
                        </div>
                        <div className="pricing-btn rounded-buttons text-center">
                            <a className="main-btn rounded-one" href="/studies/study?studyname=2&participantId=1234&studyId=5678&assignmentId=9012">GET STARTED</a>                       
                       </div>                        
                    </div> 
                </div>          

                <div className="col-lg-4 col-md-7 col-sm-9">
                    <div className="pricing mt-40">
                        <div className="pricing-baloon">
                            {/* <img src="assets/images/baloon.svg" alt="baloon"></img> */}
                        </div>
                        <div className="pricing-header">
                            <h5 className="sub-title">Verification: Transactions</h5>                            
                            <p className="year"><br/><u>Frequent</u> Uber customer:</p>
                        </div>
                        <div className="pricing-list">
                            <ul>
                                <li><i className="lni-check-mark-circle"></i> Paid Uber <b>3x</b> or more</li> 
                                <li><i className="lni-check-mark-circle"></i> In your last <b>20</b> transactions</li>
                                <li><i className="lni-check-mark-circle"></i> Using a single financial account (debit/credit).</li>                               
                            </ul>
                        </div>
                        <div className="pricing-btn rounded-buttons text-center">
                            <a className="main-btn rounded-one" href="/studies/study?studyname=3&participantId=1234&studyId=5678&assignmentId=9012">GET STARTED</a>                       
                        </div>                        
                    </div> 
                </div>

            </div> 
        </div> 
    </section>

    <section id="who" className="testimonial-area pt-95 pb-100">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="section-title text-center pb-20">
                        <h4 className="title">Who are we</h4>
                        <p className="text">We're anonymous researchers interested in consumer finance, fintech, privacy and regulation.</p>
                    </div>
                </div>
            </div> 
            
            <div className="row testimonial-active">
                <div className="col-lg-6">
                    <div className="single-testimonial mt-30">
                        <div className="testimonial-author d-sm-flex align-items-center">
                            <div className="author-image">
                                <img src="assets/images/author-1.jpg" alt="Author"></img>
                            </div>
                            <div className="author-name media-body">
                                <h6 className="name">John McClane</h6>
                                <span className="sub-title">Author 1</span>
                            </div>
                        </div>
                        <div className="testimonial-text">
                            <p className="text">Obviously, not the real author 1.</p>
                        </div>
                    </div> 
                </div>
                <div className="col-lg-6">
                    <div className="single-testimonial mt-30">
                        <div className="testimonial-author d-sm-flex align-items-center">
                            <div className="author-image">
                                <img src="assets/images/author-2.jpg" alt="Author"></img>
                            </div>
                            <div className="author-name media-body">
                                <h6 className="name">Holly Gennaro</h6>
                                <span className="sub-title">Author 2</span>
                            </div>
                        </div>
                        <div className="testimonial-text">
                            <p className="text">Also not the real author 2.</p>
                        </div>
                    </div> 
                </div>
                <div className="col-lg-6">
                    <div className="single-testimonial mt-30">
                        <div className="testimonial-author d-sm-flex align-items-center">
                            <div className="author-image">
                                <img src="assets/images/author-3.jpg" alt="Author"></img>
                            </div>
                            <div className="author-name media-body">
                                <h6 className="name">Hans Gruber</h6>
                                <span className="sub-title">Author 3</span>
                            </div>
                        </div>
                        <div className="testimonial-text">
                            <p className="text">Or real author 3.</p>
                        </div>
                    </div> 
                </div>
            </div> 
        </div> 
    </section>
    

    <footer id="footer" className="footer-area"> 

      
        <div className="footer-copyright">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="copyright text-center">
                            <p className="text">Template Crafted by <a rel="nofollow" href="https://uideck.com">UIdeck</a> - UI Powered by <a rel="nofollow" href="https://rebrand.ly/ayroui">AyroUI</a></p>
                        </div>
                    </div>
                </div> 
            </div>
        </div> 
    </footer>


    <a href="#" className="back-to-top"><i className="lni-chevron-up"></i></a>

    <script src="assets/js/vendor/modernizr-3.6.0.min.js"></script>
    <script src="assets/js/vendor/jquery-1.12.4.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/imagesloaded.pkgd.min.js"></script>
    <script src="assets/js/jquery.easing.min.js"></script>
    <script src="assets/js/scrolling-nav.js"></script>
    <script src="assets/js/slick.min.js"></script>
    <script src="assets/js/main.js"></script>
  </div>
  );  
};

export default App;