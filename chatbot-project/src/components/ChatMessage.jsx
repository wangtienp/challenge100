import './ChatMessage.css'
import UserProfilePicture from '../assets/profile-1.jpg'
import RobotProfilePicture from '../assets/robot.png'
import dayjs from 'dayjs'
export function ChatMessage({ message, sender }) {
    const time = dayjs().valueOf()
    return (
        <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
            {sender === 'robot' && (
                <img src={RobotProfilePicture} className="chat-message-profile" />
            )}
            <div className="chat-message-text">
                <div>{message}</div>
                <div className='time-text'>{dayjs().format('h:mma')}</div>
            </div>
            {sender === 'user' && (
                <img src={UserProfilePicture} className="chat-message-profile" />
            )}
        </div>
    );
}