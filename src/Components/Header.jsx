export default ()=>{
    return(
        <div className="header">
        <header>
          <div className="logo">
            <img src="./assets/logo.png" alt="logo" />
          </div>

          <ul>
              <li className="nav-list"><a href="#home" className="nav-btn">Home</a></li>
              {/* <li><a href="#upload" className="nav-btn">Upload</a></li> */}
              <li className="nav-list"><a href="#about" className="nav-btn">About</a></li>
              <li className="nav-list"><a href="#faq" className="nav-btn">Faq</a></li>
              <li className="nav-list"><a href="#contact" className="nav-btn">Contact Us</a></li>
          </ul>

        </header>
        </div>
    )
}