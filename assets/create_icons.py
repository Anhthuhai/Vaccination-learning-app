#!/usr/bin/env python3
import base64
import struct

def create_png(width, height, color_rgb, filename):
    """Create a simple solid color PNG"""
    r, g, b = color_rgb
    
    # PNG signature
    png_sig = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)  # RGB
    ihdr_crc = 0x596223D5  # Pre-calculated for simplicity
    ihdr = struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    # Simple scanline data (RGB for each pixel)
    scanline = b'\x00' + bytes([r, g, b] * width)  # Filter type 0 + RGB pixels
    idat_raw = scanline * height
    
    # Compress with zlib (simplified - just create minimal valid zlib)
    import zlib
    idat_compressed = zlib.compress(idat_raw, 9)
    
    idat_len = len(idat_compressed)
    idat_type = b'IDAT'
    idat_crc = zlib.crc32(idat_type + idat_compressed) & 0xffffffff
    idat = struct.pack('>I', idat_len) + idat_type + idat_compressed + struct.pack('>I', idat_crc)
    
    # IEND chunk
    iend = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', 0xAE426082)
    
    # Write PNG
    with open(filename, 'wb') as f:
        f.write(png_sig + ihdr + idat + iend)
    
    print(f'✅ Created {filename} ({width}x{height})')

# Teal color #0d9488 = RGB(13, 148, 136)
teal = (13, 148, 136)

create_png(1024, 1024, teal, 'icon.png')
create_png(1024, 1024, teal, 'adaptive-icon.png')
create_png(1284, 2778, teal, 'splash.png')
