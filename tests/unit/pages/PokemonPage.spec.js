import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";



describe('PokemonPage Component', () => {
    
    let wrapper

    beforeEach(() => {
        wrapper =  shallowMount( PokemonPage )
    })

    
    // test('debde de hacer match con el snapshot', () => {
        
    // })
    
    test('debe de llamar el mixPokemonArray al montar',  () => {
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )
        shallowMount( PokemonPage )

        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    })
    
    test('debde de hacer match con el snapshotcuando carga el componente', () => {
        
        const wrapper =  shallowMount( PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message:'',
                    diabledOptions: false
                }
            }
        })


        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de mostrar los componentes de pokemon picture y pokemon options', () => {
        
        
        const wrapper =  shallowMount( PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message:'',
                    diabledOptions: false
                }
            }
        })

        const options = wrapper.find('pokemon-optios-stub')
        const picture = wrapper.find('pokemon-picture-stub')


        expect( options.exists() ).toBeTruthy();
        expect( picture.exists() ).toBeTruthy();

        expect(  options.attributes('pokemons') ).toBeTruthy()
        expect(  picture.attributes('pokemonid') ).toBe( '1' )


    })
    
    test('Pruebas del componente CheckAnswer', async () => {
        
        const wrapper =  shallowMount( PokemonPage, {
            data(){
                return{
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message:'',
                    diabledOptions: false
                }
            }
        })

        await wrapper.vm.checkAnser( 1 )

        expect( wrapper.find('h2').exists() ).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBeTruthy()
        expect( wrapper.find('h2').text() ).toBe( `Correcto ${ pokemons[0].name }` )

        await wrapper.vm.checkAnser( 2 )

        expect( wrapper.vm.message ).toBe( `Oops, era ${ pokemons[0].name }` )
    })
    
})
