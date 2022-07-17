function photographerFactory(data, page) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const shortAddress = `${city}, ${country}`;
    const pricePerDay = `${price}€/jour`;
    const link = `/photographer.html?id=${id}`;
    const currentPage = page;

    function getUserCardDOM() {
        if(currentPage === 'Fisheye - photographe') {
            // pour insertion dans la page photographe
            return (getSloganAddress());
        }else if(currentPage === 'Fisheye') {
            // pour insertion dans la page d'accueil
            return (getCard(getSloganAddress()));
        }
    }
    /* création de la carte photographe et de son lien attaché **
    ** pour la page d'accueil                                  */
    function getCard(paragraph) {
        // insertion du coût journalier dans le paragraphe transmis
        const cost = document.createElement( 'span' );
        cost.textContent = pricePerDay;
        paragraph.appendChild(cost);
        // création du corps de la carte dans une balise article
        const article = document.createElement( 'article' );
        article.setAttribute( 'role', 'article');
        article.setAttribute( 'aria-hidden', "false");
        article.setAttribute( 'aria-label', 'Cliquez pour voir les réalisations de');
        // création de l'image de la carte
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("role", img);
        img.setAttribute("alt", "");
        // création du titre de la carte
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        // insertion de l'image, du titre et du paragaphe dans la carte
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(paragraph);
        // insertion de la carte dans une balise a pour réaliser le lien
        const card = document.createElement( 'a' );
        card.setAttribute( 'href', link );
        card.setAttribute( 'role', 'link' );
        card.setAttribute( 'aria-hidden', 'true' );
        card.appendChild(article);

        return (card);
    }
    /* création de l'adresse et du slogan pour intégration ** 
    ** dans la carte ou dans la page photographe           */
    function getSloganAddress() {
        const paragraph = document.createElement( 'p' );
        const address = document.createElement( 'address');
        const slogan = document.createElement( 'span');
        address.textContent = shortAddress;
        slogan.textContent = tagline;
        paragraph.appendChild(address);
        paragraph.appendChild(slogan);

        return(paragraph)
    }
    // retour de la photographer factory
    return { name, picture, getUserCardDOM };
}