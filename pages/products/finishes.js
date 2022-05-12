import FinishModule from '../../components/products/finishes/FinishModule';

function FinishPage(props) {
    return (
        <FinishModule finishes={props.finishes} />
    )
};

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products/finishes');
    const finishes = await res.json();
    return {
        props: {
            finishes
        }
    }
};

export default FinishPage;