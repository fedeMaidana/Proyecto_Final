import { CardsContainer } from "../components/CardsContainer"
import { Filter } from "../components/Filters"
import SearchBar from "../components/SearchBar"
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import {  getUsers, getComments} from '../redux/actions'

export function Community () {
  const dispatch = useDispatch()

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

      <div className="w-full h-full flex flex-col items-center gap-[10px]">
        <CardsContainer/>
      </div>
    </div>
  )
}