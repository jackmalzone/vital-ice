# Video Inventory - Vital Ice CDN Assets

This document tracks all video assets hosted on Cloudflare R2 CDN for the Vital Ice website.

## CDN Base URL

```
https://pub-3fd38cef83ec4139b038b229662d7717.r2.dev/
```

## Hero Section Videos

### Ambient Background Videos (Rotating)

Used in: `src/components/sections/Hero/Hero.tsx`

| Video          | MP4 URL              | WebM URL              | Type | Purpose                  |
| -------------- | -------------------- | --------------------- | ---- | ------------------------ |
| cold-ambient-1 | `cold-ambient-1.mp4` | `cold-ambient-1.webm` | Cold | Hero background rotation |
| hot-ambient-1  | `hot-ambient-1.mp4`  | `hot-ambient-1.webm`  | Hot  | Hero background rotation |
| cold-ambient-2 | `cold-ambient-2.mp4` | `cold-ambient-2.webm` | Cold | Hero background rotation |
| hot-ambient-2  | `hot-ambient-2.mp4`  | `hot-ambient-2.webm`  | Hot  | Hero background rotation |
| cold-ambient-3 | `cold-ambient-3.mp4` | `cold-ambient-3.webm` | Cold | Hero background rotation |
| hot-ambient-3  | `hot-ambient-3.mp4`  | `hot-ambient-3.webm`  | Hot  | Hero background rotation |
| cold-ambient-4 | `cold-ambient-4.mp4` | `cold-ambient-4.webm` | Cold | Hero background rotation |
| hot-ambient-4  | `hot-ambient-4.mp4`  | `hot-ambient-4.webm`  | Hot  | Hero background rotation |

## About Page Videos

### San Francisco Marina

Used in: `src/app/about/page.tsx`

| Video     | MP4 URL         | WebM URL         | Purpose                    |
| --------- | --------------- | ---------------- | -------------------------- |
| sf_marina | `sf_marina.mp4` | `sf_marina.webm` | About page hero background |

## Historical Timeline Videos

### Ancient Hot Spring

| Video              | MP4 URL                  | WebM URL                  | Purpose                          |
| ------------------ | ------------------------ | ------------------------- | -------------------------------- |
| ancient_hot-spring | `ancient_hot-spring.mp4` | `ancient_hot-spring.webm` | Indus Valley timeline background |

## Performance Demo Videos

### Local Video Assets (Not on CDN)

Used in: `src/app/performance-demo/page.tsx`

| Video                     | Path                                    | Purpose                              |
| ------------------------- | --------------------------------------- | ------------------------------------ |
| ambient-water-high        | `/videos/ambient-water-high.mp4`        | Performance demo - high quality      |
| ambient-water-medium      | `/videos/ambient-water-medium.mp4`      | Performance demo - medium quality    |
| ambient-water-low         | `/videos/ambient-water-low.mp4`         | Performance demo - low quality       |
| indus-valley-ambient      | `/videos/indus-valley-ambient.mp4`      | Performance demo - historical        |
| indus-valley-ambient-720p | `/videos/indus-valley-ambient-720p.mp4` | Performance demo - historical medium |
| indus-valley-ambient-480p | `/videos/indus-valley-ambient-480p.mp4` | Performance demo - historical low    |

## Video Usage Patterns

### Hero Section

- **Component**: `VideoBackground`
- **Strategy**: Rotating ambient videos (8 total)
- **Mobile**: Disabled for performance
- **Format**: MP4 with WebM fallback

### About Page

- **Component**: Native `<video>` element
- **Strategy**: Single background video
- **Mobile**: Always enabled
- **Format**: MP4 only

### Historical Timeline

- **Component**: `AdaptiveMedia`
- **Strategy**: Adaptive quality based on performance
- **Mobile**: Conditional based on device capability
- **Format**: MP4 with WebM fallback

### Performance Demo

- **Component**: `AdaptiveMedia`
- **Strategy**: Quality testing with local assets
- **Mobile**: Always enabled for testing
- **Format**: MP4 only (local files)

## WebM Implementation Strategy

### Priority Order

1. **Mobile devices**: WebM preferred for better compression
2. **Desktop with good connection**: MP4 preferred for compatibility
3. **Low-end devices**: WebM for smaller file sizes
4. **Fallback**: Always provide MP4 as backup

### Performance Benefits

- **WebM**: ~30-50% smaller file sizes
- **Mobile**: Better battery life with WebM
- **Bandwidth**: Reduced data usage
- **Loading**: Faster initial load times

## File Naming Convention

All WebM files follow the same naming pattern as MP4 files:

- Original: `filename.mp4`
- WebM: `filename.webm`

## CDN Configuration

- **Provider**: Cloudflare R2
- **Region**: Global
- **Caching**: Aggressive caching for video assets
- **Compression**: Enabled for both formats
- **Bandwidth**: Unlimited with R2

## Monitoring

### Performance Metrics

- Video load times
- Format preference detection
- Mobile vs desktop usage
- Error rates by format

### Analytics

- Most viewed videos
- Format adoption rates
- Performance impact
- User experience metrics

## Future Considerations

### Potential Additions

- **AV1 format**: For even better compression
- **HLS streaming**: For adaptive bitrate
- **DASH**: For dynamic quality switching
- **Thumbnails**: For video previews

### Optimization Opportunities

- **Preloading**: Smart preload strategies
- **Lazy loading**: On-demand video loading
- **Quality switching**: Dynamic quality adjustment
- **Caching**: Browser-level caching optimization
