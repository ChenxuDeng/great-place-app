import React from 'react';
import {FlatList, Text, View} from "react-native";
import {useSelector} from "react-redux";
import PlaceItem from "../components/placeItem";

function PlaceDetailScreen(props) {

    return (
        <View>
            <Text>
                PlaceDetailScreen
            </Text>
        </View>
    );
}

PlaceDetailScreen.navigationOptions=(navigationData)=>{
    return {
        headerTitle:navigationData.navigation.getParam('placeTitle')
    }
}

export default PlaceDetailScreen