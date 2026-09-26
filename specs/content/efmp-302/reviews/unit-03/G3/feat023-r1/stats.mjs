import sharp from 'sharp';
const inp = process.argv[2];
const img = sharp(inp);
const meta = await img.metadata();
const stats = await img.stats();
console.log(JSON.stringify({ size: `${meta.width}x${meta.height}`, channels: stats.channels.map(c => ({ min: c.min, max: c.max, mean: Math.round(c.mean) })) }, null, 2));
