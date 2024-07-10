import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
          Post: {
            fields: {
              likes: {
                merge(existing = [], incoming) {
                  // This is a simple merge strategy that combines existing likes with incoming likes
                  // It assumes likes are an array of like objects
                  // You might need to adjust this logic depending on how likes are structured
                  return [...existing, ...incoming];
                },
              },
            },
          },
        },
      }),
    uri: 'http://localhost:3000/graphql',
})

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})
app.use(router).use(apolloProvider).mount('#app')
