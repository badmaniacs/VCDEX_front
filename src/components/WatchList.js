import { useEffect, useState } from "react"
import WatchListData from "./WatchListData"

const WatchList = ({target, lastdata, setTarget}) => {
    const [data,setData] = useState('')

    useEffect(()=>{
        const temp = Object.entries(lastdata)
        temp.pop()
        setData(temp)
    },[lastdata])

    if (!data) return <div>로딩...</div>;
    return (
        <div>
            <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {data.map((item)=>(
                    <WatchListData 
                    name={item[0]}
                    key={item[0]}
                    val={item[1]}
                    setTarget={setTarget}
                    target={target}
                    />
                ))}
            </ul>
        </div>
    )

}

export default WatchList