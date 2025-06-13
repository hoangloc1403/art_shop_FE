import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Slider,
  Skeleton,
  Autocomplete,
  TextField,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { Paging, Product, Category } from '@/types';
import { artworkService } from '@/services';
import { categoryService } from '@/services/categoryService';
import { CategoryIntroduce, ProductFilterItem } from './components';

const PAGE_SIZE = 8;
const AVAILABLE_DIMENSIONS = ['20x30', '30x40', '50x70', '60x90'];

const ProductFilterContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const medium = searchParams.get('medium') || '';
  const dimensions = searchParams.getAll('dimensions');
  const categoryIds = searchParams.getAll('categoryIds');
  const priceFrom = Number(searchParams.get('priceFrom')) || 0;
  const priceTo = Number(searchParams.get('priceTo')) || 100000000;
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [localDimensions, setLocalDimensions] = useState<string[]>(dimensions);
  const [localCategoryIds, setLocalCategoryIds] = useState<string[]>(categoryIds);
  const [localPriceRange, setLocalPriceRange] = useState<number[]>([priceFrom, priceTo]);
  const [isSliding, setIsSliding] = useState(false);
  const [categoryIntro, setCategoryIntro] = useState<Category | null>(null);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoryService.getTreeCategories,
  });

  const { data, isLoading } = useQuery<Paging<Product>, boolean>({
    queryKey: ['artworks', { medium, dimensions, categoryIds, priceFrom, priceTo, page }],
    queryFn: () =>
      artworkService.getArtworks({
        medium: medium || undefined,
        dimensions: dimensions.length ? dimensions : undefined,
        categoryIds: categoryIds.length ? categoryIds : undefined,
        priceFrom,
        priceTo,
        page,
        limit: PAGE_SIZE,
      }),
    keepPreviousData: true,
    staleTime: 300000,
  });

  const updateParam = (key: string, value: string | string[]) => {
    const newParams = new URLSearchParams(searchParams);
    if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((v) => newParams.append(key, v));
    } else {
      value ? newParams.set(key, value) : newParams.delete(key);
    }
    if (!['page', 'priceFrom', 'priceTo'].includes(key)) {
      newParams.set('page', '1');
    }
    setSearchParams(newParams, { replace: false });
  };

  const handleResetFilters = () => {
    const defaultRange = [0, 100000000];

    // Reset local state
    setLocalDimensions([]);
    setLocalCategoryIds([]);
    setLocalPriceRange(defaultRange);

    // Reset search params (sử dụng updateParam để đảm bảo đồng bộ)
    const newParams = new URLSearchParams();
    newParams.set('priceFrom', defaultRange[0].toString());
    newParams.set('priceTo', defaultRange[1].toString());
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  useEffect(() => updateParam('dimensions', localDimensions), [localDimensions]);
  useEffect(() => updateParam('categoryIds', localCategoryIds), [localCategoryIds]);
  useEffect(() => {
    if (!isSliding) {
      updateParam('priceFrom', localPriceRange[0].toString());
      updateParam('priceTo', localPriceRange[1].toString());
    }
  }, [localPriceRange, isSliding]);

  useEffect(() => {
    const fetchCategoryIntro = async () => {
      if (categoryIds.length > 0) {
        try {
          const result = await categoryService.getCategory(categoryIds[0]);
          setCategoryIntro(result);
        } catch (error) {
          console.error('Failed to fetch category intro:', error);
        }
      } else {
        setCategoryIntro(null);
      }
    };
    fetchCategoryIntro();
  }, [categoryIds]);

  return (
    <>
      <CategoryIntroduce category={categoryIntro} />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* FILTER */}
          <Grid item xs={12} md={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography
                variant="h6"
                sx={{ fontFamily: '"Orpheus Pro", serif', fontSize: '25px', color: '#423E31', fontWeight: 400 }}
              >
                Bộ lọc
              </Typography>
              <Button onClick={handleResetFilters} size="small" color="error" variant="outlined">
                Xoá bộ lọc
              </Button>
            </Box>

            {/* Category Filter */}
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom fontFamily="Merriweather, sans-serif" fontWeight="700">
                Danh mục
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel id="category-select-label">Chọn danh mục</InputLabel>
                <Select
                  labelId="category-select-label"
                  multiple
                  value={localCategoryIds}
                  onChange={(e) => setLocalCategoryIds(e.target.value as string[])}
                  input={<OutlinedInput label="Chọn danh mục" />}
                  renderValue={(selected) =>
                    categories
                      ?.filter((c) => selected.includes(c.id.toString()))
                      .map((c) => c.name)
                      .join(', ') || ''
                  }
                >
                  {categories?.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id.toString()}>
                      <Checkbox checked={localCategoryIds.includes(cat.id.toString())} />
                      <ListItemText primary={cat.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Suggested Category Checkboxes */}
              <FormGroup sx={{ mt: 2 }}>
                {categories?.slice(0, 4).map((cat) => (
                  <FormControlLabel
                    key={cat.id}
                    control={
                      <Checkbox
                        checked={localCategoryIds.includes(cat.id.toString())}
                        onChange={(e) => {
                          const selected = [...localCategoryIds];
                          if (e.target.checked) {
                            selected.push(cat.id.toString());
                          } else {
                            const index = selected.indexOf(cat.id.toString());
                            if (index !== -1) selected.splice(index, 1);
                          }
                          setLocalCategoryIds(selected);
                        }}
                      />
                    }
                    label={cat.name}
                  />
                ))}
              </FormGroup>
            </Box>

            {/* Medium Filter */}
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom fontFamily="Merriweather, sans-serif" fontWeight="700">
                Chọn chất liệu
              </Typography>
              <FormControl fullWidth size="small" margin="normal">
                <InputLabel id="medium-label">Chất liệu</InputLabel>
                <Select
                  labelId="medium-label"
                  value={medium}
                  label="Chất liệu"
                  onChange={(e) => updateParam('medium', e.target.value)}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="Canvas">Canvas</MenuItem>
                  <MenuItem value="Paper">Giấy</MenuItem>
                  <MenuItem value="Wood">Gỗ</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Dimensions Filter */}
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom fontFamily="Merriweather, sans-serif" fontWeight="700">
                Kích thước có sẵn
              </Typography>
              <Autocomplete
                multiple
                freeSolo
                options={AVAILABLE_DIMENSIONS}
                value={localDimensions}
                onChange={(_, val) => setLocalDimensions(val)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" size="small" placeholder="Nhập hoặc chọn kích thước" />
                )}
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Price Range Filter */}
            <Box mt={4}>
              <Typography variant="subtitle2" gutterBottom>
                Khoảng giá (VNĐ){' '}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 'normal', ml: 1 }}
                >
                  {localPriceRange[0].toLocaleString('vi-VN')}₫ – {localPriceRange[1].toLocaleString('vi-VN')}₫
                </Typography>
              </Typography>
              <Slider
                value={localPriceRange}
                onChange={(_, val) => {
                  setIsSliding(true);
                  setLocalPriceRange(val as number[]);
                }}
                onChangeCommitted={(_, val) => {
                  setIsSliding(false);
                  setLocalPriceRange(val as number[]);
                }}
                valueLabelDisplay="auto"
                min={0}
                max={100000000}
                step={1000000}
                valueLabelFormat={(v) => v.toLocaleString('vi-VN')}
                sx={{
                  color: 'primary.main',
                  '& .MuiSlider-thumb': {
                    borderRadius: '50%',
                  },
                }}
              />
            </Box>
          </Grid>

          {/* PRODUCT LIST */}
          <Grid item xs={12} md={9}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: '"Orpheus Pro", serif', fontSize: '25px', color: '#423E31' }}
            >
              <Box component="span" sx={{ fontWeight: 600 }}>
                {data?.total ?? 0}
              </Box>
              <Box component="span" sx={{ fontWeight: 500 }}>
                {' Tác phẩm'}
              </Box>
            </Typography>

            {isLoading ? (
              <Grid container spacing={2}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Grid item xs={6} sm={4} key={i}>
                    <Skeleton variant="rectangular" height={180} />
                    <Skeleton height={30} />
                  </Grid>
                ))}
              </Grid>
            ) : !data?.items.length ? (
              <Typography>Không tìm thấy tác phẩm nào.</Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  {data.items.map((product: Product) => (
                    <Grid key={product.id} item xs={6} sm={4}>
                      <ProductFilterItem product={product} />
                    </Grid>
                  ))}
                </Grid>

                <Box mt={4} display="flex" justifyContent="center" gap={1} flexWrap="wrap">
                  {Array.from({ length: Math.ceil(data.total / PAGE_SIZE) }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? 'contained' : 'outlined'}
                      onClick={() => updateParam('page', p.toString())}
                      size="small"
                    >
                      {p}
                    </Button>
                  ))}
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductFilterContainer;
