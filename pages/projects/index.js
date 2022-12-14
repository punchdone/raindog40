import ProjectModule from '../../components/projects/ProjectModule';

function ProjectListPage(props) {

   return <ProjectModule projects={props.projects} />

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