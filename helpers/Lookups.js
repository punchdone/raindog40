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

export async function translationOE(description) {
    // console.log(description);
    const taxonomyDetail = await axios('/api/taxonomy');
    const tax = taxonomyDetail.data.filter((taxonomy) => taxonomy.equivalentOE === description);
    // console.log('tax', tax);
    return tax[0]._id;
};

export async function finishTranslationOE(description) {
    // console.log(description);
    const finishDetail = await axios('/api/products/finishes');
    const fin = finishDetail.data.filter((finish) => finish.equivalentOE === description);
    // console.log('fin', fin);
    return fin[0]._id;
};
    