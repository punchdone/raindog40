// import projectPad from '../../helpers/projectPad';
// import channelCodeLookup from '../../helpers/channel';
import Card from '../ui/Card';
import classes from './ProjectList.module.css';
import ProjectItem from './ProjectItem';


function ProjectList(props) {
    const projects = props.projects;
    // console.log(projects);
    // console.log(projects.length);

    // console.log(props.projects);

    // console.log('array length = ' + props.project.length);

    // const projectList = 
    //     // props.projects.length === 0 &&
    //     // <div className={classes.list}>No projects (yet)</div>  ||
    //     props.projects.map(async(project) => (
    //         <div className={classes.list} key={project._id}>
    //             <div>{project.projectName}</div>
    //         </div>
    //     ))

    const projectList = 
        projects.map(project => (
                <ProjectItem key={project._id} project={project} />
            )
        );

    return (
        <Card>
             <div className={classes.listBlock}>
                <div className={classes.header}>
                    <label htmlFor='woProjectNum'>Project#</label>
                    <label htmlFor='RoomNum'>Project Name</label>
                    <label htmlFor='dealerCode'>Room Name</label>
                    <label htmlFor='projectName'>Order Type</label>
                    <label htmlFor='roomName'>Order Status</label>
                    <label htmlFor='productLine'></label>
                    <label htmlFor='order'>Order#</label>
                </div>
                {projectList}
            </div>
        </Card>
    )
};

export default ProjectList;