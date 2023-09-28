import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Fuse from "fuse.js"

export default ()=>{
    const ref = useRef(null)
    const [results, setResults] = useState([])
    let fuse;
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/fetch_title/").then(res=>{
            fuse = new Fuse(res.data["titles"])
        })
    })

    const search = (query)=>{
        let result = fuse.search(query);
        setResults(result);
    }
    console.log(results);
    return(
        <div className="generator">
            <div id="userin" style={{width: 800, marginTop: 20}}>
                <input ref={ref} type="text" id="input" onKeyDown={(e)=>{
                    if (e.code === "Enter"){
                        
                    }                 
                }}
                placeholder="What document you want"/>
                <button className="submit" onClick={()=>{search(ref.current.value)}}>search</button>
            </div>

            <div className="results">
                {
                    results.map((i,j)=>(<div className="result" key={j}>{i.item}</div>))
                }
            </div>
        </div>
    )
}