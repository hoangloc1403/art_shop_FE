import { Dialog, DialogTitle, DialogContent, Button, Box, Slider, Grid, Typography, IconButton } from '@mui/material';
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Close, Download, PhotoLibrary, ZoomIn } from '@mui/icons-material';
import html2canvas from 'html2canvas';

interface WallViewDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string | undefined;
}

const WallViewDialog: React.FC<WallViewDialogProps> = ({ open, onClose, imageUrl }) => {
  const [selectedWall, setSelectedWall] = useState<string>('/img/wall_1.jpg');
  const [uploadedWall, setUploadedWall] = useState<string | null>(null);
  const [size, setSize] = useState<number>(100);
  const [wallFitMode, setWallFitMode] = useState<'cover' | 'contain'>('cover'); // 👈 Chế độ ảnh tường

  const fileInputRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);

  const sliderValue = ((size - 10) / (200 - 10)) * 100;
  const displaySize = Math.round(((size - 10) / (200 - 10)) * 100);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedWall(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    const val = newValue as number;
    const newSize = 10 + (val / 100) * (200 - 10);
    setSize(newSize);
  };

  const handleDownload = () => {
    if (!roomRef.current) return;
    html2canvas(roomRef.current, { useCORS: true, backgroundColor: null }).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'room_with_painting.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const wallImage = uploadedWall || selectedWall;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Khu vực hiển thị phòng */}
          <Grid item xs={12} md={8}>
            <Box
              ref={roomRef}
              position="relative"
              height="70vh"
              sx={{
                backgroundImage: `url(${wallImage})`,
                backgroundSize: wallFitMode, // 👈 Áp dụng chế độ cover/contain
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: 2,
                border: '1px solid #ccc',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
              }}
            >
              <Draggable>
                <img
                  src={imageUrl || '/img/painting-default.jpg'}
                  alt="Tranh"
                  style={{
                    width: `${Math.round(size)}px`,
                    position: 'absolute',
                    top: '10%',
                    left: '40%',
                    cursor: 'grab',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
                    borderRadius: 4,
                    border: '2px solid rgba(255,255,255,0.8)',
                  }}
                />
              </Draggable>
            </Box>
          </Grid>

          {/* Khu điều khiển */}
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Chọn ảnh phòng */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <PhotoLibrary color="primary" />
                <Typography variant="subtitle1" fontWeight="600">
                  Chọn ảnh phòng:
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {Array.from({ length: 8 }, (_, i) => (
                  <Grid item xs={3} key={i}>
                    <img
                      src={`/img/wall_${i + 1}.jpg`}
                      alt={`Wall ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 4,
                        cursor: 'pointer',
                        border: selectedWall === `/img/wall_${i + 1}.jpg` ? '2px solid #1976d2' : '1px solid #ccc',
                      }}
                      onClick={() => {
                        setSelectedWall(`/img/wall_${i + 1}.jpg`);
                        setUploadedWall(null);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Upload ảnh tường */}
              <Box>
                <input accept="image/*" type="file" hidden ref={fileInputRef} onChange={handleUpload} />
                <Button variant="outlined" startIcon={<PhotoCamera />} onClick={() => fileInputRef.current?.click()}>
                  Tải ảnh phòng lên
                </Button>
              </Box>

              {/* Chọn chế độ hiển thị ảnh tường */}
              <Box display="flex" gap={1} alignItems="center" mt={1}>
                <Typography variant="body2">Chế độ hiển thị:</Typography>
                <Button
                  variant={wallFitMode === 'cover' ? 'contained' : 'outlined'}
                  onClick={() => setWallFitMode('cover')}
                  size="small"
                >
                  Lấp đầy
                </Button>
                <Button
                  variant={wallFitMode === 'contain' ? 'contained' : 'outlined'}
                  onClick={() => setWallFitMode('contain')}
                  size="small"
                >
                  Toàn ảnh
                </Button>
              </Box>

              {/* Thay đổi kích thước tranh */}
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <ZoomIn color="primary" />
                  <Typography variant="subtitle1" fontWeight="600">
                    Kích thước tranh: {displaySize}%
                  </Typography>
                </Box>
                <Slider value={sliderValue} min={0} max={100} onChange={handleSliderChange} />
              </Box>

              <Button variant="outlined" startIcon={<Download />} onClick={handleDownload} disabled={!imageUrl}>
                Tải xuống ảnh đã chỉnh
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default WallViewDialog;
