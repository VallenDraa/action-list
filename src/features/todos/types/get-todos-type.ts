import z from 'zod';
import { type getTodoValidator } from '../validators/get-todos-validator';
import { TodoStatus } from './todo-type';

export type GetTodosActionQuery = z.infer<typeof getTodoValidator>;

export type TodoFilter = TodoStatus | 'all';
