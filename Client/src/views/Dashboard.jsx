import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from "../redux/actions";
import { getCart } from "../redux/actions";
import CardFour from '../components/CardFour.jsx';
import CardThree from '../components/CardThree.jsx';
import CardTwo from '../components/CardTwo.jsx';

export function Dashboard() {
  const dispatch = useDispatch();


  useEffect(()=> {
      dispatch(getUsers())
      dispatch(getCart())
  }, [dispatch])

  const users = useSelector(state => state.allUsers)
  const totalUsers = users.length;

  // const shoppingCartsEnProceso = shoppingCart.filter(cart => cart.estado_pedido === 'En Proceso');
  // const totalShoppingCartsEnProceso = shoppingCartsEnProceso.length;

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-[1.875rem] h-[352px]">
                <CardTwo />

                <CardThree users={users}/>
                <CardFour totalUsers={totalUsers} users={users}/>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}