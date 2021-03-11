import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";

function MapPreview(props) {
    const style=StyleSheet.create({
        mapPreview: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        mapImage: {
            width: '100%',
            height: '100%'
        }
    })

    let imagePreviewUrl
    if(props.location){
        imagePreviewUrl=`http://api.map.baidu.com/staticimage/v2?ak=Og8EsLGIY3WMOlsngLP0V7G55U72bbOm&mcode=666666&center=${props.location.lng},${props.location.lat}&width=350&height=150&zoom=11&markers=${props.location.lng},${props.location.lat}&markerStyles=,,blue`
    }

    return (
        <TouchableOpacity style={{...style.mapPreview,...props.style}} onPress={props.onPress}>
                {props.location?<View style={{width:'100%'}}><Image source={{uri:imagePreviewUrl}} style={style.mapImage}/></View>:props.children}
        </TouchableOpacity>
    );
}

export default MapPreview;