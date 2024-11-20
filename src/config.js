const appConfig = Object.freeze({
    //audience: '',
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    graphqlHttpUri: import.meta.env.VITE_GRAPHQL_HTTP_URI,
    graphqlWebsocketUri: import.meta.env.VITE_GRAPHQL_WEBSOCKET_URI,
    redirectUri: window.location.origin,
});

export default appConfig;