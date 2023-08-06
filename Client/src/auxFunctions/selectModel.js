import { TShirt } from "../clothes/TShirt"
import { Shirt } from "../clothes/Shirt"
import { Pant } from "../clothes/Pant"
import { Dress } from "../clothes/Dress"
import { Jacket } from "../clothes/Jacket"
import { Hooded } from "../clothes/Hooded"

export function selectModel( currentModel ){
    switch ( currentModel ) {
        case 'TShirt':
            return TShirt

        case 'Shirt':
            return Shirt

        case 'Pant':
            return Pant

        case 'Dress':
            return Dress

        case 'Jacket':
            return Jacket

        case 'Hooded':
            return Hooded

        default:
            return Shirt
    }
}