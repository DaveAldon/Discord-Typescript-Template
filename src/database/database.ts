import loki from 'lokijs';

const db = new loki('discord-bot-database');

export enum DatabaseCollections {
  COLLECTION = 'collection',
}

export enum DatabaseServices {
  SERVICE = 'service',
}

interface DatabaseEntry {
  collection: Collection<any>;
  service: string;
  inUse: boolean;
  username: string;
}
export const addEntry = ({ collection, service, inUse, username }: DatabaseEntry) => {
  return collection.insert({ service, inUse, username });
};

export const initCollection = (databaseName: string): Collection<any> => {
  return db.addCollection(databaseName);
};

export const isInUse = (
  collection: Collection<any>,
  service: string
): { inUse: boolean; username: string } => {
  return {
    inUse: collection.findOne({ service }).inUse,
    username: collection.findOne({ service }).username,
  };
};

export const updateInUse = ({ collection, service, inUse, username }: DatabaseEntry) => {
  collection.findAndUpdate({ service }, (entry: DatabaseEntry) => {
    entry.inUse = inUse;
    entry.username = username;
    return entry;
  });
};

export const getCollection = (databaseName: string): Collection<any> => {
  return db.getCollection(databaseName);
};
