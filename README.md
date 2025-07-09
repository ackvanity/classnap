# ClassNap: whether to sleep or not

A funny little game about sleeping in class. Your goal is to point at as many 
sleeping students as possible, but don't wait too long and definitely don't 
backstab the good folks...

[Play online](https://ackvanity.github.io/classnap) now!

# Notes for developers

After cloning this reposity, you will have a few folders:
- `asset-raw`: Raw assets containing editable text
- `asset`: Converted assets where any SVG text is converted to paths for compatibility
- `utils`: Useful Node.js utilities

## Utilities

Currently, there are three utility scripts listed:

- `__assetlist.js`: run without arguments to scan the `assets` folder and 
  generate a manifest to place in app.js as the `imageFiles` constant. This is
  required so that the script knows which files to load
- `serve.js`: a basic HTTP server to locally serve files. Mostly used to debug
  font loading
- `svg2path.js`: since this game uses Josefin Sans, a font which is not available
  by default on all devices, SVGs may fall back to another font when loaded. To
  avoid this, run svg2path.js on a machine where Inkscape (used for the conversion)
  is installed (modify the executable location as needed) along with the Josefin
  Sans font. This script will scan all assets in `assets-raw`, copying or converting
  as required. **This will override files in assets! Please do not modify manually**.


## Asset workflow

1. Ensure the Node.js runtime, Inkscpe editor and Josefin Sans font are installed on the development machine
2. Create, download, or use any SVGs and store in `assets-raw`
3. Run `node utils/svg2path.js` to copy over the files and convert the SVG to 
  paths (e.g. so the client does not need the fonts installed). **This will override files in `assets`! Please do not modify this directory manually**. If you encounter errors
  regarding the SVG conversion process, try changing the options/path in the `execSync` call.
4. Run `node utils/__assetlist.js` and copy the output to `imageFiles` in `app.js`
5. View the application locally or use `node utils/serve.js` for an HTTP server.

## Loading procedure

1. All images and assets are loaded from `assets` according to the `imageFiles` manifest
2. All image objects are keyed by directory in `images`
3. After all fonts are loaded, the first frame draw is performed