import { VFC, memo } from "react";
import { useQueryTags } from "../../hooks/useQueryTags";
import TagItem from "./TagItem";

const TagList: VFC = memo(() => {
	const { status, data } = useQueryTags();
	console.log("rendered TagList");
	if (status === "loading") return <div>{"Loading..."}</div>;
	if (status === "error") return <div>{"Error"}</div>;
	return (
		<div>
			{data?.map((tag) => (
				<div key={tag.id}>
					<ul>
						<TagItem tag={tag} />
					</ul>
				</div>
			))}
		</div>
	);
});

export default TagList;
