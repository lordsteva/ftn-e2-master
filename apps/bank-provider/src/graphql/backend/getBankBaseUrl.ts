import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query getBankBaseUrl($id: uuid!) {
    banks_by_pk(id: $id) {
      base_url
    }
  }
`;

const getBankBaseUrl = async (id: string): Promise<string> => {
  const res = await graphqlAdminClient.query({ query, variables: { id } });
  return res.data.banks_by_pk.base_url;
};

export default getBankBaseUrl;
