import About from "./About";
import Faq from "./Faq";
import assisImg from "../assets/assist.png"
import guideImg from "../assets/guide.jpg"
import genImg from "../assets/gear.jpg"

export default () => {
  return (
    <>
      <section className="home">
        <svg
          className="position-absolute top-0"
          width="262"
          height="160"
          viewBox="0 0 262 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ left: "6%" }}
        >
          <ellipse
            cx="131"
            cy="30.5"
            rx="131"
            ry="129.5"
            fill="white"
            fillOpacity=".03"
          ></ellipse>
        </svg>

        <div className="hero">
          <h1 className="heading">Where legal meets simple</h1>

          <div className="options">

            <a href="/assistance" className="box" id="assistance">
              <div className="title">Assistance</div>
                <img src={assisImg} alt="" />
              <div className="desc">
                Don't know what document you need? Ask here
              </div>
            </a>
            <a href="/guidance">
              <div className="box" id="document-assist">
                <div className="title">Guidance</div>
                <img src={guideImg} alt="" />
                <div className="desc">
                  Have doubt about existing document? Upload here
                </div>
              </div>
            </a>
            <a href="/generation">
              <div className="box" id="generator">
                <div className="title">Generation</div>
                <img src={genImg} alt="" srcset="" />
                <div className="desc">
                  Want to generate a document? Explore here
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      <About />
      <Faq />
    </>
  );
};
