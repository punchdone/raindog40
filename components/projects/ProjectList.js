// import projectPad from '../../helpers/projectPad';
import channelCode from '../../helpers/channel';
import Card from '../ui/Card';
import classes from './ProjectList.module.css';

function ProjectList(props) {
    const projects = props.projects;
    console.log(projects);
    console.log(projects.length);

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
            <div className={classes.list} key={project._id}>
                <div>{project.woProjectNum}</div>
                <div>{project.dealerCode}</div>
                <div>
                    {project.projectName}
                </div>
                <div>{project.productLine}</div>
            </div>
        ));

    return (
        <Card>
             <div className={classes.listBlock}>
                <div className={classes.header}>
                    <label htmlFor='woProjectNum'>Production WO#</label>
                    <label htmlFor='dealerCode'>Channel</label>
                    <label htmlFor='projectName'>Project Name</label>
                    <label htmlFor='productLine'>Product Line</label>
                </div>
                {projectList}
            </div>
        </Card>
    )
};

export default ProjectList;