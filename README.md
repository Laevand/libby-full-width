# Libby Full Width Reader

A Chrome extension that removes the width and height constraints on the Libby magazine reader, allowing magazines to fill your entire screen.

If you read magazines on [libbyapp.com](https://libbyapp.com) with a large or ultrawide monitor, you've probably noticed the reader caps the layout at ~1320px — wasting most of your screen. This extension fixes that.

![Before and After](screenshots/comparison.png)

## Install

1. Download or clone this repo
2. Open `chrome://extensions/` in Chrome
3. Enable **Developer Mode** (top right toggle)
4. Click **Load unpacked** and select this folder
5. Open a magazine on libbyapp.com — it should now fill your screen

## How It Works

Two CSS rules. That's it.

- Removes `max-width` on the main container so the app's layout engine fills the full viewport width
- Overrides `max-height` to use the actual available screen height instead of the app's conservative default

The app re-renders content natively at the larger size — no blurry upscaling, no resolution loss.

## Notes

- Built for magazine reading (pre-paginated spreads). Behavior with ebooks may vary.
- The `72px` height offset in `override.css` accounts for Libby's header bar. If the bottom of your magazine is slightly clipped, try adjusting this value.
- Tested on Chrome. Should work on any Chromium-based browser (Edge, Brave, Arc, etc.).
