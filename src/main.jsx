import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Auth0Provider} from "@auth0/auth0-react"
import appConfig from "./config.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from "@apollo/client";
import "./styles/App.css";
import {getMainDefinition} from "@apollo/client/utilities";
import {createClient} from "graphql-ws";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";

const root = createRoot(document.getElementById('root'));


const graphqlHttpLink = new HttpLink({
    uri: appConfig.graphqlHttpUri,
});

/*const authLink = setContext(async (_, { headers }) => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently({
        audience: auth0Config.audience,
    });

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});*/

const graphqlWebsocketLink = new GraphQLWsLink(
    createClient({
        url: appConfig.graphqlWebsocketUri,
        keepAlive: 10_000,
        //lazy: true,
        //lazyCloseTimeout: 60_000,
        shouldRetry: true,
        on: {
            connecting: () => console.info("Connecting to GraphQL"),
            connected: () => console.info("Connected to GraphQL"),
            closed: () => console.info("Closed GraphQL"),
            error: error => console.error(error),
        }
    })
);

const graphqlSplitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    graphqlWebsocketLink,
    graphqlHttpLink
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: graphqlSplitLink,
});

const onRedirectCallback = (appState) => {
    window.history.replaceState(
        {},
        document.title,
        appState?.returnTo || window.location.pathname
    );
};

root.render(
    <StrictMode>
        <Auth0Provider
            domain={appConfig.domain}
            clientId={appConfig.clientId}
            cacheLocation="localstorage"
            useRefreshTokens={true}
            authorizationParams={{
                redirect_uri: appConfig.redirectUri
            }}
            onRedirectCallback={onRedirectCallback}
        >
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </Auth0Provider>
    </StrictMode>
);
