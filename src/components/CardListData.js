const CardListData = ({price, link}) => {

    const buy = () => {
        window.open(link);
    }
    return (
        <div className="col-span-3 border border-gray-200" >
            <b className="text-lg">{price}원</b>
            <br/>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={buy}>구매하러 가기</button>
        </div>
    )
}

export default CardListData;