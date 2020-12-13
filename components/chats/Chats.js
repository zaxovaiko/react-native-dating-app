import React, {useState} from 'react';
import ChatList from './ChatList';
import Chat from './Chat';

const defaultUsers = [
  {
    id: 1,
    name: 'Ann',
    img:
      'https://www.wallpaperup.com/uploads/wallpapers/2019/04/28/1321159/385b08992e91e605d2cb3d8b1aa0d8c4.jpg',
  },
  {
    id: 2,
    name: 'Sara',
    img:
      'https://www.wallpaperup.com/uploads/wallpapers/2019/04/28/1321159/385b08992e91e605d2cb3d8b1aa0d8c4.jpg',
  },
  {
    id: 3,
    name: 'Kate',
    img:
      'https://www.wallpaperup.com/uploads/wallpapers/2019/04/28/1321159/385b08992e91e605d2cb3d8b1aa0d8c4.jpg',
  },
  {
    id: 4,
    name: 'Liz',
    img:
      'https://www.wallpaperup.com/uploads/wallpapers/2019/04/28/1321159/385b08992e91e605d2cb3d8b1aa0d8c4.jpg',
  },
];
function Chats() {
  const [currentPage, setCurrentPage] = useState('users');
  const [users, setUsers] = useState(defaultUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const onClickUser = (user) => {
    setCurrentPage('chat');
    setSelectedUser(user);
  };

  const onBack = () => {
    setCurrentPage('users');
  };

  switch (currentPage) {
    case 'users':
      return <ChatList users={users} onClickUser={onClickUser} />;

    case 'chat':
      return <Chat selectedUser={selectedUser} onBack={onBack} />;

    default:
      break;
  }
}

export default Chats;
