import { CardsContainer } from "../components/CardsContainer"
import { Filter } from "../components/Filters"
import SearchBar from "../components/SearchBar"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getUsers, getComments} from '../redux/actions'
import { Pagination } from "../components/Pagination"

export function Community () {
  const dispatch = useDispatch()

  const token = localStorage.getItem( 'token' )

  const allUsers = useSelector( state => state.allUsers )

  const [ currentPage, setCurrentPage ] = useState( 1 )

  const postsPerPage = 10

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  const postsAll = allUsers.flatMap( user => user.CreatedProducts )
  postsAll.sort( ( a, b ) => a.id - b.id )

  const currentPosts = postsAll.slice( indexOfFirstPost, indexOfLastPost )

  let totalPost = allUsers.reduce(( sum, user ) => {
    return sum + user.CreatedProducts.length
  }, 0)

  const paginate = pageNumber => setCurrentPage( pageNumber )

  useEffect(() => {
    dispatch( getUsers() )
  dispatch( getComments() )
  }, [ dispatch ])

  return (
    <div className="w-full h-[auto] transform translate-y-[10vh] p-[10px] flex flex-col gap-[10px] bg-[#f6f6f6]">
      <div className="w-[90%] h-[150px] bg-white flex self-center rounded-[10px] justify-end items-center border border-[#e7e9ec] gap-[10px] py-2">
        <SearchBar/>
      </div>
      <div className="w-full flex flex-col items-center gap-[10px]">
        <Filter/>
      </div>

      <Pagination
        postsPerPage={ postsPerPage }
        totalPosts={ totalPost }
        paginate={ paginate }
        currentPage={ currentPage }
      />

      <div className="w-full h-full flex flex-col items-center gap-[10px]">
        <CardsContainer currentPosts={ currentPosts } />
      </div>

      <Pagination
        postsPerPage={ postsPerPage }
        totalPosts={ totalPost }
        paginate={ paginate }
        currentPage={ currentPage }
      />
    </div>
  )
}