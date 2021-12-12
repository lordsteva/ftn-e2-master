import { gql, useMutation } from '@apollo/client';

export const mutation = gql`
  mutation InsertNewApikey {
    insert_api_keys_one(object: {}) {
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
