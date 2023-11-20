import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const DemoFireStore = () => {
  const [account, setAccount] = useState('');
  const [age, setAge] = useState('');
  const [account2, setAccount2] = useState('');
  const [age2, setAge2] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [message, setMessage] = useState('');
  async function DemoGetData() {
    // const usersCollection = firestore().collection('accounts');
    const user = await firestore().collection('accounts').doc('qVcsOylwZPf9tdYn8iBq').get();
    setAccount(user._data.name);
    setAge(user._data.age);
    console.log(user);
  }
  async function DemoGetDataRealTime() {
    firestore()
      .collection('accounts')
      .doc('qVcsOylwZPf9tdYn8iBq')
      .onSnapshot(documentSnapshot => {
        console.log('real time2');
        console.log('User data: ', documentSnapshot.data());
        setAccount2(documentSnapshot.data().name);
        setAge2(documentSnapshot.data().age);
      });

  }
  async function DemoQuerySnapshot() {
    firestore()
      .collection('accounts')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        setTotalUser(querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });
  }
  async function DemoAddUser() {
    const id = (Math.random()*100000).toString();
    firestore()
      .collection('accounts')
      .doc(id)
      .set({
        name: {account},
        age: {age},
        email: 'abc@gmail.com',
      })
      .then(() => {
        setMessage("Successful");
        console.log('User added!');
      });
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> Demo FireStore- Ontime</Text>
      <Text>Name: {account}-Age: {age}</Text>
      <Button title='Get data-Ontime' onPress={DemoGetData}></Button>
      <Text> Demo FireStore- Realtime</Text>
      <Text>Name: {account2}-Age: {age2}</Text>
      <Button title='Get data-realtime' onPress={DemoGetDataRealTime}></Button>
      <Text> Demo FireStore- Query snapshot</Text>
      <Text>Total user: {totalUser}</Text>
      <Button title='Query snapshot' onPress={DemoQuerySnapshot}></Button>
      <Text> Demo FireStore- Add data</Text>
      <TextInput id='account' value={account}  onChangeText={setAccount} placeholder="Name" />
      <TextInput id='age' value={age} keyboardType="numeric" onChangeText={setAge} placeholder='Age' />
      <Text>Result: {message}</Text>
      <Button title='Add user' onPress={DemoAddUser}></Button>
    </View>
  );
};

export default DemoFireStore;
