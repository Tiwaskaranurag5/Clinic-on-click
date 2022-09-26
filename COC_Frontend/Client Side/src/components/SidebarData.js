import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
    {
        title:'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title:'Dashboard',
        path: '/dashboard',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title:'Blood',
        path: '/blood',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title:'Covid',
        path: '/covid',
        icon: <AiIcons.AiFillAmazonCircle />,
        cName: 'nav-text'
    },
    {
        title:'Settings',
        path: '/setting',
        icon: <AiIcons.AiFillSetting />,
        cName: 'nav-text'
    },
    {
        title:'Logout',
        path: '/logout  ',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    },
]