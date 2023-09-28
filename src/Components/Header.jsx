export default ()=>{
    return(
        <div className="header">
        <header>
          <div className="logo">
            <img src="./assets/logo.png" alt="logo" />
          </div>

          <div className="nav-bar">
            <ul>
              <li><a href="#home" className="nav-btn">Home</a></li>
              {/* <li><a href="#upload" className="nav-btn">Upload</a></li> */}
              <li><a href="#about" className="nav-btn">About</a></li>
              <li><a href="#faq" className="nav-btn">Faq</a></li>
              <li><a href="#contact" className="nav-btn">Contact Us</a></li>
            </ul>
          </div>

        </header>
        </div>
    )
}