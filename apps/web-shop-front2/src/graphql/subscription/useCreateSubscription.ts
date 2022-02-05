import { gql, useMutation } from '@apollo/client';

const mutation = gql`
    mutation MyMutation($course: uuid!, $user_id: uuid!) {
        insert_subscriptions_one(object: {course: $course, user_id: $user_id}) {
            id
        }
    }
`;

export default () => useMutation(mutation);
