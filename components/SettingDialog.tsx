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
import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "../interfaces";

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
    (key: CategoryKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
          {CATEGORY_KEYS.map((key) => {
            const { emoji, shortLabel, switchColor } = CATEGORIES[key];
            return (
              <FormControlLabel
                key={key}
                control={
                  <Switch
                    checked={markerVisibility[key]}
                    onChange={handleToggle(key)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: switchColor,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: switchColor,
                        },
                    }}
                  />
                }
                label={`${emoji} ${shortLabel}`}
              />
            );
          })}
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
