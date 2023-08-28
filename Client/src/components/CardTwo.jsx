import { useState } from "react"
import { useSelector } from 'react-redux'

const CardTwo = ( { approvedPayments, cancelPayments } ) => {
  const allUsers = useSelector( state => state.allUsers )

  const [ selectedProduct, setSelectedProduct ] = useState()
  const [ cancelPaymentId, setCancelPaymentId ] = useState()

  const handleProductClick = ( product, cancelId ) => {
    setCancelPaymentId( cancelId )
    setSelectedProduct( product )
  }

    return (
      <>
        <div className="h-auto border bg-white p-5 flex flex-col gap-[20px]">
          <h3 className="text-[1.5rem] font-semibold">Historial de compras canceladas: {cancelPayments.length}</h3>
          {cancelPayments.map((cancelPayment) => {
            const associatedUser = allUsers.find(user => user.id === cancelPayment.userId)

            return (
              <div key={cancelPayment.id} className="grid grid-cols-5 grid-rows-5 p-5 border-t border-b">
                {associatedUser && (
                  <span className="col-span-1 row-span-full flex items-center justify-center border-r">
                    <p className="w-[150px] text-center text-[1.8rem] font-semibold border rounded-[10px] py-2 bg-[#33a1fd] transform translate-x-[-10px]">{associatedUser.name}</p>
                  </span>
                )}
                <div className="grid grid-cols-2 col-span-4 row-span-full">
                  <div className="col-span-1 flex flex-col items-center justify-center gap-[10px] p-5">
                    {cancelPayment.products?.map((product) => (
                      <div
                        key={product.id}
                        className={`w-full h-auto px-3 py-2 border text-center rounded-[10px] cursor-pointer ${selectedProduct === product ? 'bg-[#33a1fd]' : ''}`}
                        onClick={() => handleProductClick(product, cancelPayment.id)}
                      >
                        <p className="text-[1.5rem]">{`Producto: #${product.id}`}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-[200px] col-span-1 flex flex-col items-center justify-center gap-[10px] p-5 border-l overflow-hidden overflow-y-scroll">
                    {cancelPayment.id === cancelPaymentId && selectedProduct && (
                      <>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px] mt-[295px]">
                          <p className="border-b text-[1.2rem] font-semibold">Titulo</p>
                          <p>{selectedProduct.name}</p>
                        </div>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px]">
                          <p className="border-b text-[1.2rem] font-semibold">Descripción</p>
                          <p>{selectedProduct.description}</p>
                        </div>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px]">
                          <p className="border-b text-[1.2rem] font-semibold">Precio</p>
                          <p>${selectedProduct.price}</p>
                        </div>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px]">
                          <p className="border-b text-[1.2rem] font-semibold">Cantidad</p>
                          <p>{selectedProduct.quantity}</p>
                        </div>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px]">
                          <p className="border-b text-[1.2rem] font-semibold">Talle</p>
                          <p>{selectedProduct.size}</p>
                        </div>
                        <img src={selectedProduct.images} alt="Imagen del producto" className="rounded-[10px] h-[150px] object-cover"/>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="h-auto border bg-white p-5 flex flex-col gap-[20px]">
          <h3 className="text-[1.5rem] font-semibold">Historial de compras aprobadas: {approvedPayments.length}</h3>
          {approvedPayments.map((approvedPayment) => {
            const associatedUser = allUsers.find(user => user.id === approvedPayment.userId)

            return (
              <div key={approvedPayment.id} className="grid grid-cols-5 grid-rows-5 p-5 border-t border-b">
                {associatedUser && (
                  <span className="col-span-1 row-span-full flex items-center justify-center border-r">
                    <p className="w-[150px] text-center text-[1.8rem] font-semibold border rounded-[10px] py-2 bg-[#33a1fd] transform translate-x-[-10px]">{associatedUser.name}</p>
                  </span>
                )}
                <div className="grid grid-cols-2 col-span-4 row-span-full">
                  <div className="col-span-1 flex flex-col items-center justify-center gap-[10px] p-5">
                    {approvedPayment.products?.map((product) => (
                      <div
                        key={product.id}
                        className={`w-full h-auto px-3 py-2 border text-center rounded-[10px] cursor-pointer ${selectedProduct === product ? 'bg-[#33a1fd]' : ''}`}
                        onClick={() => handleProductClick(product, approvedPayment.id)}
                      >
                        <p className="text-[1.5rem]">{`Producto: #${product.id}`}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-[200px] col-span-1 flex flex-col items-center justify-center gap-[10px] p-5 border-l overflow-hidden overflow-y-scroll">
                    {approvedPayment.id === cancelPaymentId && selectedProduct && (
                      <>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px] mt-[295px]">
                          <p className="border-b text-[1.2rem] font-semibold">Titulo</p>
                          <p>{selectedProduct.name}</p>
                        </div>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px]">
                          <p className="border-b text-[1.2rem] font-semibold">Descripción</p>
                          <p>{selectedProduct.description}</p>
                        </div>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px]">
                          <p className="border-b text-[1.2rem] font-semibold">Precio</p>
                          <p>${selectedProduct.price}</p>
                        </div>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px]">
                          <p className="border-b text-[1.2rem] font-semibold">Cantidad</p>
                          <p>{selectedProduct.quantity}</p>
                        </div>
                        <div className="w-full px-3 py-2 text-center border rounded-[10px] flex flex-col gap-[10px]">
                          <p className="border-b text-[1.2rem] font-semibold">Talle</p>
                          <p>{selectedProduct.size}</p>
                        </div>
                        <img src={selectedProduct.images} alt="Imagen del producto" className="rounded-[10px] h-[150px] object-cover"/>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  export default CardTwo
