function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const pageLink = `/photographer.html?id=${id}`;
    const picture = `assets/photographers/${portrait}`;
    const shortAddress = `${city}, ${country}`;
    const pricePerDay = `${price}€/jour`;

    function getUserCardDOM() {
        //création de l'architecture de la card photographe
        const linkPhotographer = document.createElement( 'a' );
        linkPhotographer.setAttribute("href", pageLink);
        linkPhotographer.setAttribute("class", 'linkPhotographer');
        const article = document.createElement( 'article' );
        const paragraph = document.createElement( 'p');

        //création du contenu textuel de la card dans une balise p        
        const address = document.createElement( 'address');
        address.textContent = shortAddress;
        const slogan = document.createElement( 'strong');
        slogan.textContent = tagline;
        //insertion des noeuds dans la balise p
        paragraph.appendChild(address);
        paragraph.appendChild(slogan);
        slogan.insertAdjacentText('afterend', pricePerDay);

        //création de l'en-tête de la card photographe:image et titre
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        //création des noeuds constituant la card photographe dans la balise article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(paragraph);

        //insertion de la card photographe dans une balise a pour créer le lien
        linkPhotographer.appendChild(article);
        return (linkPhotographer);
    }
    return { name, picture, getUserCardDOM }
}