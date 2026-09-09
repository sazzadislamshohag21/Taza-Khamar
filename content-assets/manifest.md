# Sazzad content assets

The homepage uses replaceable remote stock assets so the prototype stays build-free. Swap the URLs in `index.html` when final brand photography or video is available; each image element already has a meaningful fallback surface and alt text, while the hero video has a poster image and error fallback.

| Slot | Current source | Use |
|---|---|---|
| Hero video | Pexels stock MP4 | Muted, ambient field motion behind the hero copy |
| Hero poster / farmer | Unsplash `photo-1464226184884-fa280b87c399` | Farmer/field hero image and video fallback |
| Hero produce | Unsplash `photo-1542838132-92c53300491e` | Layered market produce crop |
| Hero accent fruit | Unsplash `photo-1553279768-865429fa0078` | Floating mango cutout |
| Shop category rail | Unsplash produce, fish, poultry, dairy, rice, honey, and pantry photos | Image-backed category cards with color-block fallback surfaces |
| Seasonal cards | Unsplash produce, fish, poultry, and egg photos | Replaceable product imagery |
| Farmer stories | Unsplash field and grower photos | Local farmer network cards |
| Supporting sections | Unsplash field, fish, meal, and portrait photos | Why Sazzad cards, farm-to-fridge steps, and customer story avatars |
| Journal cards | Unsplash market, meal, and field photos | Editorial tips and field notes |

## Replacement guidance

- Keep the image subject local to Bangladesh where possible: growers, fishers, markets, fields, and family tables.
- Keep useful `alt` text for content imagery and an empty `alt` for decorative cutouts.
- Keep the hero video muted and decorative; the poster must still communicate the story if video is blocked or reduced motion is requested.
- Prefer compressed WebP/AVIF or a short MP4 when moving from remote stock to owned assets.
