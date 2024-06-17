import './MessageItem.css';

const MessageItem = () => {
  return (
    <div className="chat-box mb-3">
      <div className="message">
        <span><b>Автор:</b></span>
        <div className="message-and-time-inner">
          <span><b>Сообщение:</b></span>
          <span>Время</span>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;