import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useOutletContext } from "react-router-dom"
import CardListData from "../components/CardListData";

const Model = () => {
    const {name} = useParams();
    const [cardlist,setCardlist] = useState([]);
    const [carddata,setCarddata] = useState({
        clock : "",
        image : "",
        memory : "",
        memorybit : "",
        memoryspeed : "",
        memorytype : "",
        power : "",
    })
    const {setTarget} = useOutletContext();

    useEffect(()=>{
        setTarget(name);
        axios.get("/api/cardlist", {
            params: {
                name: name
            }
        })
        .then((res)=>{
            setCardlist(res.data);
        }
        )
        axios.get("/api/carddata", {
            params: {
                name: name
            }
        })
        .then((res)=>{
            console.log(res.data);
            setCarddata({
                clock : res.data.clock,
                image : res.data.image,
                memory : res.data.memory,
                memorybit : res.data.memorybit,
                memoryspeed : res.data.memoryspeed,
                memorytype : res.data.memorytype,
                power : res.data.power,
            })
        }
        )
    },[name])

    return (
        <div className="grid grid-cols-4 gap-4">
            <h1 className="col-span-4">모델 : {name}</h1>
                <div className="col-span-2 border border-gray-200">
                    <img className="w-80 h-80" src={carddata.image}/>
                </div>
                <div className="col-span-2 border border-gray-200">
                    <h1>제품정보</h1>
                    <p>클럭 : {carddata.clock}</p>
                    <p>메모리 : {carddata.memory}</p>
                    <p>메모리비트 : {carddata.memorybit}</p>
                    <p>메모리클럭 : {carddata.memoryspeed}</p>
                    <p>메모리타입 : {carddata.memorytype}</p>
                    <p>권장파워 : {carddata.power} 이상</p>
                </div>
            <div className="col-span-4">
                가격비교
            <ul>
                {cardlist.map((item)=>(
                    <CardListData
                    key={item.no}
                    price={item.price}
                    link={item.link}
                    />
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Model