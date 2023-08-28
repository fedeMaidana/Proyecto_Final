const CardTwo = ( { approvedPayments, cancelPayments } ) => {

  console.log(approvedPayments)

    return (
      <div className="h-auto border bg-white p-5 flex flex-col gap-[20px]">
        <div className="grid grid-cols-5 grid-rows-10">
          <h2 className=""></h2>
        </div>
        {/* <span>
          <h3 className="text-[1.5rem] font-semibold">Total de productos cancelados</h3>
          { cancelPayments.map( cancelPayment => (
            <div key={ cancelPayment.id } className="flex flex-col gap-[10px]">
                <span className="w-full h-auto bg-[#adadad] rounded-[10px] flex justify-between">
                  { cancelPayment.products?.map( product => (
                    <div key={ product.id }>
                      <p>Titulo: { product.name }</p>
                      <p>Cantidad: { product.quantity }</p>
                      <p>Descripción: { product.description }</p>
                      <p>Talle: { product.size }</p>
                      <p>Precio: { product.price }</p>
                    </div>
                  ))}
                </span>
            </div>
          ))}
        </span> */}
        {/* <span className="w-full h-auto flex flex-col">
          <h3 className="text-[1.5rem] font-semibold">Total de productos aprobados</h3>
          { approvedPayments.map( approvedPayment => (
            <div key={ approvedPayment.id } className="flex flex-col gap-[10px]">
                <span className="w-full h-auto bg-[#adadad] rounded-[10px] flex justify-between">
                  { approvedPayment.products.map( product => (
                    <div key={ product.id }>
                      <p>Titulo: { product.name }</p>
                      <p>Cantidad: { product.quantity }</p>
                      <p>Descripción: { product.description }</p>
                      <p>Talle: { product.size }</p>
                      <p>Precio: { product.price }</p>
                    </div>
                  ))}
                </span>
            </div>
          ))}
        </span> */}
      </div>
    )
  }

  export default CardTwo
