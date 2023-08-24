import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from "../redux/actions"
import { getCart } from "../redux/actions"
import CardFour from '../components/CardFour.jsx'
import CardThree from '../components/CardThree.jsx'
import CardTwo from '../components/CardTwo.jsx'

export function Dashboard() {
  const dispatch = useDispatch()

  useEffect(()=> {
      dispatch(getUsers())
      dispatch(getCart())
  }, [dispatch])

  const shoppingCart = useSelector( state => state.allCartProducts )
  const users = useSelector( state => state.allUsers )
  const totalUsers = users.length

  const cancelPayments = shoppingCart.filter( cart => cart.estado_pedido === 'Cancelado' )
  const cancelPaymentLength = cancelPayments.length

  const pendingPayments = shoppingCart.filter( cart => cart.estado_pedido === 'En Proceso' )
  const pendingPaymentLength = pendingPayments.length

  const approvedPayments = shoppingCart.filter( cart => cart.estado_pedido === 'Pago Aprobado' )
  const approvedPaymentsLength = approvedPayments.length

  console.log(shoppingCart)

  return (
    <div className="p-5 bg-[#f6f5f7]">
      <div className="mt-[10vh] flex flex-col gap-5">
        <CardTwo approvedPayments={ approvedPayments } pendingPayments={ pendingPayments } cancelPayments={ cancelPayments } />
        <CardThree users={ users } />
        <CardFour totalUsers={ totalUsers } users={ users } />
      </div>
    </div>
  )
}