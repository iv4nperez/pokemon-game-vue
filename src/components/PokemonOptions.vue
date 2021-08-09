<template>
    <div class="options-container">
        <ul>
            <li :class="`${ diabledOptions ? 'disabled' : '' }`"  v-for="pokemon in pokemons" :key="pokemon.id" @click="$emit( 'selection', pokemon.id )" >
                {{ pokemon.name }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {    
    props: {
        pokemons:{
            type: Array,
            required: true
        },
        diabledOptions:{
            type: Boolean,
            required: true,
            default: false
        }
    }
}
</script>
<style scoped>
    ul {
        list-style-type: none;
    }
    li {
        background-color: white;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        cursor: pointer;
        margin-bottom: 10px;
        width: 250px;
        padding: 7px;
    }

    li:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    .options-container {
        display: flex;
        justify-content: center;
    }

    .disabled {
        pointer-events:none; 
        opacity:0.6;        
    }
</style>