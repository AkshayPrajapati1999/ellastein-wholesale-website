// import { ApolloClient, InMemoryCache } from "@apollo/client"

// const client = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_URL_SERVER_GRAPHQL,
//   cache: new InMemoryCache(),
// })

// export default client

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { environment } from "../env";
// import { useAppSelector } from '@/lib/hook'
import { parseCookies } from "nookies";
import { CookieKeys } from "@/components/models/cookie.model";

const httpLink = createHttpLink({
  uri: environment.graphQl,
});

const authLink = setContext((_, { headers }) => {
  const cookies = parseCookies()
  const accessToken = cookies[CookieKeys.USER_TOKEN];
  if (accessToken) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    return { headers };
  }
});

const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
