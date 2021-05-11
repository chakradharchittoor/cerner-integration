import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {Button, SafeAreaView, ScrollView} from 'react-native';
import {authorize, refresh} from 'react-native-app-auth';
import config from './config';
import PatientInfo from './PatientInfo';

function App() {
  const [patientInfo, setPatientInfo] = useState(null);
  async function onGenerate() {
    try {
      const result = await authorize(config);
      await AsyncStorage.setItem('@auth/accessToken', result.accessToken);
      await AsyncStorage.setItem('@auth/refreshToken', result.refreshToken);
    } catch (error) {
      console.log(error);
    }
  }

  async function onRefresh() {
    try {
      const refreshToken = await AsyncStorage.getItem('@auth/refreshToken');
      const result = await refresh(config, {
        refreshToken,
      });
      await AsyncStorage.setItem('@auth/accessToken', result.accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPatientRecord() {
    try {
      const accessToken = await AsyncStorage.getItem('@auth/accessToken');

      const response = await axios.get(
        'https://fhir-open.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/Patient/12724067',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setPatientInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button onPress={onGenerate} title="Authorize"></Button>
        <Button onPress={onRefresh} title="Refresh"></Button>
        <Button
          onPress={getPatientRecord}
          title="Fetch Patient Record"></Button>
      </ScrollView>
      {patientInfo && <PatientInfo {...patientInfo} />}
    </SafeAreaView>
  );
}

export default App;
