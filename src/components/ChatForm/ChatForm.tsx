import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import React, {useState} from 'react';
import {FormProps} from '../../types';
import {Col} from 'react-bootstrap';
import './ChatForm.css';

interface Props {
  url: string;
}

const ChatForm: React.FC<Props> = ({url}) => {
  const [chatMessage, setChatMessage] = useState<FormProps>({
    name: '',
    message: '',
  });

  const [preloader, setPreloader] = useState(false);
  const [error, setError] = useState(false);


  const sendRequest =  async () => {
    const data = new URLSearchParams();
    data.set('message', chatMessage.message);
    data.set('author', chatMessage.name);
    try {
      setPreloader(true);
      const response = await fetch(url, {method: 'post', body: data,});
      setPreloader(false);

      if (!response.ok) {
        setError(true);
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

    } catch (error) {
      setError(true);
      setPreloader(false);
      console.error('Произошла ошибка при отправке данных, попробуйте позже. ' + error);
    }
  };

  let preloaderStatus = null;

  if (preloader) {
    preloaderStatus = (
      <Spinner className="ms-3" animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  let errorStatus = null;

  if (error) {
    errorStatus = (
      <Toast className="bg-danger custom-position" onClose={() => setError(false)}>
        <Toast.Header>
          <strong className="me-auto">Ошибка</strong>
        </Toast.Header>
        <Toast.Body className="text-white">Произошла ошибка при отправке данных, попробуйте позже.</Toast.Body>
      </Toast>
    );
  }

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setChatMessage((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
    });
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (chatMessage.name !== '' && chatMessage.message !== '') {
     void sendRequest();
     setChatMessage({
       name: '',
       message: '',
     });
    }
  };

  return (
    <>
      {errorStatus}
      <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="fw-bold">Автор:</Form.Label>
          <Form.Control value={chatMessage.name} onChange={onFieldChange} name="name" type="text" required placeholder="Ваше имя"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Сообщение:</Form.Label>
          <Form.Control value={chatMessage.message} onChange={onFieldChange} name="message" as="textarea" rows={3} required placeholder="Введите Ваше сообщение..."/>
        </Form.Group>

        <Row>
          <Col className="d-flex align-items-center">
            <Button variant="primary" type="submit">Отправить</Button>
            {preloaderStatus}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ChatForm;