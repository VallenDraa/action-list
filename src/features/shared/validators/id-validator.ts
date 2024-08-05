import { z } from 'zod';

export const idValidator = z
	.string()
	.min(1, 'User Id must be atleast 1 character long.');
