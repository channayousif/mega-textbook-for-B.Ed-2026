import sharp from 'sharp';
const [inp, out, width] = process.argv.slice(2);
await sharp(inp).resize({ width: parseInt(width, 10) }).png({ compressionLevel: 9 }).toFile(out);
console.log('wrote', out);
