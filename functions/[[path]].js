const ICON_BASE64 = `iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE40lEQVR42sWXT2hTWRTGf+++lzQvbZ7xT6hSNzUK2qpEEEWwLmVGF3Vho2AFoRW6FmehG4dupyiuxJKuC7oTxaHqQilVUQQxQ8CNFVQMonnJS9/L33dmMSSMk0RbhuqBy1vce9/33XPu+c65muMUpaenm3T6L6am/mB+fp5CocBqmGVZHDx4kPPnf2PnzkGKxSU0EZG7d/9kfHyMXC5HOBxGKbUqBHzfx3Vd1q5dSyo1w6+//oKWTqfl8OHDOI5DT08PtVqN1TTDMCgWi0QiEebm5tBd1/39+fPnWJa16uANL4RCIWzbplAooMXjcbFte9Xc/i0i0WgULRaLCT/RjJVu0HUdTdOo1+uISNu5dtZu/YoJaJpGPp+nVqthWRa6riMiaJqGiGDbNvV6vWWP7/tEIhECgUALCWMl4JVKhWQyyaZNm5idncVxHAzDaIIeP36cvr4+6vV60xONS3fnzh0WFxcJBoNfkVgWAaUUrusyMDDAtWvXME2TQqFAKpViw4YNeJ7HlStXGBsba3qkAa6UIpvNMjs72/aiq+WevlwuMzExgWEYOI7DyZMn6e7uxnVdtmzZwsjICPl8ns+fP1MoFHAcp6moly9f5u3bt3R1da08BEoplpaWSCQSHDt2jFKphFKKvXv3sn//fu7du0c4HKZWq6HrOqFQiHPnzpHJZDBNE4BMJkM0Gm2rM2o5BMrlMmfPniUajfLhwwfu37+PaZqMjIw0499wu6ZppNNpFhYWePr0KY8fP6ZaraLrevv/L+f0u3btYnh4GIBbt24xOTlJpVLhyJEj9Pf347pui9wGAgGCwSCGYVAoFNqm4HdDoJTC8zzGx8eJxWJ8+vSJmzdvkslkePLkCYcOHeLo0aP/aLqu4/s+tVqNqakplpaWUEqh6zq3b9/m+vXrLRkAQCwWk3ajt7dXLMuSRCIhHz9+FBGRVColuq6LUkrGxsZERGR+fl7i8bhks1kplUry5csXKZVKUqlUmkNE5MSJE2KapmzcuPErHLWc0/f29pLL5Zienmbr1q0kEgnevHnD+/fvOXDgAP39/Vy4cAHP8wgEApRKJTzPo1gsksvlEBG2b99OtVptUUrjW7Hftm0bw8PDiAg3btzAdV0WFhao1+tNaa3X65w5c4bR0VGePXvG+vXrm6G4evUqO3bsAKBWq7WVaaNT3lerVS5evMjmzZsREWZmZpicnGTdunUt60+dOsX09DQvXrzg3bt3AJTLZTzPa4pPpxphdCocpmny4MEDXr58yeLiIq9evWJubo6HDx/i+35zrYjQ3d1NPp+nWCximiYiQqVSwff9jsAdCTRkd/fu3cTjcYrFIgMDA+zbt498Pt82nUSEZDLJ6dOnm/O+79PX10elUiEYDK6MgOd5TExMMDo62tTzxreTichXntE0DcdxcF0Xy7IQke+X48bl27NnD8lksvnTxsb/ltpvmYhgWRZr1qwhm802JfvfJFsINCqZUopLly5RKpW+G8Pl2KNHj3j9+nVbAi0tWaPyNZTs/5qIEA6HCYVCLeBt74CI0NXVRTgc7qjfK+2ifN9vC94xDUXkh7ToAMqyrI7sVrsttywLNTQ0hOu6GIbxw8ANw8B1XYaGhn7+00wNDg6SSs0QiUSwbXtVw+H7PrZtE4lESKVmGBwcRPvZz/O/AR7L01CdkQUZAAAAAElFTkSuQmCC`;

function iconBytes() {
  const binary = atob(ICON_BASE64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function onRequest(context) {
  const path = new URL(context.request.url).pathname;

  if (path === '/favicon-as-final-v2.png' || path === '/favicon.ico') {
    return new Response(iconBytes(), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }

  return context.next();
}
