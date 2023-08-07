import { TShirt } from "../clothes/TShirt"
import { Shirt } from "../clothes/Shirt"
import { Pant } from "../clothes/Pant"
import { Dress } from "../clothes/Dress"
import { Jacket } from "../clothes/Jacket"
import { Hooded } from "../clothes/Hooded"

export function basePriceByModel( currentModel ){
    switch ( currentModel ) {
        case 'TShirt':
            return 10

        case 'Shirt':
            return 15

        case 'Pant':
            return 12

        case 'Dress':
            return 30

        case 'Jacket':
            return 25

        case 'Hooded':
            return 18

        default:
            return TShirt
    }
}