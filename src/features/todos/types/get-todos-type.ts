import z from 'zod';
import { type getTodoValidator } from '../validators/get-todos-validator';

export type GetTodosActionQuery = z.infer<typeof getTodoValidator>;

export type TodoFilter = Exclude<GetTodosActionQuery['type'], undefined>;
