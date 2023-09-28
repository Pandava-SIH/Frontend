import About from "./About";
import Faq from "./Faq";
import Header from "./Header";

export default () => {
  return (
    <>
      <section className="home">
        <Header />
        <div className="hero">
          <div className="title">
            <h1>Where legal meets simple</h1>
            <h2>
              {" "}
              We are here to fill in for your lawyer. Tell us your legal problem
              and fret no more.
            </h2>
          </div>

          <div className="options">
            <a href="/assistance" className="box" id="assistance">
              <div className="title">Assistance</div>
              <div className="desc">
                Don't know what document you need? Ask here
              </div>
            </a>
            <a href="/guidance">
              <div className="box" id="document-assist">
                <div className="title">Guidance</div>
                <div className="desc">
                  Have doubt about existing document? Upload here
                </div>
              </div>
            </a>
            <a href="/generation"><div className="box" id="generator">
              <div className="title">Generation</div>
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
