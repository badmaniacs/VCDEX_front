import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Popover } from '@headlessui/react'
import {
  MenuIcon,
} from '@heroicons/react/outline'

const Top = () => {

    const {Kakao} = window;
    const [nickname,setNickname] = useState('');
    const [islogin,setIslogin] = useState(false);
    const [id,setId] = useState('');

    useEffect(()=>{
        setId(localStorage.getItem("id"))
        setNickname(localStorage.getItem("nickname"))
        setIslogin(localStorage.getItem("islogin") ? true : false)
    },[])

    const LoginHandler = () => {
        Kakao.Auth.login({
            success: function (authObj) {
                console.log(authObj);
                Kakao.API.request({
                    url: '/v2/user/me',
                    success: (res) => {
                        setId(res.id);
                        setNickname(res.kakao_account.profile.nickname);
                        setIslogin(true);
                        localStorage.setItem("id",res.id);
                        localStorage.setItem("nickname",res.kakao_account.profile.nickname);
                        localStorage.setItem("islogin",true);
                    }
                })
            }
        })
    }
    const LogoutHandler = () => {
        Kakao.Auth.logout(()=>{
            alert('로그아웃 되었습니다');
            setId('');
            setNickname('');
            setIslogin(false);
            localStorage.clear();
        })
    }
    return (
        <>
         <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <h1>VCDEX</h1>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link to="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              VCDEX 알아보기
            </Link>
            <Link to="/chart" className="text-base font-medium text-gray-500 hover:text-gray-900">
              차트
            </Link>
            <Link to="/models" className="text-base font-medium text-gray-500 hover:text-gray-900">
              최저가
            </Link>

          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <p
             className={islogin ? "text-indigo-600 hover:text-indigo-500"
                    : "invisible"
            }
            >
                {nickname}님 안녕하세요
            </p>
            <p
              onClick={LoginHandler}
              className={islogin ? "invisible" : 
              "ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"}
            >
              카카오 로그인
            </p>
            <p
              onClick={LogoutHandler}
              className={islogin ? "ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            : "invisible"                        
            }
            >
              로그아웃
            </p>
          </div>
        </div>
      </div>
    </Popover>
    <main>
        <Outlet context={{nickname,id,islogin}}/>    
    </main> 
        </>
    )
}

export default Top