import { gql } from '@apollo/client';
import graphqlAdminClient from './admin-client';

const query = gql`
  query getBanks {
    banks {
      base_url
      id
      name
    }
  }
`;

const getBanks = async (): Promise<
  {
    id: number;
    base_url: string;
    name: string;
  }[]
> => {
  const res = await graphqlAdminClient.query({ query });
  return res.data.banks;
};

export default getBanks;
