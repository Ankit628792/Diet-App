import { format } from 'timeago.js'
import { DeCipher } from '../../util';

var letters = ['B', 'C', 'D', 'E', 'F'];
const getRandomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * letters.length)]
    return color
}

const Message = ({ isUser, message }) => <div className={`${isUser ? 'ml-auto' : 'mr-auto'}`}>
    <p className={`text-xs mx-2 font-medium ${isUser ? 'text-right' : 'text-left'}`}>{message?.sender.name || message.name}</p>
    <div key={message.createdAt + Math.random()} className={`py-2 px-4 rounded-2xl max-w-max w-96 ${isUser ? 'bg-sky-50' : 'bg-emerald-50'}`}>
        <p className=' text-base break-words'>{DeCipher(message?.content)}</p>
        <p className={`text-xs text-gray-400 truncate w-full mt-2 ${isUser ? 'text-right' : 'text-left'}`}>{format(message?.createdAt)}</p>
    </div>
</div>

export default Message