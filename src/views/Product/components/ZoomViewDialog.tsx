import { Dialog, DialogContent } from '@mui/material';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ZoomViewDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string | undefined;
}

const ZoomViewDialog: React.FC<ZoomViewDialogProps> = ({ open, onClose, imageUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{ p: 0 }}>
        <Zoom>
          <img
            src={imageUrl || '/img/wall-default.jpg'}
            alt="Phóng to"
            style={{ height: '90vh', width: 'auto', display: 'block', margin: '0 auto', cursor: 'zoom-in' }}
          />
        </Zoom>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomViewDialog;
