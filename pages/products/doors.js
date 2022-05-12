import DoorModule from '../../components/products/doors/DoorModule';

function DoorPage(props) {
    return (
        <DoorModule doors={props.doors} />
    )
};

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products/doors');
    const doors = await res.json();
    return {
        props: {
            doors
        }
    }
};

export default DoorPage;