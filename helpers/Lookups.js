import axios from "axios";

export async function rwTaxonomyLookup(tid) {
    const termDetail = await axios('https://dev-raindog.pantheonsite.io/rest/entity_taxonomy_term/' + tid+ '.json');
    return termDetail.data.name;
}

export async function taxonomyLookup(directionCode) {
    const taxonomyDetail = await axios('http://localhost:3000/api/products/taxonomy/' + directionCode);
    return taxonomyDetail.data.title;
};