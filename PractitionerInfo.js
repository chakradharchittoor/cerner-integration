import React from 'react';
import {View, Text} from 'react-native';

function PractitionerInfo(props) {
  console.log(props.PractitionerInfo)
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', margin: 14}}>
      <View style={{borderWidth: 1, borderColor: '#333', padding: 16}}>
      <Text>Resource Type: {props.resourceType}</Text>
        <Text>Id: {props.id}</Text>
        <Text>Name: {props.name[0].text}</Text>
      </View>
    </View>
  );
}

export default PractitionerInfo;
