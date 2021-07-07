import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { useAppDispatch } from "../app/hooks";
import { resetEditedTask } from "../slices/todoSlice";
import { Task, EditTask } from "../types/types";

export const useMutateTask = () => {
	const dispatch = useAppDispatch();
	// 既存のキャッシュを書き換えるために、取得する必要がある
	const queryClient = useQueryClient();

	const createTaskMutation = useMutation(
		// Omit<EditTask, "id">  ->  EditTaskから"id"を取り除いた値
		(task: Omit<EditTask, "id">) =>
			axios.post<Task>(`${process.env.REACT_APP_REST_URL}/tasks/`, task),
		{
			onSuccess: (res) => {
				// queryClient.getQueryDataで既存のデータを取得
				const previousTodos = queryClient.getQueryData<Task[]>("tasks");
				if (previousTodos) {
					// queryClient.setQueryDataでデータを書き換える
					queryClient.setQueryData<Task[]>("tasks", [
						...previousTodos,
						res.data,
					]);
				}
				dispatch(resetEditedTask());
			},
		}
	);

	const updateTaskMutation = useMutation(
		(task: EditTask) =>
			axios.put<Task>(
				`${process.env.REACT_APP_REST_URL}/tasks/${task.id}/`,
				task
			),
		{
			// variablesには更新するのに使ったデータが入ってくる
			onSuccess: (res, variables) => {
				// queryClient.getQueryDataで既存のデータを取得
				const previousTodos = queryClient.getQueryData<Task[]>("tasks");
				if (previousTodos) {
					queryClient.setQueryData<Task[]>(
						"tasks",
						previousTodos.map((task) =>
							task.id === variables.id ? res.data : task
						)
					);
				}
				dispatch(resetEditedTask());
			},
		}
	);

	const deleteTaskMutation = useMutation(
		(id: number) =>
			axios.delete(`${process.env.REACT_APP_REST_URL}/tasks/${id}/`),
		{
			onSuccess: (res, variables) => {
				const previousTodos = queryClient.getQueryData<Task[]>("tasks");
				if (previousTodos) {
					queryClient.setQueryData<Task[]>(
						"tasks",
						previousTodos.filter((task) => task.id !== variables)
					);
				}
				dispatch(resetEditedTask());
			},
		}
	);

	return { deleteTaskMutation, createTaskMutation, updateTaskMutation };
};
