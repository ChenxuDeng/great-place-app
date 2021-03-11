import React,{useState} from 'react';
import {View, StyleSheet, Text, Button, Image,Alert} from "react-native";
import color from "../color/color";
import * as imgPicker from 'expo-image-picker'
import * as permission from 'expo-permissions'

function ImagePicker(props) {
    const style=StyleSheet.create({
        imagePreview:{
            width: '100%',
            height: 200,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#ccc',
            borderWidth: 1
        },
        imagePicker:{
            alignItems: 'center',
            marginBottom: 15
        },
        image:{
            height: '100%',
            width: '100%'
        }
    })

    const [pickedImage,setPickedImage]=useState()

    const verifyPermission=async ()=>{
        const result=await permission.askAsync(permission.CAMERA,permission.MEDIA_LIBRARY)
        if(result.status!=='granted'){
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{text:'ok'}]
            )
            return false
        }
        return true
    }

    const takeImageHandler=async ()=>{
        const hasPermission=await verifyPermission()
        if(!hasPermission){
            return
        }
        const image=await imgPicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5
        })
        setPickedImage(image.uri)
        props.onImageTaken(image.uri)
    }

    return (
        <View style={style.imagePicker}>
            <View style={style.imagePreview}>
                {!pickedImage?<Text>
                    NO image picker yet
                </Text>:
                    <Image style={style.image} source={{uri:pickedImage}}/>}
            </View>
            <Button title={'Take Image'} color={color.primary} onPress={takeImageHandler}/>
        </View>
    );
}

export default ImagePicker;