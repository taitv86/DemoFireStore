import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '842137701220-ig8rars8bmptmc4cor662jf2oksl2o0p.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [authBear,setAuthBear] = useState('')
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // Get the Google user data
      const { idToken } = await GoogleSignin.signIn();
      setToken(idToken);
      //  const userInfo  = await GoogleSignin.signIn();
      // Create a Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign in with the credential
      const { user } = await auth().signInWithCredential(googleCredential);
      // Set the user state
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      // Sign out the user
      await auth().signOut();
      // Set the user state to null
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    const tok = await GoogleSignin.getTokens();
    
    await fetch(`https://aao.eiu.edu.vn/api/auth/login`, {
      method: 'post',
      body: new URLSearchParams({ username: 'user@gw', password: tok.accessToken, grant_type: 'password' }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then(async d=>{
        console.log(d);
       // setAuthBear(d.access_token)
         await fetch(`https://aao.eiu.edu.vn/api/sch/w-locdstkbhockytheodoituong`, {
          method: 'post',
          headers: {
            Authorization: `Bearer ${d.access_token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hoc_ky: 20231,
            id_du_lieu: null,
            loai_doi_tuong: 1,
          })
             
        })
          .then((response) => response.json())
          .then((d) => {
            console.log(d.data)
            setData(d)
          })
      .catch(
        (err) => console.log(err)
        );

      })
      .catch((err) => console.log(err));

   // return await fetch(`https://aao.eiu.edu.vn/api/sch/w-locdshockytkbuser`, {
    
  }
  
return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {user ? (
      <>
        <Text>Welcome,{user.displayName} !</Text>
        <Button title="Sign Out" onPress={handleSignOut} />
      </>
    ) : (
      <Button title="Sign In with Google" onPress={handleGoogleSignIn} />
    )}
    
    <Button title="Get data" onPress={getData} />
  </View>
);
};

export default LoginScreen;
