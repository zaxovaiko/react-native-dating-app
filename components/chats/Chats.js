import React, {useState} from 'react';
import ChatList from './ChatList';
import Chat from './Chat';

const defaultUsers = [
  {
    uid: '9VmRuT5V2ecdCJ33RshsgL1mGDp2',
    name: 'Volodymyr',
    img:
      'https://s.gravatar.com/avatar/e5cc05941a338a9d196eb3564093cacb?s=550&r=x&d=identicon',
  },
  {
    uid: 'ju8EjJsvciaml9fXY7kCo5XEHQx2',
    name: 'Anna Marie',
    img:
      'https://s.gravatar.com/avatar/01e703a0547344e2a1e2ea48e46f9e0a?s=550&r=x&d=identicon',
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
