const resultAera = document.getElementById("result");
const loadingAera = document.getElementById("loading");

let lang = 'fr';
let loading = 0;
let offset = 0;
const getAllPokemons = async () => {
    const listePokemons = [];
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=900`;
    const AllPokemons = await fetch(url).then(
        response => {
            if (response.ok){
                return response.json();
            }
            throw new Error('Request failed!');
        }
    ).then(
        jsonResponse => {
            return jsonResponse;
        }
    )
    
    const NbPokemons = AllPokemons.results.length;
    listePokemons.push(NbPokemons);
    for (let i = 0; i < NbPokemons; i++){
        listePokemons.push([AllPokemons.results[i].name, AllPokemons.results[i].url]);
        loading++
        refreshLoading();
        console.log(loading)
    }

    return listePokemons
}
const resumeInfo = async (PokemonTradResult,PokemonInfoResult,pokemonIndex,listePokemons) => {

    let pokemonId;
    let pokemonName;
    let tradPokemonName;
    let isPokemonLegendary;
    let isPokemonMythical;
    let pokemonType = {};
    let pokemonStats = {};
    let pokemonImg;

    pokemonId = PokemonTradResult.id;
    pokemonName = PokemonTradResult.name;
    for (let i = 0; i < PokemonTradResult.names.length; i++){
        if (PokemonTradResult.names[i].language.name === lang){
            tradPokemonName = PokemonTradResult.names[i].name;
        }
    }
    console.log(pokemonName,tradPokemonName);
    if (pokemonIndex > 898){
        pokemonName = PokemonInfoResult.forms[0].name;
        console.log(pokemonName,tradPokemonName);
        if (pokemonName.indexOf("-mega") >= 0){
            tradPokemonName = "Méga-" + tradPokemonName;
            if (pokemonName.indexOf("-mega-x") >= 0){
                tradPokemonName += " X";
            }else if (pokemonName.indexOf("-mega-y") >= 0){
                tradPokemonName += " Y";
            }
        }else if (pokemonName.indexOf("-gmax") >= 0){
            tradPokemonName += " Gigamax";
            if (pokemonName.indexOf("-amped-gmax") >= 0){
                tradPokemonName += " (Forme Aigüe)";
            }else if (pokemonName.indexOf("-low-key-gmax") >= 0){
                tradPokemonName += " (Forme Grave)";
            }else if (pokemonName.indexOf("-single-strike-gmax") >= 0){
                tradPokemonName += " (Style Poing Final)";
            }else if (pokemonName.indexOf("-rapid-strike-gmax") >= 0){
                tradPokemonName += " (Style Mille Poings)";
            }
        }else if (pokemonName.indexOf("eternatus-eternamax") >= 0){
            tradPokemonName += " Infinimax";
        }else if (pokemonName.indexOf("-eternal") >= 0){
            tradPokemonName += " (Fleur Eternelle)";
        }else if (pokemonName.indexOf("-black") >= 0){
            tradPokemonName += " Noir";
        }else if (pokemonName.indexOf("-white") >= 0){
            tradPokemonName += " Blanc";
        }else if (pokemonName.indexOf("-female") >= 0){
            tradPokemonName += " (Femelle)";
        }else if (pokemonName.indexOf("-therian") >= 0){
            tradPokemonName += " (Forme Totémique)";
        }else if (pokemonName.indexOf("-pirouette") >= 0){
            tradPokemonName += " (Forme Danse)";
        }else if (pokemonName.indexOf("-resolute") >= 0){
            tradPokemonName += " (Aspect Décidé)";
        }else if (pokemonName.indexOf("-resolute") >= 0){
            tradPokemonName += " (Aspect Décidé)";
        }else if (pokemonName.indexOf("-galar") >= 0){
            tradPokemonName += " de Galar";
        }else if (pokemonName.indexOf("-alola") >= 0){
            tradPokemonName += " d'Alola";
        }else if (pokemonName.indexOf("-unbound") >= 0){
            tradPokemonName += " (Forme Déchaînée)";
        }else if (pokemonName.indexOf("zacian-crowned") >= 0){
            tradPokemonName += " (Épée Suprême)";
        }else if (pokemonName.indexOf("zamazenta-crowned") >= 0){
            tradPokemonName += " (Bouclier Suprême)";
        }else if (pokemonName.indexOf("-rapid-strike") >= 0){
            tradPokemonName += " (Style Mille Poings)";
        }else if (pokemonName.indexOf("-ice-rider") >= 0){
            tradPokemonName += "  Cavalier du Froid";
        }else if (pokemonName.indexOf("-shadow-rider") >= 0){
            tradPokemonName += "  Cavalier d'Effroi";
        }else if (pokemonName.indexOf("-attack") >= 0){
            tradPokemonName += " (Forme Attaque)";
        }else if (pokemonName.indexOf("-defense") >= 0){
            tradPokemonName += " (Forme Defense)";
        }else if (pokemonName.indexOf("-speed") >= 0){
            tradPokemonName += " (Forme Vitesse)";
        }else if (pokemonName.indexOf("zygarde") >= 0){
            if (pokemonName.indexOf("-10") >= 0){
                tradPokemonName += " (Forme 10%)";
            }else if (pokemonName.indexOf("-50") >= 0){
                tradPokemonName += " (Forme 50%)";
            }else if (pokemonName.indexOf("-complete") >= 0){
                tradPokemonName += " (Forme Parfaite)";
            }
        }else if (pokemonName.indexOf("-heat") >= 0){
            tradPokemonName += " (Forme Chaleur)";
        }else if (pokemonName.indexOf("-wash") >= 0){
            tradPokemonName += " (Forme Lavage)";
        }else if (pokemonName.indexOf("-frost") >= 0){
            tradPokemonName += " (Forme Froid)";
        }else if (pokemonName.indexOf("-fan") >= 0){
            tradPokemonName += " (Forme Hélice)";
        }else if (pokemonName.indexOf("-mow") >= 0){
            tradPokemonName += " (Forme Tonte)";
        }else if (pokemonName.indexOf("-sky") >= 0){
            tradPokemonName += " (Forme Céleste)";
        }else if (pokemonName.indexOf("-zen") >= 0){
            tradPokemonName += " (Mode Transe)";
        }if (pokemonName.indexOf("-zen-galar") >= 0){
            tradPokemonName += " de Galar (Mode Transe)";
        }else if (pokemonName.indexOf("-ash") >= 0){
            tradPokemonName = "Sachanobi (Amphinobi Forme Sacha)";
        }else if (pokemonName.indexOf("-battle-bond") >= 0){
            tradPokemonName += " (Synergie)";
        }else if (pokemonName.indexOf("-origin") >= 0){
            tradPokemonName += " (Forme Originelle)";
        }else if (pokemonName.indexOf("-blue-striped") >= 0){
            tradPokemonName += " (Bleu)";
        }else if (pokemonName.indexOf("necrozma-dusk") >= 0){
            tradPokemonName += " Crinière du Couchant";
        }else if (pokemonName.indexOf("necrozma-dawn") >= 0){
            tradPokemonName += " Ailes de l'Aurore";
        }else if (pokemonName.indexOf("necrozma-ultra") >= 0){
            tradPokemonName = "Ultra-Necrozma";
        }else if (pokemonName.indexOf("-noice") >= 0){
            tradPokemonName += " (Tête Dégel)";
        }else if (pokemonName.indexOf("-low-key") >= 0){
            tradPokemonName += " (Forme Grave)";
        }else if (pokemonName.indexOf("castform-sunny") >= 0){
            tradPokemonName += " (Solaire)";
        }else if (pokemonName.indexOf("castform-rainy") >= 0){
            tradPokemonName += " (Eau de Pluie)";
        }else if (pokemonName.indexOf("castform-snowy") >= 0){
            tradPokemonName += " (Blizzard)";
        }else if (pokemonName.indexOf("-primal") >= 0){
            tradPokemonName = "Primo-" + tradPokemonName;
        }else if (pokemonName.indexOf("-busted") >= 0){
            tradPokemonName += " (Forme Démasquée)";
        }else if (pokemonName.indexOf("-small") >= 0){
            tradPokemonName += " (Taille Mini)";
        }else if (pokemonName.indexOf("-large") >= 0){
            tradPokemonName += " (Taille Maxi)";
        }else if (pokemonName.indexOf("-super") >= 0){
            tradPokemonName += " (Taille Ultra)";
        }
    }
    if (pokemonName.indexOf("oricorio") >= 0){
        if (pokemonName.indexOf("-pom-pom") >= 0){
            tradPokemonName += " (Style Pom-Pom)";
        }else if (pokemonName.indexOf("-pau") >= 0){
            tradPokemonName += " (Style Hula)";
        }else if (pokemonName.indexOf("-sensu") >= 0){
            tradPokemonName += " (Style Buyō)";
        }else{
            tradPokemonName += " (Style Flamenco)";
        }
    }else if (pokemonName.indexOf("lycanroc") >= 0){
        if (pokemonName.indexOf("-midnight") >= 0){
            tradPokemonName += " (Forme Nocturne)";
        }else if (pokemonName.indexOf("-dusk") >= 0){
            tradPokemonName += " (Forme Crépusculaire)";
        }else{
            tradPokemonName += " (Forme Diurne)";
        }
    }else if (pokemonName.indexOf("wormadam") >= 0){    
        if (pokemonName.indexOf("-sandy") >= 0){
            tradPokemonName += " (Cape Sable)";
        }else if (pokemonName.indexOf("-trash") >= 0){
            tradPokemonName += " (Cape Déchet)";
        }else{
            tradPokemonName += " (Cape Plante)";
        } 
    }else if (pokemonName.indexOf("aegislash") >= 0){
        if (pokemonName.indexOf("-blade") >= 0){
            tradPokemonName += " (Forme Assaut)";
        }else{
            tradPokemonName += " (Forme Parade)";
        }
    }else if (pokemonName.indexOf("pikachu") >= 0){
        if (pokemonName.indexOf("-rock-star") >= 0){
            tradPokemonName += "  Rockeur";
        }else if (pokemonName.indexOf("-belle") >= 0){
            tradPokemonName += " Lady";
        }else if (pokemonName.indexOf("-pop-star") >= 0){
            tradPokemonName += " Star";
        }else if (pokemonName.indexOf("-phd") >= 0){
            tradPokemonName += " Docteur";
        }else if (pokemonName.indexOf("-libre") >= 0){
            tradPokemonName += " Catcheur";
        }else if (pokemonName.indexOf("-cosplay") >= 0){
            tradPokemonName += " Cosplay";
        }else if (pokemonName.indexOf("-original-cap") >= 0){
            tradPokemonName = "Pikachu (Casquette Originale)";
        }else if (pokemonName.indexOf("-hoenn-cap") >= 0){
            tradPokemonName += " (Casquette de Hoenn)";
        }else if (pokemonName.indexOf("-sinnoh-cap") >= 0){
            tradPokemonName += " (Casquette de Sinnoh)";
        }else if (pokemonName.indexOf("-unova-cap") >= 0){
            tradPokemonName += " (Casquette d'Unys)";
        }else if (pokemonName.indexOf("-kalos-cap") >= 0){
            tradPokemonName += " (Casquette de Kalos)";
        }else if (pokemonName.indexOf("-alola-cap") >= 0){
            tradPokemonName = "Pikachu (Casquette d'Alola)";
        }else if (pokemonName.indexOf("-partner-cap") >= 0){
            tradPokemonName += " (Casquette Partenaire)";
        }
    }   
    isPokemonLegendary = PokemonTradResult.is_legendary;
    isPokemonMythical = PokemonTradResult.is_mythical;
    if (PokemonInfoResult.types.length === 2){
        pokemonType.type1 = PokemonInfoResult.types[0].type.name;
        pokemonType.type2 = PokemonInfoResult.types[1].type.name;
    }else{
        pokemonType.type1 = PokemonInfoResult.types[0].type.name;
    }
    pokemonStats.hp = PokemonInfoResult.stats[0].base_stat;
    pokemonStats.attack = PokemonInfoResult.stats[1].base_stat;
    pokemonStats.defense = PokemonInfoResult.stats[2].base_stat;
    pokemonStats.spAttack = PokemonInfoResult.stats[3].base_stat;
    pokemonStats.spDefense = PokemonInfoResult.stats[4].base_stat;
    pokemonStats.speed = PokemonInfoResult.stats[5].base_stat;
    pokemonStats.total = pokemonStats.hp + pokemonStats.attack + pokemonStats.defense + pokemonStats.spAttack + pokemonStats.spDefense + pokemonStats.speed;
    
    pokemonImg = PokemonInfoResult.sprites.other["official-artwork"].front_default;

    if (pokemonName === "toxtricity"){
        pokemonImg = "PokeImg/Toxtricity.png"
    }
    if (pokemonName === "indeedee"){
        pokemonImg = "PokeImg/Indeedee.png"
    }
    if (pokemonImg === null || pokemonName.indexOf("castform-sunny") >= 0 || pokemonName.indexOf("castform-rainy") >= 0 || pokemonName.indexOf("castform-snowy") >= 0 || pokemonName.indexOf("darmanitan-zen") >= 0){

        pokemonImg = PokemonInfoResult.sprites.front_default;
        if (pokemonName.indexOf("castform-sunny") >= 0){
            nbOfCastform = 0
        }else if (pokemonName.indexOf("castform-rainy") >= 0){
            nbOfCastform = 1
        }else if (pokemonName.indexOf("castform-snowy") >= 0){
            nbOfCastform = 2
        }
        if (pokemonName.indexOf("castform") >= 0){
            pokemonImg = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${10028+(nbOfCastform)}`).then(
                response => {
                    if (response.ok){
                        return response.json();
                    }
                    throw new Error('Request failed!');
                }
            ).then(
                jsonResponse => {
                    return jsonResponse.sprites.front_default;
                }
            )
        }else if (tradPokemonName === "Darumacho (Mode Transe)"){

            pokemonImg = await fetch(`https://pokeapi.co/api/v2/pokemon-form/10067`).then(
                response => {
                    if (response.ok){
                        return response.json();
                    }
                    throw new Error('Request failed!');
                }
            ).then(
                jsonResponse => {
                    return jsonResponse.sprites.front_default;
                }
            )
        }else if (tradPokemonName === "Darumacho de Galar (Mode Transe)"){

            pokemonImg = await fetch(`https://pokeapi.co/api/v2/pokemon/10175/`).then(
                response => {
                    if (response.ok){
                        return response.json();
                    }
                    throw new Error('Request failed!');
                }
            ).then(
                jsonResponse => {
                    return jsonResponse.sprites.front_default;
                }
            )
        }

    }
    loading++;
    refreshLoading();
    return [pokemonId, pokemonName, tradPokemonName, isPokemonLegendary, isPokemonMythical, pokemonType, pokemonStats, pokemonImg];
}
const getPokemonInfo = async (pokemonTradUrl, pokemonInfoUrl, pokemonIndex, listePokemons) => {
    loading++;
    refreshLoading();
    console.log(loading);

    let PokemonTradResult;
    let PokemonInfoResult;

    // Fetch Pokémon translations with error handling
    try {
        PokemonTradResult = await fetch(pokemonTradUrl).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        });
    } catch (error) {
        console.warn(`Erreur lors de la récupération des traductions pour le Pokémon ${pokemonIndex}:`, error);
        PokemonTradResult = null; // Valeur par défaut si la requête échoue
    }

    // Fetch Pokémon info with error handling
    try {
        PokemonInfoResult = await fetch(pokemonInfoUrl).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        });
    } catch (error) {
        console.warn(`Erreur lors de la récupération des informations pour le Pokémon ${pokemonIndex}:`, error);
        PokemonInfoResult = null; // Valeur par défaut si la requête échoue
    }

    if (PokemonTradResult && PokemonInfoResult) {
        const PokemonInfo = resumeInfo(PokemonTradResult, PokemonInfoResult, pokemonIndex, listePokemons);
        loading++;
        refreshLoading();
        console.log(loading);
        return PokemonInfo;
    } else {
        console.warn(`Impossible de générer les informations pour le Pokémon ${pokemonIndex} en raison d'erreurs.`);
        loading++;
        refreshLoading();
        return null; // Valeur par défaut si une partie des données manque
    }
};
const fillPokemonsList = async(listePokemons) => {
    const Pokemons = [];
    const searchOffset = offset;
    Pokemons[0] = listePokemons[0];
    const promiseList = [];
    if (offset === 0){
        offset = 1;
    }
    for (let i = offset; i < listePokemons[0] + offset; i++){
        let pokemonTradUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        let pokemonInfoUrl = listePokemons[i-searchOffset][1];
        if (i > 898){
            pokemonTradUrl = `https://pokeapi.co/api/v2/pokemon-species/${listePokemons[i-searchOffset][0].split('-')[0]}`;
            if (listePokemons[i-searchOffset][0] === "kommo-o-totem" || listePokemons[i-searchOffset][0] === "mr-mime-galar"){
                pokemonTradUrl = `https://pokeapi.co/api/v2/pokemon-species/${listePokemons[i-searchOffset][0].split('-')[0] + '-' + listePokemons[i-searchOffset][0].split('-')[1]}`;
            }
        }
        promiseList.push(getPokemonInfo(pokemonTradUrl,pokemonInfoUrl,i,listePokemons))
    }

    const resultsList = await Promise.all(promiseList);

    loading++
    refreshLoading();
    console.log(loading);
    for (let i = 1; i < listePokemons[0]+1; i++){

        Pokemons[i] = {};
        Pokemons[i].id = resultsList[i-1][0];
        Pokemons[i].name = resultsList[i-1][1];
        Pokemons[i].tradName = resultsList[i-1][2];
        Pokemons[i].isLegendary = resultsList[i-1][3];
        Pokemons[i].isMythical = resultsList[i-1][4];
        Pokemons[i].types = resultsList[i-1][5];
        Pokemons[i].stats = resultsList[i-1][6];
        Pokemons[i].img = resultsList[i-1][7];
    }

    return Pokemons;
}
const displayPokemons = (Pokemon) => {
    let totalStats = Pokemon.stats.total;
    let type1 = Pokemon.types.type1[0].toUpperCase() + Pokemon.types.type1.slice(1);
    let type2 = '';
    let legOrMyth = "basic";
    let typesTrad = {
        fire : "Feu",
        water : "Eau",
        grass : "Plante",
        bug : "Insecte",
        ice : "Glace",
        ghost : "Spectre",
        dark : "Ténèbre",
        electric : "Electrik",
        ground : "Sol",
        rock : "Roche",
        flying : "Vol",
        fairy : "Fée",
        steel : "Acier",
        psychic : "Psy",
        dragon : "Dragon",
        fighting : "Combat",
        normal : "Normal",
        poison : "Poison"
    };
    let nbTypes = "twoTypes";
    if (Pokemon.isLegendary){
        legOrMyth = "leg";
    }else if (Pokemon.isMythical){
        legOrMyth = "myth";
    }
    if (Pokemon.types.type2 === undefined){
        nbTypes = "oneType"
    }else{
        type2 = Pokemon.types.type2[0].toUpperCase() + Pokemon.types.type2.slice(1);
    }
    if (Pokemon.stats.total > 780){
        Pokemon.stats.total = 780;
    }
    if (Pokemon.name.indexOf("-totem") < 0 && Pokemon.name.indexOf("minior-") < 0  || Pokemon.name.indexOf("minior-red") >= 0){
        $(resultAera).append(`
        <div class="card">
        <div class="header">
            <div class="id">${Pokemon.id}</div>
            <div class="name">${Pokemon.tradName[0].toUpperCase() + Pokemon.tradName.slice(1)}</div>
            <div class=${legOrMyth}></div>
        </div>
        <div class="main">
            <div id="imgContainer" class="img">
                <img src="${Pokemon.img}" alt="Votre connexion est instable ou lente">
            </div>
            <div id="typesContainer" class="types ${nbTypes}">
                <p class="${Pokemon.types.type1}">${typesTrad[type1.toLowerCase()]}</p>
                <p class="${Pokemon.types.type2}">${typesTrad[type2.toLowerCase()]}</p>
            </div>
        </div>
        <div class="footer">
            <div class="hidedStat" onclick="displayStats(this);">
            <p>Voir les stats</p>
            </div>
            <div id="statsContainer" class="displayedStat" style="opacity: 0; display: none;">
            <div class="statRow">
                <p>PV:</p>
                <div class="statBarContainer">
                <div class="statBar HP" style="width: ${Pokemon.stats.hp/255*100}%">${Pokemon.stats.hp}</div>
                </div>
            </div>
            <div class="statRow">
                <p>Attaque:</p>
                <div class="statBarContainer">
                <div class="statBar Attack" style="width: ${Pokemon.stats.attack/190*100}%">${Pokemon.stats.attack}</div>
                </div>
            </div>
            <div class="statRow">
                <p>Défense:</p>
                <div class="statBarContainer">
                <div class="statBar Defense" style="width: ${Pokemon.stats.defense/250*100}%">${Pokemon.stats.defense}</div>
                </div>
            </div>
            <div class="statRow">
                <p>Atq Spé:</p>
                <div class="statBarContainer">
                <div class="statBar SpeAtk" style="width: ${Pokemon.stats.spAttack/194*100}%">${Pokemon.stats.spAttack}</div>
                </div>
            </div>
            <div class="statRow">
                <p>Déf Spé:</p>
                <div class="statBarContainer">
                <div class="statBar SpeDef" style="width: ${Pokemon.stats.spDefense/250*100}%">${Pokemon.stats.spDefense}</div>
                </div>
            </div>
            <div class="statRow">
                <p>Vitesse:</p>
                <div class="statBarContainer">
                <div class="statBar Speed" style="width: ${Pokemon.stats.speed/200*100}%">${Pokemon.stats.speed}</div>
                </div>
            </div>
            <div class="statRow">
                <p>Total:</p>
                <div class="statBarContainer">
                <div class="statBar Total" style="width: ${Pokemon.stats.total/780*100}%">${totalStats}</div>
                </div>
            </div>
            </div>
        </div>
        </div>`);
    }
}
const refreshLoading = () => {
    loadingAera.setAttribute("style",`width: ${loading*100/4473}%;`);
    $(loadingAera).html(Math.trunc(loading*100/4473)+1 + "%");
    if (Math.trunc(loading*100/4473) >= 100){
        $(loadingAera).html(100);
        loadingAera.parentNode.parentNode.setAttribute("style",`display: none;`);
    }
}
const searchPokemon = (input) => {
    let cards = resultAera.children;
    let nbResults = 0;
    $(".noResult").remove()
    for (let i = 0; i <= cards.length - 1; i++){
        let pokemonName = cards[i].children[0].children[1].innerHTML.toLowerCase();
        cards[i].setAttribute("style","display: none;")

        if (pokemonName.indexOf("é") >= 0){
            pokemonName = pokemonName.replace(/é/gi,"e");
        }
        if (pokemonName.indexOf("è") >= 0){
            pokemonName = pokemonName.replace(/è/gi,"e");
        }
        if (pokemonName.indexOf("ç") >= 0){
            pokemonName = pokemonName.replace(/ç/gi,"c");
        }
        if (pokemonName.indexOf("ê") >= 0){
            pokemonName = pokemonName.replace(/ê/gi,"e");
        }
        if (pokemonName.indexOf("ï") >= 0){
            pokemonName = pokemonName.replace(/ï/gi,"i");
        }
        
        if (pokemonName.indexOf(input.toLowerCase()) >= 0){
            cards[i].setAttribute("style","display: block;");
            nbResults++;
        }
    }
    if (nbResults === 0){
        $(resultAera).append(`<h1 class="noResult">Aucun résultat</h1>`)
    }
}


getAllPokemons()
.then(
    listePokemons => fillPokemonsList(listePokemons)
).then(
    listePokemons => {
        listePokemons.sort(function compare(a, b) {
            if (a.id < b.id)
               return -1;
            if (a.id > b.id)
               return 1;
            return 0;
        });
        console.log(listePokemons);
        for (let i = 1; i<listePokemons[0]+1;i++){
            displayPokemons(listePokemons[i]);
        }
    }   
);


const displayStats = (e) => {

    if (e.nextElementSibling.style.display === "none"){
        e.innerHTML = "<p>Cacher les stats</p>";
        e.nextElementSibling.style.display = "flex";
        e.nextElementSibling.style.opacity = 1;
        e.parentNode.previousElementSibling.children[1].setAttribute("style","height: 40px;")
        e.parentNode.previousElementSibling.children[0].setAttribute("style","height: 150px;")
        e.parentNode.previousElementSibling.children[0].children[0].setAttribute("style","max-height: 150px; max-width: 150px")
    }else{
        e.innerHTML = "<p>Voir les stats</p>";
        e.nextElementSibling.style.display = "none";
        e.nextElementSibling.style.opacity = 0;
        e.parentNode.previousElementSibling.children[1].removeAttribute("style")
        e.parentNode.previousElementSibling.children[0].removeAttribute("style")
        e.parentNode.previousElementSibling.children[0].children[0].removeAttribute("style")
    }
}
