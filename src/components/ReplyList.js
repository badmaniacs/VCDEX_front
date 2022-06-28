import { useState, useRef, useEffect } from "react"
import axios from "axios";
import ReplyListData from "./ReplyListData";

const ReplyList = ({target,id,nickname,islogin}) => {
    const targeName = {
        "vcdex" : "vcdex",
        "eth_krw" : "이더리움",
        "won_dollar_exrate" : "원/달러 환율",
        "rtx3060_price" : "rtx3060 평균가",
        "rtx3060_ti_price" : "rtx3060ti 평균가",
        "rtx3070_price" : "rtx3070 평균가",
        "rtx3070_ti_price" : "rtx3070ti 평균가",
        "rtx3080_price" : "rtx3080 평균가"
    }

    const [content,setContent] = useState('');
    const [imidiot,setImidiot] = useState(0);

    const [replylist,setReplyList] = useState([]);

    const contentHandler = (e) => {
        setContent(e.target.value)
    }

    const contentTarea = useRef();
    
    const addReply = () => {
        if(!islogin){
            alert('댓글 작성은 로그인 후 가능합니다');
            return
        }
        if(!content){
            alert('내용을 입력하세요');
            contentTarea.current.focus();
            return
        }
        const body = {
            id : id,
            nickname : nickname,
            content : content,
            item : target
        }
        axios.post('/api/reply/add',body)
        .then((res)=>{
            if(res.data===1){
                contentTarea.current.value = "";
                setContent('');
                setImidiot(imidiot+1);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=> {
        const body = {
            item : target
        }
        axios.post("/api/reply/list", body)
        .then((res)=>{
            setReplyList(res.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[target,imidiot])
    return(
        <div>
            <h1>{targeName[target] ? targeName[target] : target}에 대한 토론 : {replylist.length}건</h1>
            <hr/>
            <div className="grid grid-cols-9">
            <textarea className="col-span-8 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="내용을 입력해주세요" onChange={contentHandler} ref={contentTarea}></textarea>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={addReply}>댓글 달기</button>
            </div>
            <hr/>
            <ul>
                {replylist.map((item)=>(
                    <ReplyListData
                    key={item.writedate}
                    id={item.id}
                    nickname={item.nickname}
                    content={item.content}
                    writedate={item.writedate}
                    logid={id}
                    imidiot={imidiot}
                    setImidiot={setImidiot}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ReplyList;