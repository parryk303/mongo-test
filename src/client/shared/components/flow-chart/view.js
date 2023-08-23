import { CHART_ELEM_TYPE, noop } from "@client/shared/constants";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import styles from "./style";

const elementTypeProperties = {
	[CHART_ELEM_TYPE.START]: {
		width: 100,
		height: 50,
		style: styles.startElement,
		label: "Start",
	},
	[CHART_ELEM_TYPE.STEP]: {
		width: 150,
		height: 50,
		style: styles.stepElement,
		label: "Step",
	},
	[CHART_ELEM_TYPE.CONDITION]: {
		width: 150,
		height: 50,
		style: styles.conditionElement,
		label: "Condition",
	},
	[CHART_ELEM_TYPE.STOP]: {
		width: 100,
		height: 50,
		style: styles.stopElement,
		label: "Stop",
	},
	arrow: {
		width: 50,
		height: 50,
	},
};

function RightArrow({ onClick = noop, top, left, showSuccess }) {
	return (
		<svg
			width={elementTypeProperties.arrow.width}
			height={elementTypeProperties.arrow.height}
			style={{
				top: `${top}px`,
				left: `${left}px`,
				position: "absolute",
				cursor: "pointer",
			}}
			onClick={() => onClick(top, left)}
		>
			<path
				d="M0,25 L40,25"
				style={{
					stroke: showSuccess ? "green" : "#4b4d51",
					strokeWidth: "2px",
					fill: "none",
				}}
			/>
			<path d="M40,20 L40,30 L50,25  L40,20" style={{ fill: "#4b4d51" }} />
		</svg>
	);
}

function DownArrow({ onClick = noop, top, left, showFailure }) {
	return (
		<svg
			width={elementTypeProperties.arrow.width}
			height={elementTypeProperties.arrow.height}
			style={{
				top: `${top}px`,
				left: `${left - 25}px`,
				position: "absolute",
				cursor: "pointer",
			}}
			onClick={() => onClick(top, left)}
		>
			<path
				d="M25,0 L25,40"
				style={{
					stroke: showFailure ? "red" : "#4b4d51",
					strokeWidth: "2px",
					fill: "none",
				}}
			/>
			<path d="M20,40 L30,40 L25,45 L20,40" style={{ fill: "#4b4d51" }} />
		</svg>
	);
}

export default function FlowChartView({
	elements = [],
	onElementClick = noop,
	onElementRemove = noop,
	onAddElement = noop,
}) {
	let currentX = 20;
	let currentY = 20;
	function handleAddElement({ element, index, isTruePath = true }) {
		onAddElement({
			element,
			index,
			isTruePath,
		});
  }

  function getElementIndex(elementId) {
    let index = elements.findIndex(element => element.id === elementId);
    if (index === -1) {
      index = null;
    }

    return index;
  }

	function renderChart() {
		let index = 0;
		let chart = [
			<Box key={"start"}>
				<Box
					sx={elementTypeProperties[CHART_ELEM_TYPE.START].style}
					style={{
						top: `${currentY}px`,
						left: `${currentX}px`,
						position: "absolute",
						width: `${elementTypeProperties[CHART_ELEM_TYPE.START].width}px`,
						height: `${elementTypeProperties[CHART_ELEM_TYPE.START].height}px`,
					}}
				>
					<Typography variant="body1">
						{elementTypeProperties[CHART_ELEM_TYPE.START].label}
					</Typography>
				</Box>

				<RightArrow
					left={currentX + elementTypeProperties[CHART_ELEM_TYPE.START].width}
					top={currentY}
					onClick={() =>
						handleAddElement({
							element: null,
							isTruePath: true,
						})
					}
				/>
			</Box>,
		];

		currentX +=
			elementTypeProperties[CHART_ELEM_TYPE.START].width +
			elementTypeProperties.arrow.width +
			5;
		let pendingRender = [];
		let currentOrientation = "right";
		if (!Array.isArray(elements) || elements.length === 0) {
			index = null;
		}
		while (index !== null && index !== undefined) {
			const element = elements[index];
			
			const { elementType, label: elementLabel, isDeleted } = element;
			if (isDeleted) {
				if (elementType === CHART_ELEM_TYPE.CONDITION) {
					index = currentOrientation === "right"
						? element.gotoTrue === ""
							? null
							: element.gotoTrue
						: element.gotoFalse === ""
						? null
						: element.gotoFalse;
				} else {
					index = element.goto === "" ? null : getElementIndex(element.goto);
				}
			} else {
				element.positionIndex = index;
				switch (elementType) {
					case CHART_ELEM_TYPE.START:
					case CHART_ELEM_TYPE.STOP:
					case CHART_ELEM_TYPE.STEP:
						chart.push(
							<Box key={index}>
								<Tooltip
									placement="top"
									title={elementLabel || elementTypeProperties[elementType].label}
								>
									<Chip
										onClick={() => onElementClick(element)}
										color="primary"
										label={
											elementLabel || elementTypeProperties[elementType].label
										}
										sx={elementTypeProperties[elementType].style}
										style={{
											top: `${currentY}px`,
											left: `${currentX}px`,
											position: "absolute",
											width: `${elementTypeProperties[elementType].width}px`,
											height: `${elementTypeProperties[elementType].height}px`,
										}}
										onDelete={
											element.disableRemove
												? null
												: (event) => {
														event.stopPropagation();
														event.preventDefault();
														onElementRemove(element);
												  }
										}
									/>
								</Tooltip>
								{element.goto !== null && element.goto !== undefined && (
									<>
										{currentOrientation === "right" ? (
											<RightArrow
												onClick={(top, left) => {
													handleAddElement({ element, top, left });
												}}
												left={currentX + elementTypeProperties[elementType].width}
												top={currentY}
											/>
										) : (
											<DownArrow
												onClick={(top, left) =>
													handleAddElement({ element, top, left })
												}
												left={
													currentX + elementTypeProperties[elementType].width / 2
												}
												top={currentY + elementTypeProperties[elementType].height}
											/>
										)}
									</>
								)}
							</Box>
						);
						if (currentOrientation === "right") {
							currentX +=
								elementTypeProperties[elementType].width +
								elementTypeProperties.arrow.width +
								5;
						} else {
							currentY +=
								elementTypeProperties[elementType].height +
								elementTypeProperties.arrow.height +
								5;
						}
						if (element.goto === "") {
							index = null;
						} else {
							index = getElementIndex(element.goto);
						}
						break;
					case CHART_ELEM_TYPE.CONDITION:
						chart.push(
							<>
								<Box key={index}>
									<Tooltip
										placement="top"
										title={
											elementLabel || elementTypeProperties[elementType].label
										}
									>
										<Chip
											onClick={() => onElementClick(element)}
											color="warning"
											sx={elementTypeProperties[elementType].style}
											label={
												elementLabel || elementTypeProperties[elementType].label
											}
											style={{
												top: `${currentY}px`,
												left: `${currentX}px`,
												position: "absolute",
												width: `${elementTypeProperties[elementType].width}px`,
												height: `${elementTypeProperties[elementType].height}px`,
											}}
											onDelete={
												element.disableRemove
													? null
													: (event) => {
															event.stopPropagation();
															event.preventDefault();
															onElementRemove(element);
													  }
											}
										/>
									</Tooltip>
									{element.gotoTrue === null ? (
										<></>
									) : (
										<RightArrow
											onClick={(top, left) =>
												handleAddElement({
													element,
													top,
													left,
													isTruePath: true,
												})
											}
											showSuccess
											left={currentX + elementTypeProperties[elementType].width}
											top={currentY}
										/>
									)}
									{element.gotoFalse === null ? (
										<></>
									) : (
										<DownArrow
											onClick={(top, left) =>
												handleAddElement({
													element,
													top,
													left,
													isTruePath: false,
												})
											}
											showFailure
											left={
												currentX + elementTypeProperties[elementType].width / 2
											}
											top={currentY + elementTypeProperties[elementType].height}
										/>
									)}
								</Box>
							</>
						);
						if (currentOrientation === 'right') {
							if (
								element.gotoFalse !== null &&
								element.gotoFalse !== undefined &&
								parseInt(element.gotoFalse).toString() !== "NaN"
							) {
								pendingRender.push({
									id: element.gotoFalse,
										// currentOrientation === "right"
										// 	? element.gotoFalse === ""
										// 		? null
										// 		: element.gotoFalse
										// 	: element.gotoTrue === ""
										// 	? null
										// 	: element.gotoTrue,
									x: currentX,
										// currentOrientation === "bottom"
										// 	? currentX +
										// 	  elementTypeProperties[CHART_ELEM_TYPE.CONDITION].width +
										// 	  elementTypeProperties.arrow.width +
										// 	  5
										// 	: currentX,
									y:  currentY +
										  elementTypeProperties[elementType].height +
										  elementTypeProperties.arrow.height +
										  5,
										// currentOrientation === "right"
										// 	? currentY +
										// 	  elementTypeProperties[elementType].height +
										// 	  elementTypeProperties.arrow.height +
										// 	  5
										// 	: currentY,
									orientation: "bottom",
									// currentOrientation === "bottom" ? "right" : "bottom",
								});
							}
						} else {
							if (
								element.gotoTrue !== null &&
								element.gotoTrue !== undefined &&
								parseInt(element.gotoTrue).toString() !== "NaN"
							) {
								pendingRender.push({
									id: element.gotoTrue,
										// currentOrientation === "right"
										// 	? element.gotoFalse === ""
										// 		? null
										// 		: element.gotoFalse
										// 	: element.gotoTrue === ""
										// 	? null
										// 	: element.gotoTrue,
									x: currentX +
										  elementTypeProperties[CHART_ELEM_TYPE.CONDITION].width +
										  elementTypeProperties.arrow.width +
										  5,
										// currentOrientation === "bottom"
										// 	? currentX +
										// 	  elementTypeProperties[CHART_ELEM_TYPE.CONDITION].width +
										// 	  elementTypeProperties.arrow.width +
										// 	  5
										// 	: currentX,
									y: currentY,
										// currentOrientation === "right"
										// 	? currentY +
										// 	  elementTypeProperties[elementType].height +
										// 	  elementTypeProperties.arrow.height +
										// 	  5
										// 	: currentY,
									orientation: "right",
									// currentOrientation === "bottom" ? "right" : "bottom",
								});
							}
						}
	
						if (currentOrientation === "right") {
							currentX +=
								elementTypeProperties[elementType].width +
								elementTypeProperties.arrow.width +
								5;
						} else {
							currentY +=
								elementTypeProperties[elementType].height +
								elementTypeProperties.arrow.height +
								5;
						}
						index =
							currentOrientation === "right"
								? element.gotoTrue === ""
									? null
									: getElementIndex(element.gotoTrue)
								: element.gotoFalse === ""
								? null
								: getElementIndex(element.gotoFalse);
						break;
					default:
						console.error("Invalid element type passed to flow chart", element);
						return null;
				}
			}

			if ((index === null || index === undefined) && pendingRender.length > 0) {
				const nextElement = pendingRender[0];
				index = getElementIndex(nextElement.id);
				currentX = nextElement.x;
				currentY = nextElement.y;
				currentOrientation = nextElement.orientation;
				pendingRender.splice(0, 1);
			}
		}

		return chart;
	}

	return (
		<Box
			sx={styles.wrapper}
			style={{
				minWidth: "100%",
				minHeight: "100%",
			}}
		>
			{renderChart()}
		</Box>
	);
}
