import { useState, useEffect } from "react"
// import HeaderDashboard from "../components/HeaderDashboard"
// import Sidebar from "../components/Sidebar.jsx"
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';

import { getUsers } from "../redux/actions";
import { getCart } from "../redux/actions";

import CardFour from '../components/CardFour.jsx';
// import CardOne from '../components/CardOne.jsx';
import CardThree from '../components/CardThree.jsx';
import CardTwo from '../components/CardTwo.jsx';
import ChartOne from '../components/ChartOne.jsx';
import ChartTwo from '../components/ChartTwo.jsx';
// import ChartThree from '../components/ChartThree.jsx';
// import ChatCard from '../components/ChatCard.jsx';

export function Dashboard() {
  // const [sidebarOpen, setSidebarOpen] = useState(false)

  const dispatch = useDispatch();

  useEffect(()=> {
      dispatch(getUsers())
      dispatch(getCart())
  }, [dispatch])

  const users = useSelector(state => state.allUsers); 
  // const shoppingCart = useSelector(state => state.allCartProducts);

  console.log(users);

  const totalUsers = users.length;

  // const shoppingCartsEnProceso = shoppingCart.filter(cart => cart.estado_pedido === 'En Proceso');
  // const totalShoppingCartsEnProceso = shoppingCartsEnProceso.length;

  

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-[1.875rem] h-[352px]">
                {/* <CardOne /> */}
                <CardTwo />
                <CardThree 
                users={users} 
                />
                
                <CardFour 
                totalUsers={totalUsers} 
                users={users} 
                />
                
              </div>
          
              <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-[30px] 2xl:gap-[30px]">
                <ChartOne />
                <ChartTwo />
                {/* <ChartThree /> */}
                <div className="col-span-12 xl:col-span-8">
                </div>
                {/* <ChatCard /> */}
              </div>
            </div>
          </main>
          
        </div>
      </div>
    </div>
  )
}