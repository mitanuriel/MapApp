import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { useState } from 'react';

export default function App() {
  const [region, setRegion] = useState ({
    latitude: 55,
    longitude:12,
    latitudeDelta:20,
    longitudeDelta:20
  })

  return (
    <View style={styles.container}>
       <MapView 
       style={styles.map}
       region={region}
       onRegionChangeComplete={setRegion}
        />
       <StatusBar style="auto" />
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
   width:'100%',
   height:'100%',
  },
});
