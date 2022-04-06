import Head from 'next/head';
import { Fragment } from 'react';

import NewProjectForm from '../../components/projects/NewProjectForm';

function NewProjectPage() {

    async function addProjectHandler(enteredProjectData) {
        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify(enteredProjectData),
            headers: {
                'Content-Type': 'applicatin/json'
            }
        });

        const data = await response.json();
        console.log(data);
    }
    
    return (
        <Fragment>
            <Head>
                <title>Add a new project</title>
                <meta 
                    name='description'
                    content='Add project information and keep track of all production projects'
                />
            </Head>
            <NewProjectForm 
                onAddProject={addProjectHandler}
            />
        </Fragment>
    )
};

export default NewProjectPage;