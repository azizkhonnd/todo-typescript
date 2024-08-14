import { FaSave } from "react-icons/fa"; 
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Todo } from '../models/Todo';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    editTodo: (id: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
    const [editText, setEditText] = useState<string>('');
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
    };

    const handleEditClick = (todo: Todo) => {
        setEditingTodoId(todo.id);
        setEditText(todo.text);
    };

    const handleSave = (id: number) => {
        if (editText.trim()) {
            editTodo(id, editText);
            setEditingTodoId(null);
        }
    };

    const handleDeleteClick = (id: number) => {
        setTodoToDelete(id);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        if (todoToDelete !== null) {
            deleteTodo(todoToDelete);
            setTodoToDelete(null);
            setOpenDialog(false);
        }
    };

    const handleCancelDelete = () => {
        setTodoToDelete(null);
        setOpenDialog(false);
    };

    return (
        <div>
            <ul>
                {todos.map((todo) => (
                    <li className="edit__items" key={todo.id}>
                        {editingTodoId === todo.id ? (
                            <div className="save__wrapper">
                                <input
                                    className="edit__input" 
                                    type="text"
                                    value={editText}
                                    onChange={handleEditChange}
                                    placeholder="edit"
                                />
                                <button className="add__btn-edit" onClick={() => handleSave(todo.id)}>
                                    <FaSave size={16} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <span onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    {todo.text}
                                </span>
                                <button className="edit__btn" onClick={() => handleEditClick(todo)}>
                                    <AiFillEdit size={16} />
                                </button>
                                <button className="delete__btn" onClick={() => handleDeleteClick(todo.id)}>
                                    <AiFillDelete size={16} />
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                aria-labelledby="confirm-delete-title"
                aria-describedby="confirm-delete-description"
            >
                <DialogTitle id="confirm-delete-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography id="confirm-delete-description">
                        Are you sure you want to delete this task? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TodoList;
