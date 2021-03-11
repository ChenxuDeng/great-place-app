import React,{useState,useEffect,useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from "react-native";
import MapView,{Marker} from 'react-native-maps';
import color from "../color/color";

function MapScreen(props) {
    const styles=StyleSheet.create({
        mapView:{
            flex:1
        },
        text:{
            fontSize:16,
            color:Platform.OS==='android'?'white':color.primary
        }
    })

    const mapRegion={
        latitude: 40.04839296456431,
        longitude: 116.26226124364534,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const [selectedLocation, setSelectedLocation] = useState();

    const selectedLocationHandler=(event)=>{
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    let markerCoordinates

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        };
    }

    const savePickedLocationHandler=useCallback(()=>{
        if(!selectedLocation){
            return
        }
        props.navigation.navigate('NewPlace',{pickedLocation:selectedLocation})
    },[selectedLocation])

    useEffect(()=>{
        props.navigation.setParams({saveLocation:savePickedLocationHandler})
    },[savePickedLocationHandler])

    return (
        <MapView style={styles.mapView} region={mapRegion} onPress={selectedLocationHandler}>
            {markerCoordinates&&<Marker title={'Picked Location'} coordinate={markerCoordinates}/>}
        </MapView>
    );
}

MapScreen.navigationOptions=(navigationData)=>{
    const saveFn=navigationData.navigation.getParam('saveLocation')
    return{
        headerRight:()=>{
            return <TouchableOpacity style={{marginHorizontal:20}} onPress={saveFn}>
                <Text style={{fontSize:16,color:Platform.OS==='android'?'white':color.primary}}>Save</Text>
            </TouchableOpacity>
        }
    }
}

export default MapScreen;