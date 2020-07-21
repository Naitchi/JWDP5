const getTeddies = async () => {
    try{
        const response = await fetch('/api/teddies')
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            return data
        } else {
            console.log('Retour du serveur : ',response.status)
        }
    }
    catch (error){
    console.log(error)
    }
}

const insertAResult = (selectedElement ,result) => {
    selectedElement.appendChild("li");
        selectedElement.lastChild;
        selectedElement.appendChild("div");
            selectedElement.lastChild;
            selectedElement.classList.add("mainSide__searchResults__result");
            selectedElement.appendChild("img");
            selectedElement.lastChild.href = result.imageUrl;
            console.log(selectedElement);
}
                /* 
                    <li> (done)
                        <div class="mainSide__searchResults__result"> (done)
                            <img class="mainSide__searchResults__result__photo"/>
                            <div class="mainSide__searchResults__result__text">
                                <h2 class="mainSide__searchResults__result__text__name">Lorem ipsum dolor sit</h2>
                                <p class="mainSide__searchResults__result__text_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae   velit sed nisi commodo pulvinar vitae vel nulla. Morbi ac suscipit diam.</p>
                            </div>
                            <div class="mainSide__searchResults__result__D&P">
                                <div class="mainSide__searchResults__result__D&P__Dispo">
                                    <h3 class="mainSide__searchResults__result__D&P__Dispo__title">Dispo: </h3>
                                    <img class="mainSide__searchResults__result__D&P__Dispo__status"/>
                                </div>
                                <div class="mainSide__searchResults__result__D&P__Price">
                                    <h4 class="mainSide__searchResults__result__D&P__Price__title ">Prix: </h4>
                                    <p class="mainSide__searchResults__result__D&P__Price__value">30€</p>
                                </div>
                            </div>
                        </div>
                    </li>
                */
const teddies = getTeddies()
console.log(teddies)

const searchResultsElement = document.getElementById('searchResults')
console.log(searchResultsElement)


insertAResult(searchResultsElement)
//teddies.map