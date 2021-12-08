import { gql, useMutation } from '@apollo/client';

export const mutation = gql`
  mutation InsertNewApikey($user_id: uuid!) {
    insert_api_keys_one(object: { user_id: $user_id }) {
      api_key
    }
  }
`;

//TODO remove api key
export default () =>
  useMutation<{
    insert_api_keys_one: {
      api_key: string;
    };
  }>(mutation);
