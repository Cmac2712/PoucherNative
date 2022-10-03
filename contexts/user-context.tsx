import {useQuery, gql, ApolloError} from '@apollo/client'
import React, {useContext, createContext, useState, type ReactNode} from 'react'
import Auth0, {Credentials} from 'react-native-auth0'

interface UserProviderProps {
  children: ReactNode
}

interface Auth0User {
  email: string
  emailVerified: boolean
  familyName: string
  givenName: string
  name: string
  nickname: string
  picture: string
  sub: string
  updatedAt: string
}

type UserContextProps =
  | {
      loading: boolean
      error: ApolloError | undefined
      data: {
        createUser: {
          id: string
          email: string
          name: string
        }
        getTags: {
          authorID: string
          ID: string
          bookmarkID: string
          title: string
        }[]
      }
      logIn: () => Promise<void>
      logOut: () => Promise<void>
    }
  | undefined

export const CREATE_USER = gql`
  query CreateUser($user: UserInput) {
    createUser(user: $user) {
      id
      email
      name
    }
    getTags(user: $user) {
      ID
      authorID
      bookmarkID
      title
    }
  }
`

export const GET_USER_TAGS = gql`
  query GetUserTags($input: TagInput) {
    getTags(tag: $input) {
      id
      bookmarkID
      title
    }
  }
`

const auth0 = new Auth0({
  domain: 'dev-fq4roxan.eu.auth0.com',
  clientId: 'rSUlQHa8b7G0C6iU2unP0sH0yz7Lwicu',
})

const UserContext = createContext<UserContextProps>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export const UserProvider = ({children}: UserProviderProps) => {
  const [, setCreds] = useState<Credentials | null>()
  const [auth0User, setAuth0User] = useState<Auth0User | null>()
  const logIn = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      })

      setCreds(credentials)

      const user = await auth0.auth.userInfo({
        token: credentials.accessToken,
      })

      setAuth0User(user)
    } catch (e) {
      console.log(e)
    }
  }
  const logOut = async () => {
    try {
      await auth0.webAuth.clearSession({})

      setCreds(null)
      setAuth0User(null)
    } catch (e) {
      console.log(e)
    }
  }

  const {loading, error, data} = useQuery(CREATE_USER, {
    variables: {
      user: {
        id: auth0User?.sub,
        email: auth0User?.email,
        name: auth0User?.givenName,
      },
      input: {
        user: {
          id: auth0User?.sub,
        },
      },
    },
  })

  const value: UserContextProps = {
    loading,
    error,
    data,
    logIn,
    logOut,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
