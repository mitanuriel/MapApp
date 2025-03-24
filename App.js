import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useState, useRef, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [markers, setMarkers] = useState([])

  const [region, setRegion] = useState ({
    latitude: 55,
    longitude:12,
    latitudeDelta:20,
    longitudeDelta:20
  })

  const mapView = useRef(null)// ref til mapView object
  const locationSubscription = useRef(null) // when we close app, it shouldn't listen anymore

  useEffect(() => {
    async function startListenning(){
      let { status} = await Location.requestForegroundPermissionsAsync()
      console.log("Location permission status:", status); 
      if(status !== 'granted'){
        alert("no access to the location")
        return
      }
      locationSubscription.current = await Location.watchPositionAsync({
        distanceInterval: 100,
        accuracy: Location.Accuracy.High
      }, (location) => {
        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
        setRegion(newRegion) // moves map to the new location
        if(mapView.current){
          mapView.current.animateToRegion(newRegion)
        }
      })
    }
    startListenning();

 }, []);

  function addMarker(data){
    const {latitude, longitude} = data.nativeEvent.coordinate
    const newMarker = {
      coordinate: {latitude, longitude},
      key: data.timeStamp.toString(),
      title: "Great place"
    }
    setMarkers([...markers, newMarker])
  }

  function onMarkerPressed(text){
    alert("you pressed " + text)
  }

  return (
    <View style={styles.container}>
       <MapView
        ref={mapView}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        onLongPress={addMarker}
      >
        {markers.map(marker => (
          <Marker
            coordinate={marker.coordinate}
            key={marker.key}
            title={marker.title}
            onPress={() => onMarkerPressed(marker.title)}
          />
        ))}
      </MapView>
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
