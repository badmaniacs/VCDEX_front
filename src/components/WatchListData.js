const WatchListData = ({target, name,val,setTarget}) => {
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
    const changeChart = () => {
        setTarget(name)
    }
    return(
        <li className={target===name ? "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 grid grid-cols-4 bg-blue-600 text-white" : "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 grid grid-cols-4"} onClick={changeChart}>
            <b className="col-span-3">{targeName[name] ? targeName[name] : name}   </b>
            <b className="col-span-1">{val}  </b>
        </li>

    )

}

export default WatchListData;