import React from 'react'
import {Text, Button} from 'react-native'
import {useUser} from '../../contexts/user-context'

const LogOut = () => {
  const {loading, logOut} = useUser()

  if (loading) {
    return <Text>Loading...</Text>
  }

  return <Button title="Log Out" onPress={() => logOut()} />
}

export {LogOut}
