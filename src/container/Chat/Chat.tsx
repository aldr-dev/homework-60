import Container from 'react-bootstrap/Container';
import ChatForm from '../../components/ChatForm/ChatForm';
import {useState} from 'react';
import Preloader from '../../components/Preloader/Preloader';

const url = 'http://146.185.154.90:8000/messages';

const Chat = () => {
  const [mainPreloader, setMainPreloader] = useState(false);
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
      <Preloader preloader={mainPreloader}/>
      <Container className="container-xxl">
        <h1>Приложение - чат</h1>
        <ChatForm
          url={url}
          preloader={preloader}
          error={error}
          handlePreloader={handlePreloader}
          handleError={handleError}/>
      </Container>
    </>

  );
};

export default Chat;