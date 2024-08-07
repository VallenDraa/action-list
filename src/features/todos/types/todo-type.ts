export type TodoStatus = 'archived' | 'done' | 'upcoming';

export type Todo = {
	_id: string;
	title: string;
	body: string;
	user_id: string;
	status: TodoStatus;
};

export type UpdateTodo = Omit<Todo, '_id'>;
export type CreateTodo = UpdateTodo;
