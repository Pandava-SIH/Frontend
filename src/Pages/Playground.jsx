import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../assets/playground.css";
import ReactMarkdown from "react-markdown";

export default ({ format }) => {
  const [msgs, setMsgs] = useState([["Hi! How can I help you?", 0]]);
  const [spin, setSpin] = useState(false);
  const [form, setForm] = useState("");
  const ref = useRef();

  const sendPrompt = async () => {
    let prompt = ref.current.value;
    if (!prompt) return;
    ref.current.value = "";
    setSpin(true);
    setMsgs([...msgs, [prompt, 1]]);
    msgs.push([prompt, 1]);
    axios
      .post("http://127.0.0.1:8000/format_response/", {
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

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/fetch_format/", {
        data: {
          format,
        },
      })
      .then((res) => {
        setForm(res.data["format"]);
      });
  }, []);
  return (
    <div className="playground">
      <div className="doc_view">
        <ReactMarkdown>{form}</ReactMarkdown>
      </div>
      <div className="chat">
        <div className="chatbox" style={{height: "85vh"}}>
          {msgs.map((text) => (
            <div className={text[1] ? "bubble1" : "bubble2"}>
              <ReactMarkdown>{text[0]}</ReactMarkdown>
            </div>
          ))}
          {spin ? <div className="load">Generating...</div> : ""}
        </div>
        <div id="userin" >
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
  );
};
