import React from 'react';
import {View, Text, Alert} from 'react-native';

function ObservationInfo(props) {
  console.log(props.ObservationInfo)
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', margin: 14}}>
      <View style={{borderWidth: 1, borderColor: '#333', padding: 16}}>
        <Text>Resource Type: {props.resourceType}</Text>
        <Text>Id: {props.id}</Text>
        <Text>Status: {props.status}</Text>
      </View>
    </View>
  );
}

export default ObservationInfo;
