import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type SettingDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SettingDialog: React.FC<SettingDialogProps> = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>マップ設定</DialogTitle>
      <DialogContent>
        <p>⚠️ 開発中 ⚠️</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingDialog;
