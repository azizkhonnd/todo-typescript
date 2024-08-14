import { BiAddToQueue } from "react-icons/bi";
import { useState } from "react";

interface TodoFormProps {
    addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [text, setText] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a todo"
                    className="input"
                />
                <button className="add__btn" type="submit"><BiAddToQueue size={16} />Add</button>
            </form>
        </div>
    );
};

export default TodoForm;
