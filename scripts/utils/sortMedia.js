

// eslint-disable-next-line no-unused-vars
function sortMedia(worksData, sort) {
    switch (sort) {
        case 'popularity':
            worksData.sort((a,b) =>
                -(a.likes - b.likes)            
            );
            break;

        case 'date':
            worksData.sort(descendingSortDate);
            break;
    
        case 'title':
            worksData.sort(ascendingSortTitle);
            break;

        default:
            break;
    }
}

function ascendingSortTitle(a, b) {
    if(a.title < b.title) {
        return -1;
    }
    if(a.title > b.title) {
        return 1;
    }
    return 0;
}

function descendingSortDate(a,b) {
    if(a.date < b.title) {
        return 1;
    }
    if(a.date > b.date) {
        return -1;
    }
    return 0;
}