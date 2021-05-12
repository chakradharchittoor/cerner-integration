import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {Alert, Button, SafeAreaView, ScrollView} from 'react-native';
import {authorize, refresh} from 'react-native-app-auth';
import config from './config';
import PatientInfo from './PatientInfo';
import PractitionerInfo from './PractitionerInfo';
import ObservationInfo from './ObservationInfo';
import ObservationPost from './ObservationPost';
import PractitionerPost from './PractitionerPost';
import Patient from './Patient.json';
import Practitioner from './Practitioner.json';
import Observation from './Observation.json';

function App() {
  const [patientInfo, setPatientInfo] = useState(null);
  const [practitionerInfo, setPractitionerInfo] = useState(null);
  const [observationInfo, setObservationInfo] = useState(null);
  const [practitionerPost, setPractitionerPost] = useState(null);
  const [observationPost, setObservationPost] = useState(null);
 
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
  async function createPatient(){
    const accessToken = await AsyncStorage.getItem('@auth/accessToken');
console.log(accessToken);
    // POST request using axios with set headers
    try {
      const jsonBody=JSON.stringify(Patient);

     const response= await axios.post('https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/Patient', 
     jsonBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    );
     setPractitionerPost(response.data);
     console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    }
  async function getPatientRecord() {
    try {
      const accessToken = await AsyncStorage.getItem('@auth/accessToken');
      console.log(accessToken)

      const response = await axios.get(
        'https://fhir-open.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/Patient/12724067',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setPatientInfo(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  async function getPractitionerRecord() {
    try {
      const accessToken = await AsyncStorage.getItem('@auth/accessToken');
      console.log(accessToken)

      const response = await axios.get(
        'https://fhir-open.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/Practitioner/4122622',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setPractitionerInfo(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.log(error);
    }
  }
  async function createObservation(){
    const accessToken = await AsyncStorage.getItem('@auth/accessToken');
    console.log(accessToken);
    // POST request using axios with set headers
    try {
    const json = JSON.stringify(Observation);
       
     const response= await axios.post('https://fhir-ehr.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/Observation', 
     json, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    );
     setObservationPost(response.data);
     console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    }
  async function createPractitioner(){
    const accessToken = await AsyncStorage.getItem('@auth/accessToken');
console.log(accessToken);
    // POST request using axios with set headers
    try {
    const json = JSON.stringify(Practitioner);
       
     const response= await axios.post('https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/Practitioner', 
     json, {
      headers: {
        Authorization: `Bearer ${accessToken}`,

      },
    },
    );
     setPractitionerPost(response.data);
     console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    }

  async function getObservationRecord() {
    try {
      const accessToken = await AsyncStorage.getItem('@auth/accessToken');
      console.log(accessToken)

      const response = await axios.get(
        'https://fhir-open.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/Observation/M-197292857',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,

          },
        },
      );
      setObservationInfo(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button onPress={onGenerate} title="Authorize"></Button>
        <Button onPress={onRefresh} title="RefreshToken"></Button>
        <Button
          onPress={getPatientRecord}
          title="Fetch Patient Record"></Button>
        <Button
          onPress={getPractitionerRecord}
          title="Fetch Practitioner Record"></Button>
        <Button
          onPress={createPatient}
          title="Push Patient Record"></Button>
           <Button
          onPress={createObservation}
          title="Push Observation Record"></Button>
        <Button
          onPress={getObservationRecord}
          title="Fetch Observation Record"></Button>
      </ScrollView>
      {patientInfo && <PatientInfo {...patientInfo} />}
      {practitionerInfo && <PractitionerInfo {...practitionerInfo} />}
      {observationInfo && <ObservationInfo {...observationInfo} />}
      {practitionerPost && <PractitionerPost {...practitionerPost} />}
      {observationPost && <ObservationPost {...observationPost} />}

   </SafeAreaView>
  );
}

export default App;
