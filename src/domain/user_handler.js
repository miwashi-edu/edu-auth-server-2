const { v4: uuidv4 } = require('uuid');

let users = [
    {
        id: '543d719e-da91-429d-bbaa-8010a9556381',
        username: "admin",
        password: "$2b$10$H3fuKg7oVfRIAHfGhP.riOiAJ1buARooRUU61wD1FxT0eVoLWIKJG"
    },
    {
        id: '543d719e-da91-429d-bbaa-8010a9556382',
        username: "user",
        password: "$2b$10$G.oUiUVQFOgLejSiV0uALeu4e72zvizj6FOOtdyXFk1HgDS1lDtSO"
    },
    {
        id: '543d719e-da91-429d-bbaa-8010a9556383',
        username: "gdpr",
        password: "$2b$10$AgA8W4RDTASLM7H877.lvOWrzLLnC6s866iNMMVODNddfasMOK2S6"
    },
];
let groups = {
    admin: [ '543d719e-da91-429d-bbaa-8010a9556381' ],
    user: [ '543d719e-da91-429d-bbaa-8010a9556381', '543d719e-da91-429d-bbaa-8010a9556382', '543d719e-da91-429d-bbaa-8010a9556383' ],
    gdpr: [ '543d719e-da91-429d-bbaa-8010a9556383' ]
};

exports.addUser = (user) => {
    user.id = uuidv4();
    users.push(user);
    return user;
};

exports.getUsers = () => {
    return users.map(user => ({
        ...user,
        groups: getUserGroups(user.id)
    }));
};

exports.getUser = (id) => {
    return users.find(user => user.id === id);
};


exports.updateUser = (id, newUserDetails) => {
    let userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = {...users[userIndex], ...newUserDetails};
        return true;
    }
    return false;
};


exports.deleteUser = (id) => {
    let initialLength = users.length;
    users = users.filter(user => user.id === id);  // Removed parseInt
    return initialLength !== users.length;
};

exports.addGroup = (groupName) => {
    if (!groups[groupName]) {
        groups[groupName] = [];
        return true;
    }
    return false;
};

exports.listGroups = () => {
    return Object.keys(groups).map(groupName => ({
        name: groupName,
        members: groups[groupName].map(userId =>
            this.getUser(userId)
        )
    }));
};

exports.deleteGroup = (groupName) => {
    if (groups.hasOwnProperty(groupName)) {
        delete groups[groupName];
        return true;
    }
    return false;
};

exports.getUserGroups = (userId) => {
    return Object.keys(groups).filter(groupName => groups[groupName].includes(userId));
};

exports.addUserToGroup = (userId, groupName) => {
    if (!groups[groupName]) {
        console.log("Group does not exist.");
        return false;
    }

    const userExists = users.some(user => user.id === userId);
    if (!userExists) {
        console.log("User does not exist.");
        return false;
    }

    if (groups[groupName].includes(userId)) {
        console.log("User already in the group.");
        return false;
    }

    groups[groupName].push(userId);
    return true;
};


exports.removeUserFromGroup = (userId, groupName) => {
    if (groups[groupName]) {
        let initialLength = groups[groupName].length;
        groups[groupName] = groups[groupName].filter(id => id !== userId);
        return initialLength !== groups[groupName].length;
    }
    return false;
};

exports.getUserByUsername = (username) => {
    return users.find(user => user.username === username);
};
