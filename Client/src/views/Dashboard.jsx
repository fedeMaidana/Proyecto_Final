import { useState } from "react"
import HeaderDashboard from "../components/HeaderDashboard"
import Sidebar from "../components/Sidebar.jsx"
import { Outlet } from "react-router-dom"

import CardFour from '../components/CardFour.jsx';
import CardOne from '../components/CardOne.jsx';
import CardThree from '../components/CardThree.jsx';
import CardTwo from '../components/CardTwo.jsx';
import ChartOne from '../components/ChartOne.jsx';
import ChartThree from '../components/ChartThree.jsx';
import ChartTwo from '../components/ChartTwo.jsx';
import ChatCard from '../components/ChatCard.jsx';

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== HeaderDashboard Start ===== --> */}
          <HeaderDashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== HeaderDashboard End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-[1.875rem] h-[352px]">
                <CardOne />
                <CardTwo />
                <CardThree />
                <CardFour />
              </div>

              <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-[30px] 2xl:gap-[30px]">
                <ChartOne />
                <ChartTwo />
                <ChartThree />
                <div className="col-span-12 xl:col-span-8">
                </div>
                <ChatCard />
              </div>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  )
}