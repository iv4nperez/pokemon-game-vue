<template>
    <h1 v-if="!pokemon">Espere por favor...</h1>

    <div v-else>
        <h1>Quien es este pokemon?</h1>

        <PokemonPicture
            :pokemonId="pokemon.id"
            :showPokemon="showPokemon"
        />

        <PokemonOptios
            :pokemons="pokemonArr"
            @selection="checkAnser"
        />

       <template v-if="showAnswer" class="fade-in">
            <h2>{{ message }}</h2>
            <button @click="newGame">
                Nuevo Juego
            </button>
       </template>


    </div>
</template>
<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import getPokemonOptions from '@/helpers/getPokemonOptions'



export default {
    components: {
        PokemonPicture  : defineAsyncComponent( () => import('@/components/PokemonPicture.vue') ),
        PokemonOptios  : defineAsyncComponent( () => import('@/components/PokemonOptions.vue') )
    },
    data(){
        return{
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message:''
        }
    },
    methods: {
        async mixPokemonArray () {
            this.pokemonArr = await getPokemonOptions()

            const rndInt = Math.floor( Math.random() * 4 )
            this.pokemon = this.pokemonArr[ rndInt ]
        },
        checkAnser ( selectedId ) {
            this.showPokemon = true
            this.showAnswer = true

            if ( selectedId === this.pokemon.id) {
                this.message = `Correcto ${ this.pokemon.name }`
            } else {
                this.message = `Oops, era ${ this.pokemon.name }`
            }
        },
        newGame () {
            this.showPokemon = false
            this.showAnswer = false
            this.message = ''
            this.pokemonArr = []
            this.pokemon = null

            this.mixPokemonArray()
        }
    },
    mounted () {
        this.mixPokemonArray();
    }
}
</script>