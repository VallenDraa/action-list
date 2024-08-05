import mongoose, { InferRawDocType } from 'mongoose';
import { dbConnect } from '@/lib/mongoose';
import { Todo } from '../types/todo-type';

await dbConnect();

const TodoSchema = new mongoose.Schema<Todo>(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		user_id: { type: String, required: true },
		is_done: { type: Boolean, required: true, default: false },
		is_archived: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true },
);

export const TodoModel = mongoose.model('todo', TodoSchema);
