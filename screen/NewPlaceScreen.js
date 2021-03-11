import React,{useState,useCallback} from 'react';
import {Button, ScrollView, Text, TextInput, View, StyleSheet, Image} from "react-native";
import color from "../color/color";
import * as action from '../store/actions/index'
import {useDispatch} from "react-redux";
import ImagePicker from "../components/imagePicker";
import LocationPicker from "../components/locationPicker";

function NewPlaceScreen(props) {
    const style=StyleSheet.create({
        form:{
            margin:30
        },
        label:{
            fontSize:18,
            marginBottom:15
        },
        textInput:{
            borderBottomColor:'#ccc',
            borderBottomWidth:1,
            marginBottom: 15,
            paddingVertical:4,
            paddingHorizontal:2
        }
    })

    const dispatch=useDispatch()

    const [inputValue,setInputValue]=useState('')
    const [selectedImage,setSelectedImage]=useState()
    const [selectedLocation,setSelectedLocation]=useState()

    const imageTakenHandler=(imagePath)=>{
        setSelectedImage(imagePath)
    }

    const textChangeHandler=(text)=>{
        setInputValue(text)
    }

    const savePlaceHandler=()=>{
        dispatch(action.addPlace(inputValue,selectedImage,selectedLocation))
        props.navigation.goBack()
    }

    const locationPickedHandler=useCallback((location)=>{
        setSelectedLocation(location)
    },[])

    return (
        <ScrollView>
            <View style={style.form}>
                <Text style={style.label}>
                    Title
                </Text>
                <TextInput style={style.textInput} value={inputValue} onChangeText={textChangeHandler}/>
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
                <View style={{alignItems:'center'}}>
                    <Button title={'Save Place'} color={color.primary} onPress={savePlaceHandler}/>
                </View>
            </View>
        </ScrollView>
    );
}

NewPlaceScreen.navigationOptions={
    headerTitle:'Add Place'
}

export default NewPlaceScreen;