import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteComment, updateComment } from '../redux/actions'
import { AiOutlineComment } from 'react-icons/ai'
import { BiCommentX, BiSend } from 'react-icons/bi'

const AddComment = ( { userId, productId } ) => {
  const dispatch = useDispatch()

  const [ text, setText ] = useState( '' )
  const [ editingComment, setEditingComment ] = useState( null )
  const [ newEditText, setNewEditText ] = useState( '' )

  const allComments = useSelector( state => state.comments )
  const allUsers = useSelector( state => state.users )

  const comments = allComments ? allComments.filter( comment => comment.productId === productId) : []
  const parsedUserId = parseInt( userId, 10 )

  const handleSubmit = ( e ) => {
    e.preventDefault()
    dispatch( addComment( parsedUserId, productId, text ) )
    setText( '' )
  }

  const handleDelete = ( commentId ) => {
    dispatch( deleteComment( commentId ) )
  }

  return(
    <>
      <h2 className="text-lg text-center font-semibold border-t border-[#33a1fd] pt-[10px]">Comentarios</h2>
            <ul>
              {comments.map( comment => (
                <li key={ comment.id }>
                  <div className='w-auto h-auto bg-[#81c5ff] rounded-full px-5 py-3 flex items-center gap-[10px]'>
                    <span className='w-[30px] h-[30px] bg-[#9c9c9c] rounded-full'></span>
                    <p className='text-[1.2rem]'>
                      <span className='text-[1.4rem] font-semibold'>{ allUsers.find( user => user.id === comment.userId )?.name || 'Usuario desconocido'}</span> ▸ { comment.text }
                    </p>

                    {comment.userId === parsedUserId && (
                      <div className="flex gap-[10px]">
                        <button className="text-red-500 text-[1.2rem] font-semibold" onClick={ () => handleDelete( comment.id ) }>
                          Eliminar
                        </button>
                        <button className="text-[#33a1fd] text-[1.2rem] font-semibold" onClick={() => setEditingComment(comment.id)}>
                          Editar
                        </button>
                      </div>
                  )}
                  </div>
                </li>
              ))}
            </ul>
            { editingComment !== null && (
              <div className="mb-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md outline-none"
                  value={newEditText}
                  onChange={ e => setNewEditText( e.target.value ) }
                />
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={() => {
                    dispatch( updateComment( editingComment, newEditText ) )
                    setEditingComment( null )
                    setNewEditText( '' )
                  }}
                >
                  Guardar
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2"
                  onClick={ () => setEditingComment( null ) }
                >
                  Cancelar
                </button>
              </div>
            )}
            {editingComment === null && (
              <form onSubmit={ handleSubmit } className='flex items-center justify-between'>
                <textarea
                  className="w-[90%] h-auto text-[1.2rem] p-3 border rounded-[10px] outline-none"
                  value={ text }
                  onChange={ e => setText( e.target.value ) }
                  placeholder="Comentario..."
                />
                <button
                  className="w-auto px-[10px] text-[1.5rem] text-white font-semibold py-[5px] rounded-full bg-[#33a1fd] flex items-center justify-center"
                  type="submit"
                >
                  Publicar
                </button>
              </form>
            )}

    </>
  )
}

export default AddComment
