import React,{useEffect} from 'react';
import {View, Text, FlatList} from "react-native";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import {Platform} from "react-native";
import HeaderButton from "../components/HeaderButton";
import {useSelector,useDispatch} from "react-redux";
import PlaceItem from "../components/placeItem";
import * as action from '../store/actions/index'

function PlacesListScreen(props) {
    const places=useSelector((state)=>{
        return state.places.places
    })

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(action.loadPlace())
    },[dispatch])

    return (
        <View>
            <FlatList data={places}
                      renderItem={(itemData)=>{
                          return <PlaceItem image={itemData.item.imageUri}
                                            title={itemData.item.title}
                                            address={null}
                                            onSelect={()=>{
                                                props.navigation.navigate('PlaceDetails',{
                                                    placeTitle:itemData.item.title,
                                                    placeId:itemData.item.id
                                                })
                                            }}
                          />
                      }}
            />
        </View>
    );
}

PlacesListScreen.navigationOptions=(navigationData)=>{
    return{
        headerTitle:'All Places',
        headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={'Add Place'}
                iconName={Platform.OS==='android'?'md-add':'ios-add'}
                onPress={()=>{
                    navigationData.navigation.navigate('NewPlace')
                }}
            />
        </HeaderButtons>
    }
}

export default PlacesListScreen