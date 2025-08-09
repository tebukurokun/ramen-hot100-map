import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

// アイコンスタイル
const StyledIcon = styled(SettingsIcon)(() => ({
	fontSize: "2rem",
	color: "#000000",
}));

// ボタンスタイル
const StyledButton = styled(IconButton)({
	backgroundColor: "#E0E0E0", // ボタンの背景を灰色に設定
	boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // ボタンに影を設定
	"&:hover": {
		backgroundColor: "#D6D6D6", // ホバー時の背景色
		boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.3)", // ホバー時に影を強調
	},
	padding: "5px",
	borderRadius: "10px", // 角丸
});

export const SettingButton = ({
	onClick,
}: {
	onClick: () => void;
}): JSX.Element => {
	return (
		<StyledButton onClick={onClick} aria-label="マーカーの表示設定を開く">
			<StyledIcon />
		</StyledButton>
	);
};
