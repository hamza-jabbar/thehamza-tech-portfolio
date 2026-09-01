import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity';

// SanityImageSource covers all valid input types for the image builder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Preset helpers — auto-compress & resize on the Sanity CDN ────────────────

/** Desktop background: 1920px wide, WebP 85% */
export function desktopBg(source: SanityImageSource) {
  return urlFor(source).width(1920).quality(85).format('webp').auto('format').url();
}

/** Mobile background: 390px wide, WebP 80% */
export function mobileBg(source: SanityImageSource) {
  return urlFor(source).width(390).quality(80).format('webp').auto('format').url();
}

/** Gallery thumbnail: 1200×1200 square crop, WebP 80% */
export function galleryThumb(source: SanityImageSource) {
  return urlFor(source).width(1200).height(1200).fit('crop').quality(80).format('webp').auto('format').url();
}

/** Profile / About Me image: 400×400 square crop, WebP 85% */
export function profileImage(source: SanityImageSource) {
  return urlFor(source).width(400).height(400).fit('crop').quality(85).format('webp').auto('format').url();
}

/** Project preview image: 1280px wide, WebP 80% */
export function projectImage(source: SanityImageSource) {
  return urlFor(source).width(1280).quality(80).format('webp').auto('format').url();
}

/** Social / link icon: 64px square, WebP 90% */
export function iconImage(source: SanityImageSource) {
  return urlFor(source).width(64).height(64).fit('crop').quality(90).format('webp').auto('format').url();
}
