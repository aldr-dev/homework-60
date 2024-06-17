import React from 'react';
import DateFormat from '../DateFormat/DateFormat';
import {PostProps} from '../../types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import './MessageItem.css';

interface Props {
  posts: PostProps[];
}

const MessageItem: React.FC<Props> = ({posts}) => {
  return (
    <>
      {posts.length > 0 ? (
        <Row className="chat-box mb-3">
          {posts.map((post) => (
            <Card className="message bg-body-secondary">
              <span><b>Автор:</b> {post.author}</span>
                <div className="message-and-time-inner">
                <span><b>Сообщение:</b> {post.message}</span>
                <span><DateFormat data={post.datetime}/></span>
              </div>
            </Card>
          ))}
        </Row>
      ): (<p>Вы не получили еще не одного сообщения :(</p>)}
    </>
  );
};

export default MessageItem;