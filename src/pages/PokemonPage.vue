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
            :diabledOptions="diabledOptions"
        />

       <template v-if="showAnswer" class="fade-in">
            <h2>{{ message }}</h2>
            <button class="btn-primary" @click="newGame">
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
            message:'',
            diabledOptions: false
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
            this.diabledOptions = true

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
            this.diabledOptions = false

            this.mixPokemonArray()
        }
    },
    mounted () {
        this.mixPokemonArray();
    }
}
</script>

<style scoped>

.btn-primary {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #828282;
    background: white;
}

.btn-primary:hover {
    cursor: pointer;
    -webkit-box-shadow: -1px 2px 44px -16px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px 2px 44px -16px rgba(0,0,0,0.75);
    box-shadow: -1px 2px 44px -16px rgba(0,0,0,0.75);
    }

</style>