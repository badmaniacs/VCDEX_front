import axios from "axios";

const ReplyListData = ({id, nickname, content, writedate, logid, imidiot ,setImidiot}) =>{
    const replyDelete = () => {
        if(!window.confirm("정말로 삭제하시겠습니까?")){
            return;
        }
        const body = {
            writedate : writedate,
            id : logid
        }
        axios.post('/api/reply/delete',body)
        .then((res)=>{
            setImidiot(imidiot+1)
        })
    }

    return(
        <div className="border rounded-lg border-gray-300 grid grid-cols-4 grid-rows-auto">
            <div className="col-span-1">
                <p>{nickname}({id})</p>
            </div>
            <div className="row-start-2 col-span-3">
                <p>{content}</p>
            </div>
            <div className="col-start-4"> 
                <p>{writedate}</p>
            </div>
            <div className={logid===id ? "col-start-4 row-start-2" : "hidden"}>
                <p onClick={replyDelete}>삭제</p>
            </div>
        </div>
    )
}

export default ReplyListData;