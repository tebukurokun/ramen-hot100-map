import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { useAtom } from "jotai";
import { markerVisibilityAtom } from "../atoms";

/**
 * 設定ダイアログ
 */
const SettingDialog = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}) => {
	const [markerVisibility, setMarkerVisibility] = useAtom(markerVisibilityAtom);

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleToggle =
		(key: "ramen" | "udon" | "curry") =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setMarkerVisibility({
				...markerVisibility,
				[key]: event.target.checked,
			});
		};

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>表示設定</DialogTitle>
			<DialogContent>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								color="warning"
								checked={markerVisibility.ramen}
								onChange={handleToggle("ramen")}
							/>
						}
						label="ラーメン"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={markerVisibility.udon}
								onChange={handleToggle("udon")}
							/>
						}
						label="うどん"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={markerVisibility.curry}
								onChange={handleToggle("curry")}
								sx={{
									"& .MuiSwitch-switchBase.Mui-checked": {
										color: "#D4A017", // カレーっぽい色 (ゴールデンブラウン)
									},
									"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
										backgroundColor: "#D4A017",
									},
								}}
							/>
						}
						label="カレー"
					/>
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					閉じる
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SettingDialog;
