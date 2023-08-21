import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment, updateComment,   } from '../redux/actions';
import { AiOutlineComment } from 'react-icons/ai';
import { BiCommentX, BiSend } from 'react-icons/bi';

const AddComment = ({ userId, productId }) => {
  const [text, setText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(null); // Nuevo estado
  const [newEditText, setNewEditText] = useState(''); // Nuevo estado
  const dispatch = useDispatch();
  const allComments = useSelector((state) => state.comments);
  const allUsers = useSelector((state) => state.users); //Me traigo para agregar el nombre

  const comments = allComments ? allComments.filter((comment) => comment.productId === productId) : [];
  const parsedUserId = parseInt(userId, 10);



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(parsedUserId, productId, text));
    setText('');
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  return (
    <div>
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => setIsModalOpen(true)}
      >
        <AiOutlineComment className="w-6 h-6 inline-block" />Comentar
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => setIsModalOpen(false)}
            >
              <BiCommentX className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold mb-2">Comments</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p>
                    {/* Mostrar el nombre de usuario */}
                     {console.log('Current UserID:', userId)} 
                    {allUsers.find((user) => user.id === comment.userId)?.name || 'Unknown User'}: {comment.text}
                  </p>
                  {comment.userId === parsedUserId && (
                    
                    <div className="flex space-x-2">
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => setEditingComment(comment.id)}
                    >
                      Edit
                    </button>
                  </div>
                  )}
                  
                </li>
              ))}
            </ul>
            {editingComment !== null && (
  <div className="mb-2">
    <input
      type="text"
      className="w-full p-2 border rounded-md"
      value={newEditText}
      onChange={(e) => setNewEditText(e.target.value)}
    />
    <button
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      onClick={() => {
        dispatch(updateComment(editingComment, newEditText));
        setEditingComment(null);
        setNewEditText('');
      }}
    >
      Save
    </button>
    <button
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
      onClick={() => setEditingComment(null)}
    >
      Cancel
    </button>
  </div>
)}
{editingComment === null && (
  <form onSubmit={handleSubmit}>
    <textarea
      className="w-full p-2 border rounded-md mb-2"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Write a comment..."
    />
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      type="submit"
    >
      <BiSend className="w-6 h-6 inline-block"/>Enviar
    </button>
  </form>
)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddComment;
