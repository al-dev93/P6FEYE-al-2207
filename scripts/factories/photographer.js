function photographerFactory(data, page) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const shortAddress = `${city}, ${country}`;
    const pricePerDay = `${price}€/jour`;
    const link = `/photographer.html?id=${id}`;
    const currentPage = page;

    /* création de la carte photographe dans une balise article
    ** englobée dans une balise a pour réaliser le lien vers la
    ** page photographe   */
    function getUserCardDOM() {
        const paragraph = getHeaderPhotographDOM();
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
        const linkPhotographer = document.createElement( 'a' );
        linkPhotographer.setAttribute( 'href', link );
        linkPhotographer.setAttribute( 'role', 'link' );
        linkPhotographer.setAttribute( 'aria-hidden', 'true' );
        linkPhotographer.appendChild(article);

        return (linkPhotographer);
    }
    /* insertion de l'adresse et du slogan dans une balise p 
    ** pour intégration dans la page photographe            */
    function getHeaderPhotographDOM() {
        const paragraph = document.createElement( 'p' );
        const address = document.createElement( 'address');
        address.textContent = shortAddress;
        const slogan = document.createElement( 'span');
        slogan.textContent = tagline;
        paragraph.appendChild(address);
        paragraph.appendChild(slogan);

        return(paragraph)
    }

    /* si page courante photographe: transmision du
    ** paragraphe réalisé par getHeaderPhotographDOM  */
    if(currentPage === 'Fisheye - photographe') {
        return { name, picture, getHeaderPhotographDOM };
    /* si page courante index: transmission de la
    ** carte réalisée par getUserCardDOM              */
    }else if(currentPage === 'Fisheye') {
        return { name, picture, getUserCardDOM };
    }
}