import axios from 'axios';

import TaxonomyModule from '../../components/products/taxonomy/TaxonomyModule';

function TaxonomyPage(props) {
    // console.log(props.types);
    return (
        <TaxonomyModule types={props.types} />
    )
};

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/taxonomy');
    const types = await res.json();
    return {
        props: {
            types
        }
    }
};

export default TaxonomyPage;