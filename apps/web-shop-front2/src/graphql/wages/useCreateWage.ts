import { gql, useMutation } from '@apollo/client';

const mutation = gql`
    mutation MyMutation($amount: numeric!, $first_name: String!, $last_name: String!, $recipient_first_name: String!, $recipient_last_name: String!, $user_id: uuid!) {
        insert_wages_one(object: {amount: $amount, first_name: $first_name, last_name: $last_name, recipient_first_name: $recipient_first_name, recipient_last_name: $recipient_last_name, user_id: $user_id}) {
            id
        }
    }
`;

export default () => useMutation(mutation);
