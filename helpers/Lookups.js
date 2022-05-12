import axios from "axios";

export async function rwTaxonomyLookup(tid) {
    const termDetail = await axios('https://dev-raindog.pantheonsite.io/rest/entity_taxonomy_term/' + tid+ '.json');
    return termDetail.data.name;
}

export async function taxonomyLookup(taxId) {
    const taxonomyDetail = await axios('/api/taxonomy/' + taxId);
    console.log(taxonomyDetail);
    return taxonomyDetail.data.title;
};