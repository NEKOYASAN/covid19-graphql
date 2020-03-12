const {GraphQLServer} = require('graphql-yoga');
const fs = require('fs');
const simpleGit = require('simple-git')('./src/datas');
const cron = require('node-cron');
const contacts_filepath = './src/datas/contacts.json';
const current_patients_filepath = './src/datas/current_patients.json';
const discharges_summary_filepath = './src/datas/discharges_summary.json';
const inspections_filepath = './src/datas/inspections.json';
const last_update_filepath = './src/datas/last_update.json';
const patients_filepath = './src/datas/patients.json';
const patients_summary_filepath = './src/datas/patients_summary.json';
const querents_filepath = './src/datas/querents.json';
var contacts = null;
var current_patients = null;
var discharges_summary = null;
var inspections= null;
var last_update = null;
var patients = null;
var patients_summary = null;
var querents= null;
function reload_contacts() {
    fs.readFile(contacts_filepath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        contacts = JSON.parse(data);
    })
}
function reload_current_patients(filepath) {
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        current_patients = JSON.parse(data);
    })
}
function reload_discharges_summary(filepath) {
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        discharges_summary = JSON.parse(data);
    })
}
function reload_inspections(filepath) {
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        inspections = JSON.parse(data);
    })
}
function reload_last_update(filepath) {
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        last_update = JSON.parse(data);
    })
}
function reload_patients(filepath) {
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        patients = JSON.parse(data);
    })
}
function reload_patients_summary(filepath) {
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        patients_summary = JSON.parse(data);
    })
}
function reload_querents(filepath) {
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        querents = JSON.parse(data);
    })
}

reload_contacts(contacts_filepath);
reload_current_patients(current_patients_filepath);
reload_discharges_summary(discharges_summary_filepath);
reload_inspections(inspections_filepath);
reload_last_update(last_update_filepath);
reload_patients(patients_filepath);
reload_patients_summary(patients_summary_filepath);
reload_querents(querents_filepath);
// 設定ファイルを監視するロジック
// watchFileして、更新日時が新しかったら再読み込みする
fs.watchFile(contacts_filepath, function(curr, prev) {
    if (curr.mtime > prev.mtime) {
        reload_contacts(contacts_filepath);
    }
});

fs.watchFile(current_patients_filepath, function(curr, prev) {
    if (curr.mtime > prev.mtime) {
        reload_current_patients(current_patients_filepath);
    }
});

fs.watchFile(discharges_summary_filepath, function(curr, prev) {
    if (curr.mtime > prev.mtime) {
        reload_discharges_summary(discharges_summary_filepath);
    }
});

fs.watchFile(inspections_filepath, function(curr, prev) {
    if (curr.mtime > prev.mtime) {
        reload_inspections(inspections_filepath);
    }
});

fs.watchFile(last_update_filepath, function(curr, prev) {
    if (curr.mtime > prev.mtime) {
        reload_last_update(last_update_filepath);
    }
});

fs.watchFile(patients_filepath, function(curr, prev) {
    if (curr.mtime > prev.mtime) {
        reload_patients(patients_filepath);
    }
});

fs.watchFile(patients_summary_filepath, function(curr, prev) {
    if (curr.mtime > prev.mtime) {
        reload_patients_summary(patients_summary_filepath);
    }
});

fs.watchFile(querents_filepath, function(curr, prev) {
    if (curr.mtime > prev.mtime) {
        reload_querents(querents_filepath);
    }
});

function gitpull() {
    simpleGit.pull();
}
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

cron.schedule('*/1 * * * *', () => {
    gitpull();
    console.log('gitpull')
});

server.start({port: process.env.PORT},() => console.log(`Server is running on http://localhost`));
