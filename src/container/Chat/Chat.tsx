import Container from 'react-bootstrap/Container';
import ChatForm from '../../components/ChatForm/ChatForm';
import {useState} from 'react';
import Preloader from '../../components/Preloader/Preloader';
import MessageItem from '../../components/MessageItem/MessageItem';
import {PostProps} from '../../types';

const url = 'http://146.185.154.90:8000/messages';

const Chat = () => {
  const [posts, setPosts] = useState<PostProps[]>([{
    _id: '1', message: '1', datetime: '1', author: '1'
  }]);
  const [preloader, setPreloader] = useState(false);
  const [error, setError] = useState(false);

  const handlePreloader = (state: boolean) => {
    setPreloader(state);
  };

  const handleError = (state: boolean) => {
    setError(state);
  };


  return (
    <>
      <Preloader preloader={preloader}/>
      <Container className="container-xxl mb-5 mt-5">
        <h1>Приложение - чат</h1>
        <MessageItem posts={posts}/>
        <ChatForm url={url} />
      </Container>
    </>
  );
};

export default Chat;