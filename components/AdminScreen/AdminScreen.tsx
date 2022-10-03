import React from 'react'
import {Text, View} from 'react-native'
import {useUser} from '../../contexts/user-context'
import {Login} from '../Login'
import {LogOut} from '../LogOut'
import {Bookmarks} from '../Bookmarks'

const AdminScreen = () => {
  const {data, loading, error} = useUser()

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    console.log(JSON.stringify(error))
  }

  return data?.createUser?.id ? (
    <View>
      <LogOut />
      <Bookmarks />
    </View>
  ) : (
    <View>
      <Login />
      <Text>You are logged out</Text>
    </View>
  )
}

export {AdminScreen}
