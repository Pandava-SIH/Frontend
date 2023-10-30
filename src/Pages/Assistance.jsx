import axios from "axios"
import { useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

export default ()=>{
    const [msgs, setMsgs] = useState([]);
    const [spin, setSpin] = useState(false);
    const ref = useRef(null);
    const sendPrompt = async()=>{
        let prompt = ref.current.value;
        if(!prompt) return;
        ref.current.value = "";
        setSpin(true);
        setMsgs([...msgs, [prompt, 1]])
        msgs.push([prompt,1])
        axios.post("http://127.0.0.1:8000/chat_response/",{
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                prompt,
            }
        }).then(res=>{
            setMsgs([...msgs, [res.data["reply"], 0]])
            setSpin(false)
        }).catch(err=>{
            console.log(err);
            setSpin(false)
        })
    }

    return(
        <div className="assistance">
            {/* <a href="/" style={{margin: "auto"}}><h1>Assistance</h1></a> */}
            <div className="chatbox">
                {
                    msgs.map(text=><div className={text[1]? "bubble1": "bubble2"}>
                        <ReactMarkdown>{text[0]}</ReactMarkdown>
                    </div>)
                }
                {spin? <div className="load">Loading...</div>: ""}
            </div>
            <div id="userin">
                <input ref={ref} type="text" id="input" onKeyDown={(e)=>{
                    if (e.code === "Enter"){
                        sendPrompt()
                    }                 
                }}/>
                <button className="submit" onClick={sendPrompt}>Send</button>
            </div>
        </div>
    )
}