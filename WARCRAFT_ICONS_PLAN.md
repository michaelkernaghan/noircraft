# 🏰 Warcraft Icon Implementation Plan

Based on the amazing Warcraft icon collection you've shown, here's how we can implement these epic icons on the Noircraft site:

## 🎯 **Icon Mapping for Site Features**

### **Contract Types**
- **Shadow Council Votes**: Purple hooded figure icon (top row, 7th icon) - perfect for anonymous voting
- **Sealed Bidding Wars**: Golden hammer/anvil icon - represents crafting/auction houses  
- **Phantom Treasures**: Glowing treasure chest or gem icons
- **Identity Verification**: Eye or mask icons for identity/verification
- **Private DAO**: Crown or council chamber icons

### **Feature Icons** 
- **Privacy/Stealth**: Dark hood, shadow, or stealth icons
- **Speed/Lightning**: Lightning bolt or wind effect icons
- **Security/Protection**: Shield, armor, or ward icons
- **Magic/Enchantment**: Glowing orbs, spell effects, or rune icons
- **Verification**: Eye, crystal ball, or seeing icons

### **Navigation & UI**
- **Home**: Castle or stronghold icon
- **Contracts**: Scroll or tome icon  
- **Privacy**: Cloak or shadow icon
- **Developers**: Hammer/tools or workshop icon
- **Community**: Group or guild banner icon

## 🛠️ **Implementation Options**

### **Option 1: CSS Sprite System** (Recommended)
```css
.warcraft-icon {
    background-image: url('assets/warcraft-icons-sprite.png');
    background-size: 1600px 800px; /* Adjust based on sprite dimensions */
    width: 32px;
    height: 32px;
    display: inline-block;
}

.icon-shadow-council { background-position: -224px -64px; }
.icon-sealed-bidding { background-position: -160px -128px; }
/* etc. */
```

### **Option 2: Individual Icon Files**
- Extract individual 64x64 or 32x32 icons
- Save as PNG with transparency
- Reference directly in HTML/CSS

### **Option 3: Icon Font** 
- Convert selected icons to font format
- Use like Font Awesome but with Warcraft styling

## 📋 **Next Steps**

1. **Extract Key Icons**: You'll need to save individual icons from the collection
2. **Create Sprite Sheet**: Combine into single optimized image
3. **Generate CSS Classes**: Create positioning classes for each icon
4. **Update HTML**: Replace emoji icons with Warcraft icon classes
5. **Add Hover Effects**: Enhance with glows and animations

## 🎨 **Suggested Icon Selections**

From your collection, these icons would be perfect:

**Row 1**: 
- Icon 7 (purple hooded figure) → Shadow Council
- Icon 6 (crossed swords) → Combat/Security

**Row 2**:
- Icon 3 (green claw) → Stealth/Privacy  
- Icon 8 (glowing orb) → Magic/Enchantment

**Row 3**:
- Icon 2 (fiery eye) → Verification/Seeing
- Icon 7 (flame sword) → Power/Strength

**Row 4**:
- Icon 6 (blue crystal) → Data/Information
- Icon 8 (green gem) → Treasures/Assets

Would you like me to:
1. Create the CSS framework for using these icons?
2. Help you extract specific icons from the collection?
3. Set up the sprite system structure?
