import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
      }
});

const ProjectListPDF = (props) => {
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
            <Text render={({ pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
    </Document>
};

export default ProjectListPDF;