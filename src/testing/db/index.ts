import mongoose from 'mongoose';

export const resetTestDb = async (
	mongo: mongoose.Mongoose,
	collections: string[] | 'all' = 'all',
) => {
	const dropCollectionStatements =
		collections === 'all'
			? [
					mongo.connection.db.dropCollection('todos'),
					mongo.connection.db.dropCollection('users'),
					mongo.connection.db.dropCollection('sessions'),
			  ]
			: collections.map(collection =>
					mongo.connection.db.dropCollection(collection),
			  );

	await Promise.allSettled(dropCollectionStatements);
};

export const createObjectId = () => new mongoose.Types.ObjectId();
