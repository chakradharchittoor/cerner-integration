import React from 'react';
import {View, Text} from 'react-native';

function PatientInfo(props) {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', margin: 14}}>
      <View style={{borderWidth: 1, borderColor: '#333', padding: 16}}>
        <Text>Name: {props.name[0].text}</Text>
        <Text>Gender: {props.gender}</Text>
        <Text>BirthDate: {props.birthDate}</Text>
      </View>
    </View>
  );
}

export default PatientInfo;
