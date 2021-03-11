import React, {useEffect, useState} from 'react';
import {Button, Text, View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity} from "react-native";
import color from "../color/color";
import * as permission from "expo-permissions";
import * as Location from 'expo-location';
import MapPreview from "./mapPreview";

function LocationPicker(props) {
    const style=StyleSheet.create({
        locationPicker:{
            marginBottom: 15,
            alignItems:'center'
        },
        mapPreview:{
            marginBottom: 10,
            width: '100%',
            height: 150,
            borderColor: '#ccc',
            borderWidth: 1,
            justifyContent:'center',
            alignItems:'center'
        },
        button:{
            flexDirection:'row',
            justifyContent: 'space-between',
            width: '100%'
        }
    })

    const [pickedLocation,setPickedLocation]=useState(null)
    const [loading,setLoading]=useState(false)

    const mapPickedLocation=props.navigation.getParam('pickedLocation')

    useEffect(()=>{
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation)
            props.onLocationPicked(mapPickedLocation)
        }
    },[mapPickedLocation])

    const verifyPermission=async ()=>{
        const result=await permission.askAsync(permission.LOCATION)
        if(result.status!=='granted'){
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{text:'ok'}]
            )
            return false
        }
        return true
    }

    const getLocationHandler=async ()=>{
        const hasPermission=await verifyPermission()
        if(!hasPermission){
            return
        }

        try{
            setLoading(true)
            let location=await Location.getCurrentPositionAsync({accuracy: 6})
            console.log(location)
            setPickedLocation({
                lat:location.coords.latitude,
                lng:location.coords.longitude
            })
            props.onLocationPicked({
                lat:location.coords.latitude,
                lng:location.coords.longitude
            })
        }catch (error){
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map.',
                [{ text: 'Okay' }]
            )
            throw (error)
        }
        setLoading(false)
    }

    const pickLocationHandler=()=>{
        props.navigation.navigate('Map')
    }

    return (
        <View style={style.locationPicker}>
                <MapPreview style={style.mapPreview} location={pickedLocation} onPress={pickLocationHandler}>
                    {loading?<ActivityIndicator size={'large'} color={color.primary}/>:<Text>No location chosen yet</Text>}
                </MapPreview>
            <View style={style.button}>
                <View style={{flex:1}}>
                    <Button title={'Get User Location'} onPress={getLocationHandler} color={color.primary}/>
                </View>
                <View style={{flex:1,marginLeft:20}}>
                    <Button title={'Pick On Map'} onPress={pickLocationHandler} color={color.primary}/>
                </View>
            </View>
        </View>
    );
}

export default LocationPicker;