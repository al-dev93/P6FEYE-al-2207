function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const shortAddress = `${city}, ${country}`;
    const pricePerDay = `${price}€/jour`;

    function getUserCardDOM() {
        //création de l'architecture de la card photographe
        const article = document.createElement( 'article' );
        article.setAttribute("role", "article");
        article.setAttribute("aria-label", "Cliquez pour voir les réalisations de");
        article.setAttribute("tabindex", "0");
        //création de l'en-tête de la card photographe:image et titre
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("role", img);
        img.setAttribute("alt", "");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        //création du contenu textuel de la card        
        const address = document.createElement( 'address');
        address.textContent = shortAddress;
        const slogan = document.createElement( 'span');
        slogan.textContent = tagline;
        slogan.setAttribute("class", "sloganPhotographer");
        const cost = document.createElement( 'span' );
        cost.setAttribute("class", "pricePerDay");
        cost.textContent = pricePerDay;
        
        //insertion des noeuds constituant la card photographe dans la balise article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(address);
        article.appendChild(slogan);
        article.appendChild(cost);
        //retourne la carte photographe
        return (article);
    }
    return { name, picture, getUserCardDOM }
}