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
  Dialog
} from '@mui/material'
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
    'outer-leather': '#4B0082',
    'inner-leather': '#FFFFF0',
    'guilding': '#DAA520',
    'ribbon-1': '#DC143C',
    'ribbon-2': '#4169E1',
    'ribbon-3': '#8B008B'
  }
};

function App() {
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

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh', display: 'flex' }}>
      <Paper elevation={3} sx={{ width: 180, p: 1, borderRadius: 0, borderRight: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ mb: 1, fontSize: '1rem' }}>
          Customization
        </Typography>
        <List>
          {components.map((component) => (
            <ListItem
              key={component.id}
              button
              dense
              onClick={() => handleColorClick(component.id)}
              sx={{ py: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>{component.icon}</ListItemIcon>
              <ListItemText 
                primary={component.name} 
                sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }} 
              />
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: colors[component.id],
                  ml: 1,
                  border: '1px solid rgba(0, 0, 0, 0.12)'
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <select 
            onChange={(e) => setColors(presets[e.target.value])} 
            style={{ 
              width: '90%', 
              padding: '0.6em 1.2em',
              borderRadius: '8px',
              border: '1px solid transparent',
              fontSize: '1em',
              fontWeight: '500',
              fontFamily: 'inherit',
              backgroundColor: '#e0e0e0',
              cursor: 'pointer',
              color: '#000000',
              transition: 'border-color 0.25s'
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
              width: '90%',
              padding: '0.6em 1.2em',
              borderRadius: '8px',
              border: '1px solid transparent',
              fontSize: '1em',
              fontWeight: '500',
              fontFamily: 'inherit',
              backgroundColor: '#e0e0e0',
              cursor: 'pointer',
              color: '#000000',
              transition: 'border-color 0.25s'
            }}
          >
            Randomize Colors
          </button>
        </Box>
      </Paper>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', p: 2 }}>
        <Box sx={{ width: '100%', height: '100%', maxWidth: 900, maxHeight: 900 }}>
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
