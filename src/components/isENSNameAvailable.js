import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  cache: new InMemoryCache(),
});

const CHECK_NAME_AVAILABILITY = gql`
  query CheckENSNameAvailability($name: String!) {
    domains(where: { id: $name }) {
      id
    }
  }
`;

async function isENSNameAvailable(ensName) {
  try {
    const { data } = await client.query({
      query: CHECK_NAME_AVAILABILITY,
      variables: { name: ensName },
    });

    return !data.domains.length;
  } catch (error) {
    console.error('Error checking ENS name availability:', error);
    return false;
  }
}

export default isENSNameAvailable;
