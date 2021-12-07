import { Request, Response } from 'express';
import insertCartItem from '../../../graphql/cart/insertCartItem';


export const addItem = async (req: Request, resp: Response) => {
    const { user_id, product_id, quantity } = req.body.input;

    console.log(user_id, product_id, quantity)
    // try {
    //     const { id } = await insertCartItem({ cart_id, product_id, quantity });
    //     if (id) {
    //         return resp.json({
    //             message:"Item added to cart!",
    //             status: 200
    //         });
    //     }
    // }catch(e){
    //     return resp.json({
    //         message:"Error when adding item to cart!",
    //         status: 404
    //     });
    // }
}

export const removeItem = async (req: Request, resp: Response) => {

}