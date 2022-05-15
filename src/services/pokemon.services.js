import axios from "axios";
import { BASE_URL } from "../constants/commons";

export async function getPokemonList() {
    let pokemons = [];
    const data = await axios
        .get(BASE_URL + "/pokemon/?limit=898")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return null;
        });
    for (let i = 0; i < data.results.length; i++) {
        pokemons.push({
            id: i + 1,
            name: data.results[i].name,
            types: [],
        });
    }
    const res = getAllTypes(pokemons);
    return res;
}

async function getAllTypes(pokeList) {
    let pokemons = [...pokeList];
    for (let i = 0; i < 18; i++) {
        let url = `${BASE_URL}/type/${i + 1}`;
        const data = await axios
            .get(url)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return null;
            });
        if (data) {
            const pokemonInType = data.pokemon;
            for (let j = 0; j < pokemonInType.length; j++) {
                const pokemonId = pokemonInType[j].pokemon.url
                    .replace("https://pokeapi.co/api/v2/pokemon/", "")
                    .replace("/", "");

                if (pokemonId <= pokemons.length) {
                    try {
                        pokemons[pokemonId].types.push(data.name);
                    } catch (error) {
                        
                    }
                }
            }
        }
    }
    return pokemons;
}

export async function getPokemonInfo(id){
    const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species/' + id;
    const responsePokemon = await fetch(urlPokemon);
    const responseSpecies = await fetch(urlSpecies);
    const pokemon = await responsePokemon.json();
    const species = await responseSpecies.json();

    const reponseEvolutions = await fetch(species.evolution_chain.url);
    const evolution_chain = await reponseEvolutions.json();
}