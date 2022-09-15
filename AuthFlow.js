import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import LoginStackNavigation from './src/components/LoginStackNavigation';

const AuthFlow = () => {
  //const auth = useSelector(state => state.auth);
  /*useEffect(() => {
    console.log(auth);
  });*/
  return (
    <NavigationContainer>
      <LoginStackNavigation />
    </NavigationContainer>
  );
};

export default AuthFlow;
