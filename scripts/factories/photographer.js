function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const shortAddress = `${city}, ${country}`;
    const pricePerDay = `${price}€/jour`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        //création de l'image et du titre de la carte
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        //création des autres éléments dns une balise p
        const paragraph = document.createElement( 'p');
        const address = document.createElement( 'address');
        address.textContent = shortAddress;
        const slogan = document.createElement( 'strong');
        slogan.textContent = tagline;
        const newLine = document.createElement( 'BR');
        //création des noeuds dans la balise p
        paragraph.append(address, slogan, newLine, pricePerDay);
        //création des noeuds dans la balise article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(paragraph);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}