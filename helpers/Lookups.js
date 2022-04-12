import axios from "axios";

export default async function taxonomyLookup(tid) {
    const termDetail = await axios('https://dev-raindog.pantheonsite.io/rest/entity_taxonomy_term/' + tid+ '.json');
    return termDetail.data.name;
}