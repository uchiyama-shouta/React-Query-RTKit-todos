export type Task = {
	id: number;
	title: string;
	tag: number;
	tag_name: string;
	created_at: string;
	updated_at: string;
};

export type EditTask = {
	id: number;
	title: string;
	tag: number;
};

export interface Tag {
	id: number;
	name: string;
}
