const CardThree = ( { users } ) => {

  const totalCreatedProducts = users.reduce((total, user) => total + user.CreatedProducts.length, 0);


  const usersWithCreatedProducts = users.filter((user) => user.CreatedProducts.length > 0);

    return (
      <div className="border bg-white p-5">
        <span className="text-[1.7rem] font-medium">Total de productos publicados: {totalCreatedProducts}</span>

        <div className="flex flex-wrap justify-center gap-[10px] mt-[10px]">
          {usersWithCreatedProducts.map((user) => (
            <div key={user.id} className="rounded-[10px] border p-5">
              <p className="text-[1.5rem] font-semibold border-b mb-[10px]">{user.name} {user.lastName}</p>
              <ul className="list-disc list-inside">
                {user.CreatedProducts.map((createdProduct, index) => (
                  <li key={index} className="text-black-600 dark:text-black-300">
                    {createdProduct.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    </div>
    )
  }

export default CardThree
