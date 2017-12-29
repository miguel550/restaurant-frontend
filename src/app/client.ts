import ApolloClient, { createNetworkInterface} from 'apollo-client';

// Polyfill fetch
import 'whatwg-fetch';

interface Result {
  id?: string;
  __typename?: string;
}


const networkInterface: any = createNetworkInterface({
  uri: 'http://localhost:8000/graphql/',
});

const client: ApolloClient = new ApolloClient({
  networkInterface: networkInterface,
  dataIdFromObject: (result: Result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  }
});

export function provideClient(): ApolloClient {
  return client;
}