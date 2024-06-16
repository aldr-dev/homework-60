import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import {FormProps} from '../../types';

interface Props {
  url: string;
}

const ChatForm: React.FC<Props> = ({url}) => {
  const [chatMessage, setChatMessage] = useState<FormProps>({
    name: '',
    message: '',
  });

  const sendRequest =  async () => {
    const body = new URLSearchParams();
    body.append('author', chatMessage.name);
    body.append('message', chatMessage.message);
    try {
      await fetch(url,  {method: 'POST', body});
    } catch (error) {
      console.error('Произошла ошибка при отправке данных, попробуйте позже.' + error);
    }
  };

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
    <Form onSubmit={onFormSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="fw-bold">Автор:</Form.Label>
        <Form.Control value={chatMessage.name} onChange={onFieldChange} name="name" type="text" required placeholder="Ваше имя"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="fw-bold">Сообщение:</Form.Label>
        <Form.Control value={chatMessage.message} onChange={onFieldChange} name="message" as="textarea" rows={3} required placeholder="Введите Ваше сообщение..."/>
      </Form.Group>
      <Button variant="primary" type="submit">Отправить</Button>
    </Form>
  );
};

export default ChatForm;