import Container from 'react-bootstrap/Container';
import ChatForm from '../../components/ChatForm/ChatForm';

const url = 'http://146.185.154.90:8000/messages';

const Chat = () => {
  return (
    <Container className="container-xxl">
      <h1>Приложение - чат</h1>
      <ChatForm url={url}/>
    </Container>
  );
};

export default Chat;