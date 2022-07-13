import { Fragment } from 'react';
import ProjectListPDF from "./ProjectListPDF";
// import { PDFDownloadLink } from '@react-pdf/renderer';

const ProjectList = ({ projects }) => {
    return (
        <Fragment>
            {/* <PDFDownloadLink document={<ProjectListPDF />} fileName='Production List'>
                {({loading}) => (
                    loading ? (
                        <button>Loading document...</button>
                    ): (
                        <button>Download</button>
                    ))}
            </PDFDownloadLink> */}
            <div>Project List for Losers!</div>
        </Fragment>
    )
};

export default ProjectList;