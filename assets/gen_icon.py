#!/usr/bin/env python3
"""
Tạo icon app vaccine - hình ống tiêm trên nền teal
Chỉ dùng thư viện chuẩn Python (không cần Pillow)
"""
import struct, zlib, math

# ── Màu sắc ──────────────────────────────────────────────────────────────────
TEAL       = (13,  148, 136)   # #0d9488 - nền
TEAL_DARK  = (10,  110, 100)   # viền nền
WHITE      = (255, 255, 255)
WHITE_T    = (240, 248, 245)   # trắng hơi xanh
SILVER     = (220, 225, 230)   # kim loại nhạt
SILVER_D   = (170, 180, 185)   # kim loại đậm
GRAY       = (140, 150, 155)
BLUE_LIGHT = (200, 235, 250)   # nước trong xilanh
BLUE       = (100, 185, 220)
TEAL_LIGHT = (150, 215, 205)
ORANGE     = (230, 100,  50)   # piston
ORANGE_D   = (200,  75,  30)
RED_SOFT   = (220,  80,  80)   # đầu kim
BLACK      = ( 30,  30,  30)
TRANS      = None              # trong suốt (alpha=0)

SIZE = 1024


# ── Canvas RGBA ───────────────────────────────────────────────────────────────
def new_canvas(w, h, color=(0,0,0,0)):
    r,g,b,a = (*color,255) if len(color)==3 else color
    return [[[r,g,b,a] for _ in range(w)] for _ in range(h)]

def px(canvas, x, y, color, alpha=255):
    """Vẽ pixel với alpha blending đơn giản"""
    h = len(canvas); w = len(canvas[0])
    if x<0 or y<0 or x>=w or y>=h: return
    if len(color)==4:
        r,g,b,a = color
    else:
        r,g,b = color; a = alpha
    src_a = a/255
    dst = canvas[y][x]
    dst_a = dst[3]/255
    out_a = src_a + dst_a*(1-src_a)
    if out_a == 0:
        canvas[y][x] = [0,0,0,0]; return
    canvas[y][x] = [
        int((r*src_a + dst[0]*dst_a*(1-src_a))/out_a),
        int((g*src_a + dst[1]*dst_a*(1-src_a))/out_a),
        int((b*src_a + dst[2]*dst_a*(1-src_a))/out_a),
        int(out_a*255)
    ]

def fill_rect(canvas, x1,y1,x2,y2, color, alpha=255):
    for y in range(y1,y2+1):
        for x in range(x1,x2+1):
            px(canvas,x,y,color,alpha)

def fill_circle(canvas, cx,cy,r, color, alpha=255, aa=True):
    for y in range(cy-r-1, cy+r+2):
        for x in range(cx-r-1, cx+r+2):
            d = math.sqrt((x-cx)**2+(y-cy)**2)
            if aa:
                a2 = max(0, min(1, r+0.8-d))
                px(canvas,x,y,color,int(a2*alpha))
            elif d<=r:
                px(canvas,x,y,color,alpha)

def fill_circle_ring(canvas, cx,cy,r_out,r_in, color, alpha=255):
    for y in range(cy-r_out-1, cy+r_out+2):
        for x in range(cx-r_out-1, cx+r_out+2):
            d = math.sqrt((x-cx)**2+(y-cy)**2)
            if r_in<=d<=r_out:
                a2 = max(0, min(1, min(r_out+0.8-d, d-r_in+0.8)))
                px(canvas,x,y,color,int(a2*alpha))

def fill_rounded_rect(canvas, x1,y1,x2,y2, r, color, alpha=255):
    # fill body
    fill_rect(canvas, x1+r,y1, x2-r,y2, color, alpha)
    fill_rect(canvas, x1,y1+r, x2,y2-r, color, alpha)
    # corners
    for cy,cx,qy,qx in [(y1+r,x1+r,-1,-1),(y1+r,x2-r,-1,1),(y2-r,x1+r,1,-1),(y2-r,x2-r,1,1)]:
        for dy in range(0,r+2):
            for dx in range(0,r+2):
                d = math.sqrt(dx**2+dy**2)
                a2 = max(0, min(1, r+0.8-d))
                px(canvas, cx+qx*dx, cy+qy*dy, color, int(a2*alpha))

def draw_line_thick(canvas, x1,y1,x2,y2, thick, color, alpha=255):
    dx = x2-x1; dy = y2-y1
    length = math.sqrt(dx*dx+dy*dy)
    if length==0: return
    nx = -dy/length; ny = dx/length
    steps = int(length)+1
    for i in range(steps):
        t = i/max(steps-1,1)
        mx = x1+dx*t; my = y1+dy*t
        for w in range(-thick, thick+1):
            bx = int(mx+nx*w); by = int(my+ny*w)
            a2 = max(0, min(1, thick+0.5-abs(w)))
            px(canvas,bx,by,color,int(a2*alpha))


# ── Vẽ icon ───────────────────────────────────────────────────────────────────
def draw_icon(size):
    c = new_canvas(size, size)
    S = size/1024  # scale factor

    def s(v): return int(v*S)

    # === 1. Nền tròn gradient teal ===
    cx=cy=size//2; R=size//2
    for y in range(size):
        for x in range(size):
            d = math.sqrt((x-cx)**2+(y-cy)**2)
            if d <= R:
                # gradient từ teal_light (góc trên trái) → teal_dark (góc dưới phải)
                t = ((x+y)/(2*size))
                r2 = int(TEAL[0]*(1-t*0.25) + TEAL_DARK[0]*t*0.25)
                g2 = int(TEAL[1]*(1-t*0.25) + TEAL_DARK[1]*t*0.25)
                b2 = int(TEAL[2]*(1-t*0.25) + TEAL_DARK[2]*t*0.25)
                aa = max(0, min(1, R+1-d))
                px(c,x,y,(r2,g2,b2),int(aa*255))

    # === 2. Hào quang sáng phía sau ống tiêm ===
    fill_circle(c, s(512), s(512), s(380), (255,255,255), 18)
    fill_circle(c, s(512), s(512), s(350), (255,255,255), 10)

    # === 3. Ống tiêm (nghiêng 45°) ===
    # Tọa độ trục chính: từ (200,820) → (820,200) - góc 45°
    # Vẽ từ phần đuôi đến đầu kim

    # --- 3a. Đuôi piston (hình chữ T) ---
    # Thanh ngang T
    fill_rounded_rect(c, s(155),s(770), s(295),s(830), s(15), ORANGE, 255)
    # Viền
    for y in range(s(770),s(831)):
        for x in range(s(155),s(296)):
            d = min(x-s(155),s(295)-x,y-s(770),s(830)-y)
            if d<s(5):
                a2 = d/s(5)
                px(c,x,y,ORANGE_D,int((1-a2)*200))
    # Cán T
    fill_rounded_rect(c, s(210),s(830), s(240),s(870), s(8), ORANGE, 255)

    # --- 3b. Thân ống xilanh (hình chữ nhật dài nghiêng 45°) ---
    # Vì numpy không có, ta vẽ theo bounding box rồi rotate từng pixel
    # Thay vào đó ta vẽ hình ống theo diagonal
    lw = s(72)  # độ rộng ống
    # Vẽ lớp ngoài (vỏ nhựa trắng)
    draw_line_thick(c, s(240),s(850), s(720),s(370), lw//2+s(4), SILVER, 255)
    # Lớp trong (trong suốt xanh nhạt - nước vaccine)
    draw_line_thick(c, s(255),s(835), s(700),s(390), lw//2-s(6), BLUE_LIGHT, 235)
    # Phần nước vaccine (màu xanh đậm hơn - nửa dưới)
    draw_line_thick(c, s(255),s(835), s(500),s(590), lw//2-s(6), BLUE, 210)
    # Vạch chia độ (trắng)
    for i in range(1,5):
        t = i/5
        mx = int(s(255) + (s(700)-s(255))*t)
        my = int(s(835) + (s(390)-s(835))*t)
        dx_tick = s(30); dy_tick = s(30)
        draw_line_thick(c, mx-dx_tick,my-dy_tick, mx+dx_tick,my+dy_tick, s(3), WHITE, 180)

    # --- 3c. Piston bên trong ---
    draw_line_thick(c, s(248),s(843), s(580),s(511), s(12), SILVER_D, 255)
    draw_line_thick(c, s(248),s(843), s(540),s(551), s(20), ORANGE, 255)

    # --- 3d. Đầu nối kim (hình chóp cụt) ---
    # Vẽ tam giác cụt
    draw_line_thick(c, s(710),s(380), s(755),s(335), s(26), SILVER, 255)

    # --- 3e. Kim tiêm dài nhọn ---
    for i in range(100):
        t = i/99
        x1 = int(s(755)+t*(s(850)-s(755)))
        y1 = int(s(335)+t*(s(240)-s(335)))
        thick = max(1, int(s(9)*(1-t*0.85)))
        draw_line_thick(c, x1,y1, x1,y1, thick, SILVER_D, 255)
    # Mũi kim đỏ (giọt vaccine)
    draw_line_thick(c, s(840),s(248), s(855),s(233), s(5), RED_SOFT, 220)
    fill_circle(c, s(848), s(240), s(7), RED_SOFT, 230)

    # --- 3f. Viền ống ngoài (đường viền sắc nét) ---
    draw_line_thick(c, s(240),s(850), s(720),s(370), s(3), SILVER_D, 180)

    # === 4. Dấu thập y tế (góc trên phải) ===
    cross_cx = s(720); cross_cy = s(300)
    cross_r = s(85); bar_w = s(28)
    fill_circle(c, cross_cx, cross_cy, cross_r, (255,255,255), 230)
    fill_circle(c, cross_cx, cross_cy, cross_r-s(6), (255,255,255), 50)
    # Thanh dọc
    fill_rect(c, cross_cx-bar_w//2, cross_cy-cross_r+s(20),
                 cross_cx+bar_w//2, cross_cy+cross_r-s(20), TEAL, 240)
    # Thanh ngang
    fill_rect(c, cross_cx-cross_r+s(20), cross_cy-bar_w//2,
                 cross_cx+cross_r-s(20), cross_cy+bar_w//2, TEAL, 240)

    # === 5. Giọt sáng phía trên (highlight) ===
    fill_circle(c, s(350), s(200), s(60), (255,255,255), 40)
    fill_circle(c, s(370), s(220), s(30), (255,255,255), 25)

    return c


# ── Ghi PNG ───────────────────────────────────────────────────────────────────
def write_png(canvas, filename):
    h = len(canvas); w = len(canvas[0])
    raw = b''
    for row in canvas:
        raw += b'\x00'  # filter type None
        for px_val in row:
            raw += bytes(px_val)  # RGBA
    compressed = zlib.compress(raw, 6)

    def chunk(name, data):
        c2 = struct.pack('>I', len(data)) + name + data
        return c2 + struct.pack('>I', zlib.crc32(name+data)&0xffffffff)

    ihdr = struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)  # bit depth 8, color type 6=RGBA
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', ihdr)
    png += chunk(b'IDAT', compressed)
    png += chunk(b'IEND', b'')

    with open(filename, 'wb') as f:
        f.write(png)
    print(f'✅  {filename}  ({w}x{h}, {len(png)//1024}KB)')


# ── Tạo splash đơn giản ───────────────────────────────────────────────────────
def draw_splash(w, h):
    c = new_canvas(w, h, (*TEAL, 255))
    # Gradient nhẹ
    for y2 in range(h):
        for x2 in range(w):
            t = y2/h
            r2 = int(TEAL[0]*(1-t*0.15) + TEAL_DARK[0]*t*0.15)
            g2 = int(TEAL[1]*(1-t*0.15) + TEAL_DARK[1]*t*0.15)
            b2 = int(TEAL[2]*(1-t*0.15) + TEAL_DARK[2]*t*0.15)
            c[y2][x2] = [r2,g2,b2,255]
    # Vòng tròn trắng mờ
    fill_circle(c, w//2, h//2, int(h*0.18), (255,255,255), 30)
    # Dấu thập
    cx=w//2; cy=h//2; cr=int(h*0.14); bw=int(h*0.04)
    fill_circle(c, cx, cy, cr+int(h*0.02), (255,255,255), 60)
    fill_rect(c, cx-bw//2, cy-cr+int(h*0.02), cx+bw//2, cy+cr-int(h*0.02), WHITE, 220)
    fill_rect(c, cx-cr+int(h*0.02), cy-bw//2, cx+cr-int(h*0.02), cy+bw//2, WHITE, 220)
    # Text placeholder glow phía dưới
    for i in range(3):
        fill_circle(c, w//2, int(h*0.72)+i*int(h*0.06), int(h*0.012), (255,255,255), 80-i*20)
    return c


# ── Main ──────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    import os
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    print('⏳  Đang vẽ icon 1024×1024...')
    icon = draw_icon(1024)
    write_png(icon, 'icon.png')
    write_png(icon, 'adaptive-icon.png')   # same image

    print('⏳  Đang vẽ splash 1284×2778...')
    splash = draw_splash(1284, 2778)
    write_png(splash, 'splash.png')

    print('\n🎉  Xong! icon.png, adaptive-icon.png, splash.png đã được tạo.')
