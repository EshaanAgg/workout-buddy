import { Client as Appwrite, Databases, Account } from "appwrite";

// Exporting some most commonly used functions
let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }

    let appwrite = new Appwrite();

    const config = useRuntimeConfig().public;
    appwrite.setEndpoint(config.endpoint).setProject(config.project);

    const account = new Account(appwrite);
    const database = new Databases(appwrite, config.database);
    api.sdk = { database, account };

    return api.sdk;
  },

  // Register a user in the backend
  createAccount: (email, password, name) => {
    return api.provider().account.create("unique()", email, password, name);
  },

  // Allow the user to log in by creating a session
  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  // Get account information of the currently logged in user
  getAccount: () => {
    return api.provider().account.get();
  },

  // Log out the user by ending the current session
  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  /*
  Creates a document and stores it in the backend
  - Requires a collectionID to identify where to save the document
  - Auto generates an uniqie document id for the same
  - Requires:
    - data : The fields of the document
    - read : Users with read permissions
    - write : Users with write (updating and deleting permissions)
  */
  createDocument: (databaseID, collectionID, data, permissions) => {
    return api
      .provider()
      .database.createDocument(
        databaseID,
        collectionID,
        "unique()",
        data,
        permissions
      );
  },

  // Get all documents stored in a collection
  listDocuments: (databaseID, collectionID) => {
    return api.provider().database.listDocuments(databaseID, collectionID);
  },

  getDocument: (databaseID, collectionID, documentID) => {
    return api
      .provider()
      .database.getDocument(databaseID, collectionID, documentID);
  },
  // Update a given document with the relevant data
  // Has all the same arguments as createDocument, except for an additional identifier documentID to point to which document to update
  updateDocument: (databaseID, collectionID, documentID, data, permissions) => {
    return api
      .provider()
      .database.updateDocument(
        databaseID,
        collectionID,
        documentID,
        data,
        permissions
      );
  },

  // Deletes the document with the given collection and document ids
  deleteDocument: (databaseID, collectionID, documentID) => {
    return api
      .provider()
      .database.deleteDocument(databaseID, collectionID, documentID);
  },
};

export default api;
