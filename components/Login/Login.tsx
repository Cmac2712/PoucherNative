import React from 'react';
import {Text, Button} from 'react-native';
import {useUser} from '../../contexts/user-context';

const Login = () => {
  const {loading, logIn} = useUser();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <Button title="Log In" onPress={() => logIn()} />;
};

export {Login};
