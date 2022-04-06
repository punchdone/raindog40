import Head from 'next/head';
import { Fragment } from 'react';

import NewSummitForm from '../../components/projects/NewSummitForm';

function newSummitProjectPage() {
    return (
        <Fragment>
            <Head>
                <title>Add a new Summit project</title>
                <meta 
                    name='description'
                    content='Move Summit project into production'
                />
            </Head>
            <NewSummitForm />
        </Fragment>
    )
};

export default newSummitProjectPage;