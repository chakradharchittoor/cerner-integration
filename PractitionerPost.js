import React from 'react';
import {View, Text} from 'react-native';

function PractitionerPost(props) {
  console.log(props.PatientInfo)
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', margin: 14}}>
      <View style={{borderWidth: 1, borderColor: '#333', padding: 16}}>
        <Text>Status: {props.status}</Text>
      </View>
    </View>
  );
}

export default PractitionerPost;
