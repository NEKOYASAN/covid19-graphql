const {GraphQLServer} = require('graphql-yoga');
const contacts = require('./datas/contacts.json');
const current_patients = require('./datas/current_patients.json');
const discharges_summary = require('./datas/discharges_summary.json');
const inspections = require('./datas/inspections.json');
const last_update = require('./datas/last_update.json');
const patients = require('./datas/patients.json');
const patients_summary = require('./datas/patients_summary.json');
const querents = require('./datas/querents.json');

const resolvers = {
    Query: {
        contacts: (obj, args, context, info) => {
            return contacts;
        },
        current_patients: (obj, args, context, info) => {
            return current_patients;
        },
        discharges_summary: (obj, args, context, info) => {
            return discharges_summary;
        },
        inspections: (obj, args, context, info) => {
            return inspections;
        },
        last_update: (obj, args, context, info) => {
            return last_update;
        },
        patients: (obj, args, context, info) => {
            return patients;
        },
        patients_summary: (obj, args, context, info) => {
            return patients_summary;
        },
        querents: (obj, args, context, info) => {
            return querents;
        },

    },
};

const server = new GraphQLServer(
    {
        typeDefs: './src/data.graphql',
        resolvers,
    }
);
server.start(() => console.log(`Server is running on http://localhost:4000`));
