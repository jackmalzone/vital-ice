# Vital Ice Website

A modern, immersive wellness website for Vital Ice, a San Francisco-based recovery brand focused on cold plunge, sauna, and contrast therapy experiences. Built with cinematic design, smooth animations, and a comprehensive service showcase.

## 🚀 Features

### **Immersive Design & Experience**

- **Cinematic Hero Section**: Rotating video backgrounds with ambient water themes
- **Scroll-Driven Animations**: Smooth parallax effects and reveal animations
- **Glassmorphic UI**: Modern glass effects with blur and transparency
- **Dark Theme**: Premium dark aesthetic with high contrast
- **Fog Transitions**: Atmospheric fog effects between sections
- **Underwater Newsletter**: Serene underwater ambient design with floating particles

### **Comprehensive Service Pages**

- **Template System**: Unified `ServiceTemplate` component for consistency
- **6 Complete Services**: Cold Plunge, Infrared Sauna, Traditional Sauna, Compression Boots, Percussion Massage, Red Light Therapy
- **Data-Driven Content**: Centralized service data management
- **Professional Content**: Detailed benefits, process steps, and imagery
- **Consistent Styling**: Unified design language across all services

### **Advanced Navigation & Layout**

- **3D Ice Cube Menu**: Rotating ice cube icon for mobile navigation
- **Dropdown Services**: Organized service navigation with dropdown menus
- **Sticky Header**: Persistent navigation with glassmorphic effects
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Smooth Scrolling**: Enhanced scroll experience with performance optimization

### **Content-Rich Pages**

- **Vision Page**: Cinematic storytelling with dynamic text colors
- **Historical Timeline**: Interactive timeline with scroll-locked sections
- **About Page**: Company story with ambient video backgrounds
- **Contact Page**: Professional contact form with EmailJS integration
- **Performance Demo**: Interactive performance showcase

### **Enhanced Sections**

- **Benefits Showcase**: Alternating image/text pairs with parallax effects
- **Testimonials**: Split-layout testimonials with floating accent elements
- **Newsletter Wrapper**: Underwater ambient design with blue particles
- **Meet Founders**: Team introduction with immersive backgrounds
- **Our Purpose**: Mission statement with cinematic presentation

### **Technical Excellence**

- **Performance Optimized**: Lighthouse score > 90, fast loading
- **Accessibility**: WCAG 2.1 Level AA compliance
- **SEO Ready**: Optimized meta tags and structured data
- **Mobile Optimized**: Touch-friendly interactions and responsive design
- **Animation System**: Spring-based physics with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with BEM methodology
- **Animations**: Framer Motion + GSAP ScrollTrigger
- **Forms**: EmailJS/Resend
- **Analytics**: Plausible/Google Analytics
- **Hosting**: Vercel
- **Performance**: Image optimization, lazy loading, code splitting

## 🏗️ Project Structure

```
src/
├── app/                    # App router pages
│   ├── services/          # Service pages (template-based)
│   │   ├── cold-plunge/   # Cold plunge therapy
│   │   ├── infrared-sauna/ # Infrared sauna therapy
│   │   ├── traditional-sauna/ # Traditional sauna
│   │   ├── compression-boots/ # Compression therapy
│   │   ├── percussion-massage/ # Massage therapy
│   │   └── red-light-therapy/ # Light therapy
│   ├── about/             # About page with video background
│   ├── contact/           # Contact form page
│   ├── vision/            # Cinematic vision page
│   ├── historical-timeline/ # Interactive timeline
│   └── performance-demo/  # Performance showcase
├── components/            # React components
│   ├── shared/           # Reusable components
│   │   ├── ServiceTemplate/ # Service page template
│   │   ├── Button/       # Interactive buttons
│   │   └── Card/         # Content cards
│   ├── sections/         # Page sections
│   │   ├── Hero/         # Cinematic hero with video rotation
│   │   ├── Benefits/     # Benefits showcase with parallax
│   │   ├── Testimonials/ # Split-layout testimonials
│   │   ├── Newsletter/   # Newsletter with underwater design
│   │   ├── NewsletterWrapper/ # Enhanced ambient wrapper
│   │   ├── About/        # About section
│   │   ├── MeetFounders/ # Team introduction
│   │   └── OurPurpose/   # Mission statement
│   ├── layout/           # Layout components
│   │   ├── Header/       # Navigation with 3D ice cube
│   │   ├── Footer/       # Site footer
│   │   └── Navigation/   # Navigation menu
│   └── ui/               # UI primitives
│       ├── AdaptiveMedia/ # Video/image components
│       ├── VideoBackground/ # Background videos
│       ├── AnimatedSection/ # Animation wrappers
│       ├── FogTransition/ # Atmospheric fog effects
│       ├── Logo/         # Brand logo component
│       ├── PerformanceDemo/ # Performance showcase
│       └── Icons/        # Custom icon components
├── lib/                  # Utilities and data
│   ├── data/            # Service data and content
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   │   ├── animations.ts # Spring-based animation system
│   │   └── performanceDetection.ts # Performance utilities
│   ├── analytics.ts     # Analytics integration
│   └── email.ts         # Email service integration
└── types/               # TypeScript definitions
```

## 🎯 Service Pages

### **Complete Service Portfolio**

- **Cold Plunge Therapy** - Controlled cold exposure for recovery and mental resilience
- **Infrared Sauna** - Deep tissue warming and detoxification with red light therapy
- **Traditional Sauna** - Classic Finnish-style sauna experience with fire/heat themes
- **Compression Boots** - Recovery and circulation therapy for athletes
- **Percussion Massage** - Deep tissue massage therapy for muscle recovery
- **Red Light Therapy** - Cellular regeneration and healing with light therapy

### **Template System Benefits**

- **Consistent Design**: Unified styling across all service pages
- **Easy Maintenance**: Centralized content management
- **Scalable**: Simple to add new services
- **Professional Content**: Detailed benefits, process steps, and imagery
- **SEO Optimized**: Individual pages for each service

## 🎨 Design System

### **Color Palette**

- **Mist**: `#9EC7C5` - Primary brand color
- **Arctic**: `#00B7B5` - Signature Vital Ice blue
- **Deluge**: `#0000E6` - Deep blue
- **Sun Ray**: `#F56F0D` - Warm accent
- **Void**: `#000000` - Pure black
- **Bone**: `#EBEDE5` - Neutral white

### **Typography**

- **Headings**: Bebas Neue (Bold, impactful)
- **Body**: Montserrat (Clean, readable)
- **UI**: Inter (Modern, accessible)

### **Animation Philosophy**

- **Spring Physics**: Organic, natural motion using Framer Motion
- **Scroll-Driven**: Parallax effects and reveal animations
- **Micro-Interactions**: Hover states and button animations
- **Performance**: Optimized animations with reduced motion support

## 📱 Responsive Design

### **Mobile-First Approach**

- Fluid typography and spacing
- Optimized touch targets
- Progressive enhancement
- Cross-browser compatibility
- Performance optimization for mobile networks

### **Interactive Elements**

- 3D rotating ice cube menu icon
- Smooth scroll navigation
- Touch-friendly service cards
- Responsive video backgrounds
- Adaptive text sizing

## 🔧 Key Features

### **Hero Section**

- **Video Rotation**: 6 ambient videos rotating every 8 seconds
- **Preloading**: Optimized video loading with preload strategy
- **Glassmorphic Effects**: Blur and transparency effects
- **Animated Elements**: Floating blue blob and gradient overlays
- **Scroll Integration**: Scroll-driven opacity and blur effects

### **Benefits Section**

- **Alternating Layout**: Image/text pairs with parallax effects
- **Custom Icons**: SVG icons for each service type
- **Intersection Observer**: Smooth reveal animations
- **Texture Background**: Black sand texture with overlays
- **Floating Elements**: Ambient floating particles

### **Testimonials**

- **Split Layout**: Image and content side-by-side
- **Auto-Rotation**: 6-second rotation with manual controls
- **Floating Accents**: Dynamic accent elements
- **Smooth Transitions**: Framer Motion transitions
- **Navigation Dots**: Clean dot navigation

### **Newsletter Wrapper**

- **Underwater Design**: Serene underwater ambient background
- **Blue Particles**: 12 floating blue particles
- **Floating Bubbles**: 8 animated bubble elements
- **Gradient Layers**: Multiple gradient overlays for depth
- **Glow Effects**: Ambient glow effects

### **Navigation System**

- **3D Ice Cube**: Rotating ice cube for mobile menu
- **Dropdown Services**: Organized service navigation
- **Glassmorphic Header**: Transparent header with blur
- **Smooth Transitions**: Animated menu transitions
- **Accessibility**: ARIA labels and keyboard navigation

## 📊 Performance

### **Optimization Targets**

- Lighthouse score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Speed Index < 3.4s
- Total Blocking Time < 300ms

### **Implementation**

- Image optimization and lazy loading
- Code splitting and tree shaking
- Bundle analysis and optimization
- Performance monitoring
- Mobile network optimization

## 🔒 Security & Accessibility

### **Security Measures**

- Input validation and sanitization
- CSRF protection
- Secure headers
- Environment variable management
- Privacy compliance

### **Accessibility Standards**

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements
- Focus management
- Reduced motion support

## 📄 Pages Overview

### **Main Pages**

- **Home** (`/`) - Immersive landing with video rotation
- **Services** (`/services`) - Service overview with navigation
- **About** (`/about`) - Company story with video background
- **Vision** (`/vision`) - Cinematic vision presentation
- **Contact** (`/contact`) - Contact form with EmailJS
- **Historical Timeline** (`/historical-timeline`) - Interactive timeline

### **Service Pages**

- **Cold Plunge** (`/services/cold-plunge`) - Cold therapy details
- **Infrared Sauna** (`/services/infrared-sauna`) - Infrared therapy
- **Traditional Sauna** (`/services/traditional-sauna`) - Traditional sauna
- **Compression Boots** (`/services/compression-boots`) - Compression therapy
- **Percussion Massage** (`/services/percussion-massage`) - Massage therapy
- **Red Light Therapy** (`/services/red-light-therapy`) - Light therapy

## 🚦 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/jackmalzone/vital-ice.git
   cd vital-ice
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## 📄 License

This project is proprietary and confidential.

## 👥 Team

- **Jack Malzone** - Lead Developer & Project Manager
- **Vital Ice Team** - Design & Content
- **Contributors** - Development & Testing

## 🚀 Deployment

The site is automatically deployed to Vercel on pushes to the `main` branch. The production URL is available for client review and testing.

---

**Built with ❤️ for the Vital Ice community**

_Experience the transformative power of cold therapy and heat therapy in an immersive digital environment._
