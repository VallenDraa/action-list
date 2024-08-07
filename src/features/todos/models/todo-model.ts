import mongoose from 'mongoose';
import { Todo } from '../types/todo-type';

const TodoSchema = new mongoose.Schema<Todo>(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		user_id: { type: String, required: true },
		status: { type: String, required: true, default: 'upcoming' },
	},
	{ timestamps: true },
);

export const TodoModel: mongoose.Model<Todo> =
	mongoose.models.todo || mongoose.model('todo', TodoSchema);
