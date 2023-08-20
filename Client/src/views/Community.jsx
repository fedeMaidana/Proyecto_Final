import { CardsContainer } from "../components/CardsContainer"
import { Filter } from "../components/Filters"
import SearchBar from "../components/SearchBar";
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {  getComments} from '../redux/actions';

export function Community () {
  const dispatch =useDispatch();
  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);
  return (
    <div className="w-full h-[auto] p-[10px] flex flex-col gap-[20px] bg-[#f6f6f6]">
      <div className="w-[90%] h-[50px] bg-white flex self-center rounded-[10px] justify-center items-center gap-[20px] border border-[#e7e9ec]">
              <p className="text-xl font-bold mb-2">Encuentra lo que quieres</p>
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