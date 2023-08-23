import { noop } from "@client/shared/constants";
import FlowChartView from "./view";

export default function ({
	elements = [],
	onElementClick = noop,
	onElementRemove = noop,
	onAddElement = noop,
}) {
	return (
		<FlowChartView
			elements={elements}
			onElementClick={onElementClick}
			onElementRemove={onElementRemove}
			onAddElement={onAddElement}
		/>
	);
}
