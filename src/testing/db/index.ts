import mongoose from 'mongoose';

export const resetTestDb = (mongo: mongoose.Mongoose) => {
	mongo.connection.db.dropCollection('todos');
	mongo.connection.db.dropCollection('users');
	mongo.connection.db.dropCollection('sessions');
};
