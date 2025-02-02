import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Collapse,
  Dialog,
  Drawer,
  useTheme,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  MenuBook,
  Book,
  Description,
  Bookmark,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material'
import { ChromePicker } from 'react-color'
import BibleModel from './components/BibleModel';

function getContrastTextColor(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 40; // 40-70%
  const lightness = Math.floor(Math.random() * 30) + 20; // 20-50%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const presets = {
  classic: {
    'outer-leather': '#513520',
    'inner-leather': '#8B4513',
    'guilding': '#ffd700',
    'ribbon-1': '#513520',
    'ribbon-2': '#513520',
    'ribbon-3': '#513520'
  },
  simple: {
    'outer-leather': '#222222',
    'inner-leather': '#A9A9A9',
    'guilding': '#C0C0C0',
    'ribbon-1': '#DAA520',
    'ribbon-2': '#C0C0C0',
    'ribbon-3': '#B87333'
  },
  rustic: {
    'outer-leather': '#8B4513',
    'inner-leather': '#DEB887',
    'guilding': '#CD853F',
    'ribbon-1': '#556B2F',
    'ribbon-2': '#8B7355',
    'ribbon-3': '#A0522D'
  },
  ornate: {
    'outer-leather': '#563159',
    'inner-leather': '#FFFFF0',
    'guilding': '#DAA520',
    'ribbon-1': '#DC143C',
    'ribbon-2': '#4169E1',
    'ribbon-3': '#8B008B'
  }
};

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [selectedComponent, setSelectedComponent] = useState('outer-leather')
  const [expandedComponent, setExpandedComponent] = useState('')
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [selectedColorItem, setSelectedColorItem] = useState(null)
  const [colors, setColors] = useState({
    'outer-leather': '#722F37',
    'inner-leather': '#d2b48c',
    'guilding': '#ffd700',
    'ribbon-1': '#2D5A3A',
    'ribbon-2': '#FFFFF0',
    'ribbon-3': '#1B4B82'
  })

  const handleRandomizeColors = () => {
    const newColors = {};
    Object.keys(colors).forEach(key => {
      newColors[key] = getRandomColor();
    });
    setColors(newColors);
  };

  const handleColorChange = (color) => {
    setColors(prevColors => ({
      ...prevColors,
      [selectedColorItem]: color.hex
    }))
  }

  const handleExpandClick = (componentId) => {
    setExpandedComponent(expandedComponent === componentId ? '' : componentId);
  };

  const handleColorClick = (componentId) => {
    setSelectedColorItem(componentId);
    setColorPickerOpen(true);
  };

  const components = [
    { name: 'Outer Leather', icon: <Book />, id: 'outer-leather' },
    { name: 'Inner Leather', icon: <MenuBook />, id: 'inner-leather' },
    { name: 'Guilding', icon: <Description />, id: 'guilding' },
    { name: 'Ribbon 1', icon: <Bookmark />, id: 'ribbon-1' },
    { name: 'Ribbon 2', icon: <Bookmark />, id: 'ribbon-2' },
    { name: 'Ribbon 3', icon: <Bookmark />, id: 'ribbon-3' }
  ]

  const SidebarContent = () => (
    <Box sx={{ 
      width: { xs: 250, sm: 180 }, 
      p: 2,
      backgroundColor: '#ffffff',
      height: '100%',
      borderRight: '1px solid rgba(0, 0, 0, 0.08)'
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#1a1a1a',
          textAlign: 'center',
          width: '100%'
        }}
      >
        Customization
      </Typography>
      <List sx={{ mb: 3 }}>
        {components.map((component) => (
          <ListItem
            key={component.id}
            button
            dense
            onClick={() => handleColorClick(component.id)}
            sx={{
              py: 1,
              borderRadius: 1,
              mb: 0.5,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                transform: 'translateX(4px)'
              }
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 36,
              color: colors[component.id]
            }}>
              {component.icon}
            </ListItemIcon>
            <ListItemText 
              primary={component.name} 
              sx={{ 
                '& .MuiTypography-root': { 
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#2c2c2c'
                } 
              }} 
            />
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: colors[component.id],
                ml: 1,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  cursor: 'pointer'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1.5,
        px: 1
      }}>
        <select 
          onChange={(e) => setColors(presets[e.target.value])} 
          style={{ 
            width: '100%', 
            padding: '0.8em 1em',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            fontSize: '0.9em',
            fontWeight: '500',
            fontFamily: 'inherit',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
            color: '#2c2c2c',
            transition: 'all 0.2s ease-in-out',
            outline: 'none',
            textAlign: 'center'
          }}
        >
          <option value="" disabled selected>Presets</option>
          <option value="classic">Classic</option>
          <option value="simple">Simple</option>
          <option value="rustic">Rustic</option>
          <option value="ornate">Ornate</option>
        </select>
        <button 
          onClick={handleRandomizeColors} 
          style={{ 
            width: '100%',
            padding: '0.8em 1em',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            fontSize: '0.9em',
            fontWeight: '500',
            fontFamily: 'inherit',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
            color: '#2c2c2c',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#f1f3f5',
              transform: 'translateY(-1px)'
            }
          }}
        >
          Randomize Colors
        </button>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh', width: '100vw', display: 'flex', color: '#000000', overflow: 'hidden' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <SidebarContent />
        </Drawer>
      ) : (
        <Paper elevation={3} sx={{ 
          width: 180, 
          borderRadius: 0, 
          borderRight: 1, 
          borderColor: 'divider',
          display: drawerOpen ? 'block' : 'none',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 1200
        }}>
          <SidebarContent />
        </Paper>
      )}

      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        p: { xs: 0, sm: 1 },
        ml: { xs: 0, sm: drawerOpen ? '180px' : 0 },
        transition: 'margin-left 0.3s ease-in-out'
      }}>
        <Box sx={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%'
        }}>
          <BibleModel colors={colors} />
        </Box>
      </Box>
      <Dialog
        open={colorPickerOpen}
        onClose={() => setColorPickerOpen(false)}
        PaperProps={{
          sx: { p: 2 }
        }}
      >
        <ChromePicker
          color={selectedColorItem ? colors[selectedColorItem] : '#fff'}
          onChange={handleColorChange}
        />
      </Dialog>
    </Container>
  )
}

export default App
