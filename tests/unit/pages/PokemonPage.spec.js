import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";

describe('PokemonPage Component', () => {
    
    let wrapper

    beforeEach(() => {
        wrapper =  shallowMount( PokemonPage )
    })

    
    test('debde de hacer match con el snapshot', () => {
        
    })
    
    test('debe de llamar el mixPokemonArray al montar',  () => {
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )
        shallowMount( PokemonPage )

        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    })
    

})
