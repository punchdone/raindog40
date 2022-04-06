import ProjectList from '../../components/projects/ProjectList';

function ProjectListPage(props) {

   return <ProjectList projects={props.projects} />

};

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/projects');
    const projects = await res.json();
    return {
        props: {
            projects
        }
    }
};

export default ProjectListPage;