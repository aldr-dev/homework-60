import Container from 'react-bootstrap/Container';
import ChatForm from '../../components/ChatForm/ChatForm';
import {useEffect, useState} from 'react';
import Preloader from '../../components/Preloader/Preloader';
import MessageItem from '../../components/MessageItem/MessageItem';
import {PostProps} from '../../types';
import Toast from 'react-bootstrap/Toast';
import './Chat.css';


const Chat = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [date, setDate] = useState('');
  const [preloader, setPreloader] = useState(false);
  const [error, setError] = useState(false);

  const url = 'http://146.185.154.90:8000/messages';
  const lastDate = `http://146.185.154.90:8000/messages?datetime=${date.length ? date : null}`;

  const handlePreloader = (state: boolean) => {
    setPreloader(state);
  };

  const handleError = (state: boolean) => {
    setError(state);
  };

  useEffect(() => {
    const dataFetch = async () => {
      try {
        handlePreloader(true);
        const response = await fetch(url);
        handlePreloader(false);
        if (!response.ok) {
          handleError(true);
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        const post: PostProps[] = await response.json();
        if (post.length > 0) {
          const formatPost = post.splice(-15);
          const date = formatPost[formatPost.length - 1].datetime;
          setDate(date);
          setPosts(formatPost);
        }
      } catch (error) {
        handleError(true);
        handlePreloader(false);
        console.error('К сожалению, не удалось получить список сообщений. Попробуйте позже. ' + error);
      }
    };

    void dataFetch();
  }, []);


  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(lastDate);
        if (!response.ok) {
          handleError(true);
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        const post: PostProps[] = await response.json();
        if (post.length > 0) {
          const latestDate = post[post.length - 1].datetime;
          setDate(latestDate);
          setPosts([...posts, ...post].splice(-15));
        }
      } catch (error) {
        handleError(true);
        console.error('К сожалению, не удалось получить список сообщений. Попробуйте позже. ' + error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [posts, lastDate]);


  let errorStatus = null;

  if (error) {
    errorStatus = (
      <Toast className="bg-danger custom-position" onClose={() => handleError(false)}>
        <Toast.Header>
          <strong className="me-auto">Ошибка</strong>
        </Toast.Header>
        <Toast.Body className="text-white">К сожалению, не удалось получить список сообщений. Попробуйте позже.</Toast.Body>
      </Toast>
    );
  }

  return (
    <>
      {errorStatus}
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