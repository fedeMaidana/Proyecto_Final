import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteComment, updateComment } from '../redux/actions'

const AddComment = ( { userId, productId, profileImage, token } ) => {
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

    if( text.length > 0 && token ){
      dispatch( addComment( parsedUserId, productId, text ) )
      setText( '' )
    }
  }

  const handleDelete = ( commentId ) => {
    dispatch( deleteComment( commentId ) )
  }

  console.log(comments)

  return(
    <>
      <h2 className="text-lg text-center font-semibold border-t pt-[10px]">Comentarios</h2>
            <ul className='h-auto flex flex-col gap-[10px]'>
              {comments.map( comment => (
                <li key={ comment.id }>
                  <div className='w-[100%] h-auto bg-[#f6f6f6] rounded-[10px] px-5 py-3 flex items-center justify-between gap-[10px]'>
                    <div className='flex items-center gap-[10px]'>
                      <img src={ allUsers.find( user => user.id === comment.userId )?.profileImage?.urlImage } className='min-w-[30px] h-[30px] bg-[#9c9c9c] rounded-full'></img>
                      <p className='text-[1.2rem]'>
                        <span className='text-[1.4rem] font-semibold'>{ allUsers.find( user => user.id === comment.userId )?.name || 'Usuario desconocido'}</span> ▸ { comment.text }
                      </p>
                    </div>

                    {comment.userId === parsedUserId && (
                      <div className="border-l pl-5 flex flex-col gap-[10px]">
                        <button className="text-red-500 text-[1.2rem] font-semibold" onClick={ () => handleDelete( comment.id ) }>
                          Eliminar
                        </button>
                        <button className="text-white rounded-full px-5 py-1 bg-[#33a1fd] text-[1.2rem] font-semibold" onClick={() => setEditingComment(comment.id)}>
                          Editar
                        </button>
                      </div>
                  )}
                  </div>
                </li>
              ))}
            </ul>
            { editingComment !== null && (
              <div className="flex justify-center gap-[20px]">
                <input
                  type="text"
                  className="w-[80%] p-2 border rounded-[10px] outline-none"
                  value={ newEditText }
                  onChange={ e => setNewEditText( e.target.value ) }
                />
                <button
                  className="text-[1.2rem] font-semibold px-4 py-2 bg-green-500 text-white rounded-full"
                  onClick={() => {
                    dispatch( updateComment( editingComment, newEditText ) )
                    setEditingComment( null )
                    setNewEditText( '' )
                  }}
                >
                  Guardar
                </button>
                <button
                  className="text-[1.2rem] font-semibold px-4 py-2 bg-red-500 text-white rounded-full"
                  onClick={ () => setEditingComment( null ) }
                >
                  Cancelar
                </button>
              </div>
            )}
            {editingComment === null && (
              <form onSubmit={ handleSubmit } className='flex items-center justify-between gap-[10px]'>
                <textarea
                  className="w-[90%] h-auto text-[1.2rem] p-3 border rounded-[10px] outline-none"
                  value={ text }
                  onChange={ e => setText( e.target.value ) }
                  placeholder="Comentario..."
                />
                <button
                  className={ `${ text.length > 0
                    ? 'w-auto px-[10px] border-none outline-none text-[1.5rem] text-white font-semibold py-[5px] rounded-full bg-[#33a1fd] flex items-center justify-center'
                    : 'w-auto px-[10px] border-none outline-none text-[1.5rem] text-[#6b6b6b] font-semibold py-[5px] rounded-full bg-gray-300 flex items-center justify-center cursor-not-allowed'
                  }`}
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
