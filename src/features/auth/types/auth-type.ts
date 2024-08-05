import z from 'zod';
import {
	loginValidator,
	registerValidator,
} from '../validators/auth-validator';

export type Login = z.infer<typeof loginValidator>;
export type Register = z.infer<typeof registerValidator>;
