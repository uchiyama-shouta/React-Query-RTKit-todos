import { VFC } from "react";
import { useHistory } from "react-router-dom";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import TaskList from "../tasks/TaskList";
import TaskEdit from "../tasks/TaskEdit";

const MainTask: VFC = () => {
	const history = useHistory();
	return (
		<>
			<p className="mb-10 text-xl font-bold">Tasks</p>
			<div className="grid grid-cols-2 gap-40">
				<TaskList />
				<TaskEdit />
			</div>
			<ChevronDoubleRightIcon
				onClick={() => history.push("/tags")}
				className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
			/>
			<p>Tag page</p>
		</>
	);
};

export default MainTask;
