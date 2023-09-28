import { useRef, useState } from "react";
import axios from "axios"


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
      <h1 className="guidance">Guidance</h1>
      <div className="container">
        <div className="area">
          <div className="files">
            {imgs.map((i, j) => (
              <div
                className="filename"
                key={j}
                onClick={(e) => {
                  setSrc(URL.createObjectURL(i));
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
            multiple
            title="Upload"
            onChange={(e) => {
              setImgs([...e.target.files]);
            }}
          />
        </div>
        <div className="area">
          <img src={src} alt="" width="100%" />
        </div>
        <div className="area">
          <div className="chatbox">
            {msgs.map((text) => (
              <div className={text[1] ? "bubble1" : "bubble2"}>{text[0]}</div>
            ))}
            {spin ? <div className="load">Loading...</div> : ""}
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
