/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react'
import {SafeAreaView, ScrollView, StatusBar} from 'react-native'
import {UserProvider} from './contexts/user-context'
import {PageProvider} from './contexts/page-context'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import {AdminScreen} from './components/AdminScreen'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://izpcehh3ef.execute-api.eu-west-2.amazonaws.com/dev/',
  cache,
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <PageProvider>
          <SafeAreaView>
            <StatusBar />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <AdminScreen />
            </ScrollView>
          </SafeAreaView>
        </PageProvider>
      </UserProvider>
    </ApolloProvider>
  )
}

export default App
