import * as actionType from '../actions/actionType'
import Place from "../../model/place";

const initialState={
    places:[]
}

const places=(state=initialState,action)=>{
    switch (action.type){
        case actionType.ADD_PLACE:
            const newPlace=new Place(action.placeData.id.toString(),action.placeData.title,action.placeData.image)
            return{
                places:state.places.concat(newPlace)
            }
        case actionType.LOAD_PLACE:
            return {
                places: action.places.map((place)=>{
                    return new Place(place.id.toString(),place.title,place.imageUri)
                })
            }
        default:
            return state
    }
}

export default places