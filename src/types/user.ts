import { Role } from "./role";

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	imgUrl?: string;
	role?: Role;
}
