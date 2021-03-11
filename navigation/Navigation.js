import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import MapScreen from "../screen/MapScreen";
import NewPlaceScreen from "../screen/NewPlaceScreen";
import PlaceDetailScreen from "../screen/PlaceDetailScreen";
import PlacesListScreen from "../screen/PlacesListScreen";
import {Platform} from "react-native";
import color from "../color/color";

const PlaceNavigator=createStackNavigator({
    Places:PlacesListScreen,
    PlaceDetails:PlaceDetailScreen,
    NewPlace:NewPlaceScreen,
    Map:MapScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS==='android'?color.primary:''
        },
        headerTintColor:Platform.OS==='android'?'white':color.primary
    }
})

export default createAppContainer(PlaceNavigator)