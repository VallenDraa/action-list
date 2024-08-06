export type Todo = {
	_id: string;
	title: string;
	body: string;
	user_id: string;
	is_done: boolean;
	is_archived: boolean;
};

export type UpdateTodo = Omit<Todo, '_id'>;
export type CreateTodo = UpdateTodo;
