import StepModule from '../../../components/projects/Orders/StepByStep/StepModule';

const OrderStep = (props) => {
    return (
        <StepModule taxonomies={props.taxonomies} />
    )
};

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/taxonomy');
    const taxonomies = await res.json();
    return {
        props: {
            taxonomies
        }
    }
};

export default OrderStep;