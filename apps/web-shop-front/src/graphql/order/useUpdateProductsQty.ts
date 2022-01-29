import { gql, useMutation } from '@apollo/client';
const mutation = gql`
    mutation updateProductsQty($id: uuid!, $quantity: Int!) {
        update_products(where: {id: {_eq: $id}}, _set: {quantity: $quantity}) {
            affected_rows
        }
    }  
`;
export default () => useMutation(mutation);
