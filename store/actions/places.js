import * as actionType from './actionType'
import * as fileSystem from 'expo-file-system'
import {insertPlace,fetchPlace} from "../../helper/helper";

export const addPlace=(title,image)=>{
    return async (dispatch)=>{
        const fileName=image.split('/').pop()
        const newPath=fileSystem.documentDirectory+fileName

        try{
            await fileSystem.moveAsync({
                from:image,
                to:newPath
            })
            const dbResult=await insertPlace(title,newPath,'Dummy address',15.6,12.3)
            console.log(dbResult)
            dispatch({
                type:actionType.ADD_PLACE,
                placeData:{id: dbResult.insertId,title:title,image:newPath}
            })
        }catch (error){
            console.log(error)
            throw error
        }
    }
}

export const loadPlace=()=>{
    return async (dispatch)=>{
        try{
            const dbResult=await fetchPlace()
            console.log(dbResult)
            dispatch({
                type:actionType.LOAD_PLACE,
                places:dbResult.rows._array
            })
        }catch (error){
            throw error
        }
    }
}