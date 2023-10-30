import { useRef, useState } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import ReactMarkdown from "react-markdown";

export default () => {
  const [imgs, setImgs] = useState([]);
  const [src, setSrc] = useState("#");
  const [msgs, setMsgs] = useState([]);
  const [spin, setSpin] = useState(false);
  const ref = useRef(null);

  const sendPrompt = async () => {
    let prompt = ref.current.value;
    if (!prompt) return;
    ref.current.value = "";
    setSpin(true);
    setMsgs([...msgs, [prompt, 1]]);
    msgs.push([prompt, 1]);
    axios
      .post("http://127.0.0.1:8000/chat_response/", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          prompt,
        },
      })
      .then((res) => {
        setMsgs([...msgs, [res.data["reply"], 0]]);
        setSpin(false);
      })
      .catch((err) => {
        console.log(err);
        setSpin(false);
      });
  };

  return (
    <div className="guidance">
      {/* <h1 className="guidance">Guidance</h1> */}
      <div className="container">
        <div className="area">
          <div className="files">
            {imgs.map((i, j) => (
              <div
                className="filename"
                key={j}
                onClick={(e) => {
                  let url = URL.createObjectURL(i);
                  setSrc(url);
                  setSpin(true);
                  const documents = [];
                  Tesseract.recognize(url, "eng", {
                    logger: (m) => console.log(m),
                  })
                    .then(({ data: { text } }) => {
                      documents.push(text);
                      axios
                        .post("http://127.0.0.1:8000/load_documents/", {
                          headers: {
                            "Content-Type": "application/json",
                          },
                          data: {
                            documents,
                          },
                        })
                        .then((res) => {
                          setMsgs([...msgs, [res.data["summary"], 0]]);
                          setSpin(false);
                        })
                        .catch((err) => {
                          setSpin(false);
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                      setSpin(false);
                    });
                }}
              >
                {i.name}
              </div>
            ))}
          </div>
          <label htmlFor="inp" className="upload">
            Upload
          </label>
          <input
            id="inp"
            type="file"
            name="inp"
            title="Upload"
            onChange={(e) => {
              setImgs([...e.target.files]);
            }}
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="area">
          <img src={src} alt="" width="100%" />
        </div>
        <div className="area">
          <div className="chatbox">
            {msgs.map((text) => (
              <div className={text[1] ? "bubble1" : "bubble2"}>
                <ReactMarkdown>{text[0]}</ReactMarkdown>
              </div>
            ))}
            {spin ? <div className="load">Generating...</div> : ""}
          </div>
          <div id="userin">
            <input
              ref={ref}
              type="text"
              id="input"
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  sendPrompt();
                }
              }}
            />
            <button className="submit" onClick={sendPrompt}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
