const CardTwo = ( { approvedPayments, pendingPayments, cancelPayments } ) => {

  console.log(approvedPayments)

    return (
      <div className="h-auto border bg-white p-5 flex flex-col gap-[20px]">
        <span>
          <h3 className="text-[1.5rem] font-semibold">Total de productos cancelados</h3>
          <div className="flex flex-col gap-[10px]">
            { cancelPayments.map( cancelPayment => (
              <>
                  <span key={ cancelPayment.id } className="w-full h-auto bg-[#adadad] rounded-[10px] flex justify-between">
                    { cancelPayment.products?.map( product => (
                      <div>
                        <p>Titulo: { product.name }</p>
                        <p>Cantidad: { product.quantity }</p>
                        <p>Descripción: { product.description }</p>
                        <p>Talle: { product.size }</p>
                        <p>Precio: { product.price }</p>
                      </div>
                    ))}
                  </span>
              </>
            ))}
          </div>
        </span>
        <span>
          <h3 className="text-[1.5rem] font-semibold">Total de productos pendientes</h3>
          <div className="flex flex-col gap-[10px]">
            { pendingPayments.map( pendingPayment => (
              <>
                  <span key={ pendingPayment.id } className="w-full h-auto bg-[#adadad] rounded-[10px] flex justify-between">
                    { pendingPayment.products?.map( product => (
                      <div>
                        <p>Titulo: { product.name }</p>
                        <p>Cantidad: { product.quantity }</p>
                        <p>Descripción: { product.description }</p>
                        <p>Talle: { product.size }</p>
                        <p>Precio: { product.price }</p>
                      </div>
                    ))}
                  </span>
              </>
            ))}
          </div>
        </span>
        <span className="w-full h-auto flex flex-col">
          <h3 className="text-[1.5rem] font-semibold">Total de productos aprobados</h3>
          <div className="flex flex-col gap-[10px]">
            { approvedPayments.map( approvedPayment => (
              <>
                  <span key={ approvedPayment.id } className="w-full h-auto bg-[#adadad] rounded-[10px] flex justify-between">
                    { approvedPayment.products.map( product => (
                      <div>
                        <p>Titulo: { product.name }</p>
                        <p>Cantidad: { product.quantity }</p>
                        <p>Descripción: { product.description }</p>
                        <p>Talle: { product.size }</p>
                        <p>Precio: { product.price }</p>
                      </div>
                    ))}
                  </span>
              </>
            ))}
          </div>
        </span>
      </div>
    )
  }

  export default CardTwo
