import { TShirt } from "../clothes/TShirt"
import { Shirt } from "../clothes/Shirt"
import { Pant } from "../clothes/Pant"
import { Dress } from "../clothes/Dress"
import { Jacket } from "../clothes/Jacket"
import { Hooded } from "../clothes/Hooded"

export function categoryByModel( currentModel ){
    switch ( currentModel ) {
        case 'TShirt':
            return 1

        case 'Shirt':
            return 3

        case 'Pant':
            return 2

        case 'Dress':
            return 6

        case 'Jacket':
            return 5

        case 'Hooded':
            return 4

        default:
            return 1
    }
}