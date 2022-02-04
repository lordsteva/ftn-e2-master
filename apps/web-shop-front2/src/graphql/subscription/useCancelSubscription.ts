import { gql, useMutation } from '@apollo/client';

const mutation = gql`
    mutation MyMutation($id: uuid!, $status: String = "Canceled") {
        update_subscriptions(where: {id: {_eq: $id}}, _set: {status: $status}) {
            affected_rows
        }
    }
`;

export default () => useMutation(mutation);
