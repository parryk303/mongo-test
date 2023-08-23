import { globalStyles } from "@client/shared/constants";

const common = {
	//padding: "10px",
	//textAlign: "center",
	//color: 'white',
	justifyContent: 'space-between'

};
export default {
	wrapper: {
		position: "relative",
		paddingLeft: '20px',
		paddingTop: '20px',
	},
	startElement: {
		border: "1px solid",
		borderColor: "info.dark",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "50%",
		backgroundColor: 'info.main',
	},
	stopElement: {
		...common,
		border: "1px solid",
		borderColor: "primary.main",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "50%",
		backgroundColor: 'primary.main',
	},
	stepElement: {
		...common,
	},
	conditionElement: {
		...common,
	},
};
