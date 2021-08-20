import { FunctionComponent } from "react";

import { teamColors } from "../lib/colors";
import { Team } from "../lib/teams";

const GameBackground: FunctionComponent<{ team: Team }> = ({ team }) => {
	const top = team === Team.A || team === Team.B ? 0 : "450px";
	const left = team === Team.A || team === Team.C ? 0 : "1120px";
	const color = teamColors[team];
	return (
		<div
			style={{
				position: "absolute",
				width: "800px",
				height: "450px",
				backgroundColor: color,
				left,
				top,
			}}
		></div>
	);
};

const TeamPanel: FunctionComponent<{ team: Team }> = ({ team }) => {
	const color = teamColors[team];

	return (
		<div
			style={{
				alignSelf:
					team === Team.A || team === Team.C ? "flex-start" : "flex-end",
				width: "290px",
				height: "217px",
				backgroundColor: color,
				display: "grid",
				gridTemplateRows: "auto 1fr",
			}}
		>
			<div
				style={{
					placeSelf: "center",
					fontWeight: "bold",
					fontSize: "24px",
					lineHeight: "36px",
				}}
			>
				Aチーム: Hoishin
			</div>
			<div
				style={{
					backgroundColor: "rgba(255,255,255,0.5)",
					margin: "0 8px 8px 8px",
					textAlign: "center",
				}}
			>
				意気込み
				<br></br>
				<br></br>
				がんばります
			</div>
		</div>
	);
};

export const Main = () => {
	return (
		<div
			style={{
				position: "absolute",
				width: "1920px",
				height: "1080px",
				fontFamily: '"M PLUS 1p", sans-serif',
			}}
		>
			<GameBackground team={Team.A}></GameBackground>
			<GameBackground team={Team.B}></GameBackground>
			<GameBackground team={Team.C}></GameBackground>
			<GameBackground team={Team.D}></GameBackground>

			<div
				style={{
					position: "absolute",
					left: `${800 - 8}px`,
					top: 0,
					width: `${1920 - 800 * 2 + 8 * 2}px`,
					height: "900px",
					display: "flex",
					flexFlow: "column nowrap",
					justifyContent: "space-between",
				}}
			>
				<TeamPanel team={Team.A}></TeamPanel>
				<TeamPanel team={Team.B}></TeamPanel>
				<TeamPanel team={Team.C}></TeamPanel>
				<TeamPanel team={Team.D}></TeamPanel>
			</div>
		</div>
	);
};
