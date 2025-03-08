import { Dialog, DialogTitle, DialogContent, Button, Box } from '@mui/material';
import { useState } from 'react';
import Draggable from 'react-draggable';

interface WallViewDialogProps {
  open: boolean;
  onClose: () => void;
}

const WallViewDialog: React.FC<WallViewDialogProps> = ({ open, onClose }) => {
  const [selectedWall, setSelectedWall] = useState<string>('/img/wall-default.jpg');
  const [size, setSize] = useState<number>(300);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Xem Tranh Trên Tường</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Draggable>
            <img src="/img/tranh-tinh-vat.jpg" alt="Tranh" style={{ width: `${size}px`, cursor: 'grab' }} />
          </Draggable>
          <Box display="flex" gap={2}>
            <Button variant="contained" color="primary" onClick={() => setSelectedWall('/img/wall_1.jpeg')}>
              Chọn tường hiện đại
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setSelectedWall('/img/wall-classic.jpg')}>
              Chọn tường cổ điển
            </Button>
          </Box>
          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={() => setSize(size + 20)}>
              +
            </Button>
            <Button variant="contained" onClick={() => setSize(size - 20)}>
              -
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WallViewDialog;
