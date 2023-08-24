import { CardsContainer } from "../components/CardsContainer"
import { Filter } from "../components/Filters"
import SearchBar from "../components/SearchBar"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getUsers, getComments} from '../redux/actions'
import { Pagination } from "../components/Pagination"

export function Community () {
  const dispatch = useDispatch()


  const allUsers = useSelector( state => state.allUsers )
  const appliedFilters = useSelector(state => state.appliedFilters)

  const [ currentPage, setCurrentPage ] = useState( 1 )

  const postsPerPage = 10

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  const postsAll = allUsers?.flatMap( user => user?.CreatedProducts )

  const sortedPosts = postsAll.slice().sort(( a, b ) => {
    if( appliedFilters === 'priceAsc' ) {
      return a.price - b.price
    }else if( appliedFilters === 'priceDesc' ){
      return b.price - a.price
    }else if( appliedFilters === 'nameAsc' ){
      return a.name.localeCompare( b.name )
    }else if( appliedFilters === 'nameDesc' ){
      return b.name.localeCompare( a.name )
    }else{
      return a.id - b.id
    }
  })

  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPost = sortedPosts.length;

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