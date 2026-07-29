import React from 'react';
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn(){
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-5 py-2 text-sm font-medium text-red-500 duration-150 hover:text-white hover:bg-red-500 rounded-full'
    onClick={logoutHandler}>Logout</button>
  );
}

export default LogoutBtn;