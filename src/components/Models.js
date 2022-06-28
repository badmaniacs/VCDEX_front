import {Link, Outlet} from 'react-router-dom';
import { useState } from 'react';

const Models = () => {

    const [target,setTarget] = useState('');

    const active = "w-full px-3 py-1 border-b border-gray-200 dark:border-gray-600 bg-blue-600 text-white"
    const inactive = "w-full px-3 py-1 border-b border-gray-200 dark:border-gray-600";
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
            <div className="grid grid-cols-4 gap-4 border border-gray-200">
                <div className="col-span-1 border border-gray-200">
        <ul >
            RTX 3060
            <li className={target==="rtx3060_asus"? active : inactive}>
                <Link to="/models/rtx3060_asus">RTX 3060 ASUS</Link>
            </li>
            <li className={target==="rtx3060_gigabyte"? active : inactive}>
                <Link to="/models/rtx3060_gigabyte">RTX 3060 GIGABYTE</Link>
            </li>
            <li className={target==="rtx3060_msi"? active : inactive}>
                <Link to="/models/rtx3060_msi">RTX 3060 MSI</Link>
            </li>
            <li className={target==="rtx3060_EMTEK"? active : inactive}>
                <Link to="/models/rtx3060_EMTEK">RTX 3060 EMTEK</Link>
            </li>
        </ul>
        <ul>
        RTX 3060 TI
        <li className={target==="rtx3060_ti_asus"? active : inactive}>
            <Link to="/models/rtx3060_ti_asus">RTX 3060 TI ASUS</Link>
        </li>
        <li className={target==="rtx3060_ti_gigabyte"? active : inactive}>
            <Link to="/models/rtx3060_ti_gigabyte">RTX 3060 TI GIGABYTE</Link>
        </li>
        <li className={target==="rtx3060_ti_msi"? active : inactive}>
            <Link to="/models/rtx3060_ti_msi">RTX 3060 TI MSI</Link>
        </li>
        <li className={target==="rtx3060_ti_EMTEK"? active : inactive}>
            <Link to="/models/rtx3060_ti_EMTEK">RTX 3060 TI EMTEK</Link>
        </li>
    </ul>
    <ul>
        RTX 3070
        <li className={target==="rtx3070_asus"? active : inactive}>
            <Link to="/models/rtx3070_asus">RTX 3070 ASUS</Link>
        </li>
        <li className={target==="rtx3070_gigabyte"? active : inactive}>
            <Link to="/models/rtx3070_gigabyte">RTX 3070 GIGABYTE</Link>
        </li>
        <li className={target==="rtx3070_msi"? active : inactive}>
            <Link to="/models/rtx3070_msi">RTX 3070 MSI</Link>
        </li>
        <li className={target==="rtx3070_EMTEK"? active : inactive}>
            <Link to="/models/rtx3070_EMTEK">RTX 3070 EMTEK</Link>
        </li>
    </ul>
    <ul>
        RTX 3070 TI
        <li className={target==="rtx3070_ti_asus"? active : inactive}>
            <Link to="/models/rtx3070_ti_asus">RTX 3070 TI ASUS</Link>
        </li>
        <li className={target==="rtx3070_ti_gigabyte"? active : inactive}>
            <Link to="/models/rtx3070_ti_gigabyte">RTX 3070 TI GIGABYTE</Link>
        </li>
        <li className={target==="rtx3070_ti_msi"? active : inactive}>
            <Link to="/models/rtx3070_ti_msi">RTX 3070 TI MSI</Link>
        </li>
        <li className={target==="rtx3070_ti_EMTEK"? active : inactive}>
            <Link to="/models/rtx3070_ti_EMTEK">RTX 3070 TI EMTEK</Link>
        </li>
    </ul>
    <ul>
        RTX 3080
        <li className={target==="rtx3080_asus"? active : inactive}>
            <Link to="/models/rtx3080_asus">RTX 3080 ASUS</Link>
        </li>
        <li className={target==="rtx3080_gigabyte"? active : inactive}>
            <Link to="/models/rtx3080_gigabyte">RTX 3080 GIGABYTE</Link>
        </li>
        <li className={target==="rtx3080_msi"? active : inactive}>
            <Link to="/models/rtx3080_msi">RTX 3080 MSI</Link>
        </li>
        <li className={target==="rtx3080_EMTEK"? active : inactive}>
            <Link to="/models/rtx3080_EMTEK">RTX 3080 EMTEK</Link>
        </li>
    </ul>
    </div>
    <div className='col-span-3'>
        <p className={target===''? 'font-bold':'hidden'}>모델을 선택해주세요</p>
    <Outlet context={{setTarget}}/>
    </div>
        </div>
        </div>
    )
}

export default Models;