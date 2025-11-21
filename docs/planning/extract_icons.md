# 🎨 Warcraft Icon Extraction Guide

## 🎯 **Step-by-Step Icon Extraction**

### **Tools You'll Need**
- Image editing software (Photoshop, GIMP, or online tools)
- Browser developer tools
- Or simple screenshot cropping tools

### **Method 1: Manual Extraction** (Recommended)
1. **Open the Warcraft icon image** in your preferred editor
2. **Use the grid system** - each icon appears to be roughly 64x64 pixels
3. **Crop individual icons** and save as PNG with transparency
4. **Save to**: `website/assets/icons/[icon-name].png`

### **Method 2: Browser Dev Tools**
1. If the icons are from wowhead.com, you can inspect and download individual icons
2. Right-click → Inspect → Find image URLs
3. Download directly from the CDN

## 📋 **Priority Icons to Extract**

Based on your collection, here are the **TOP 10 ICONS** we need first:

### **Contract Icons** (High Priority)
1. **Row 1, Column 7**: Purple hooded figure → `shadow-council.png`
2. **Row 2, Column 8**: Golden hammer/anvil → `sealed-bidding.png` 
3. **Row 4, Column 8**: Green glowing gem → `phantom-treasures.png`
4. **Row 3, Column 2**: Fiery eye → `identity-ward.png`
5. **Row 1, Column 3**: Crown/royal → `private-dao.png`

### **Feature Icons** (Medium Priority)
6. **Row 2, Column 3**: Green claw/stealth → `stealth.png`
7. **Row 6, Column 8**: Lightning bolt → `lightning-fast.png`
8. **Row 1, Column 1**: Shield/armor → `ward-protection.png`
9. **Row 4, Column 7**: Glowing orb → `arcane-magic.png`
10. **Row 3, Column 2**: All-seeing eye → `truth-sight.png`

## 🛠️ **Implementation Process**

### **Step 1: Save Icons**
```bash
# Save icons to this directory structure:
website/assets/icons/
├── shadow-council.png      # Purple hooded figure
├── sealed-bidding.png      # Golden hammer
├── phantom-treasures.png   # Green gem
├── identity-ward.png       # Fiery eye
├── private-dao.png         # Crown
├── stealth.png            # Green claw
├── lightning-fast.png     # Lightning
├── ward-protection.png    # Shield
├── arcane-magic.png       # Glowing orb
└── truth-sight.png        # Eye
```

### **Step 2: Test Implementation**
Once you save the icons, the CSS is already set up! The icons will automatically work with:
- Hover effects (golden glow + scale)
- Different sizes (small, normal, large)
- Special glows (arcane, shadow, fire, nature)

### **Step 3: Update HTML** (I'll do this)
Replace the current emoji/fantasy icons with proper Warcraft icon classes:
```html
<!-- Before -->
<span class="fantasy-icon icon-crown"></span>

<!-- After -->
<span class="warcraft-icon icon-shadow-council"></span>
```

## 🎨 **Icon Specifications**

- **Size**: 64x64 pixels (will be scaled via CSS)
- **Format**: PNG with transparency
- **Background**: Transparent
- **Quality**: High resolution for crisp display

## 🚀 **Quick Start**

If you want to test immediately:
1. **Extract just 3 icons**: shadow-council, sealed-bidding, phantom-treasures
2. **Save them** to `website/assets/icons/`
3. **Refresh the site** - they should appear with golden glow effects!

## 💡 **Pro Tips**

- **Batch processing**: Use tools like Photoshop's "Export As" to batch process multiple icons
- **Consistent naming**: Follow the exact naming convention in the CSS
- **Size consistency**: Keep all icons the same dimensions for uniform appearance
- **Transparency**: Ensure clean transparent backgrounds for the glow effects

## 🔄 **Alternative: Icon Font**

If you prefer, I can also convert the extracted icons into a custom icon font, which would:
- Load faster (single font file vs. multiple images)
- Scale perfectly at any size
- Support CSS styling like regular text

Let me know which approach you prefer!
