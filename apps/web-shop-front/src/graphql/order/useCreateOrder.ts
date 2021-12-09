
import { gql, useMutation } from '@apollo/client';
const mutation = gql`
    mutation MyMutation($first_name: String!, $last_name: String!, $country: String!, $city: String!, $address: String!, $zip_code: String!, $phone: String!, $user_id: uuid!, $total_price: numeric!) {
        insert_orders_one(object: {first_name: $first_name, last_name: $last_name, country: $country, city: $city, address: $address, zip_code: $zip_code, phone: $phone, user_id: $user_id, total_price: $total_price}) {
            id
        }
    }
`;
export default () => useMutation(mutation);
