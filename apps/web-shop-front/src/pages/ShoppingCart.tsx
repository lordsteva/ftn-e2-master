import { Cart, Loader } from '@team21/ui-components';
import React, { FC, useEffect, useState} from 'react';
import useGetUserCart from '../graphql/cart/useGetUserCart';

import { useUser } from '@team21/web-shop-front/src/state/state';
import { getUserFromToken } from "@team21/web-shop-front/src/utils/tokenUtils"

const ShoppingCart: FC<Record<string, never>> = () => {
  const [{ token }] = useUser();
  const [user, setUser] = useState({id:'', email:''})

  useEffect(()=>{
      const user = getUserFromToken(token)
      setUser(user)
  },[])

  const { data, loading } = useGetUserCart(user.id);
  if (!data && loading)  return <Loader />
  return <Cart cartId={data!.cart[0].id} />

  
};
export default ShoppingCart;
