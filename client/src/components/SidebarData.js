import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Add new',
    path: '/new',
    icon: <IoIcons.IoMdAddCircle/>,
    cName: 'nav-text'
  },
  {
    title: 'Operations',
    path: '/operations',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
];
