import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from "@expo/vector-icons";
import {Platform} from "react-native";
import React from "react";
import color from "../color/color";

const CustomHeaderButton=(props)=>{
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS==='android'?'white':color.primary}/>
}

export default CustomHeaderButton