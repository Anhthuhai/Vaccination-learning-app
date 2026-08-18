#!/usr/bin/env python3
"""
Tạo ảnh cho Google Play Store — chỉ dùng thư viện chuẩn Python (không cần Pillow).
- icon-512.png       : 512x512  (App icon cho Play Console)
- feature-graphic.png: 1024x500 (Feature graphic / banner)

Tái sử dụng các hàm vẽ trong gen_icon.py.
"""
import os, math
import gen_icon as G

os.chdir(os.path.dirname(os.path.abspath(__file__)))

TEAL      = G.TEAL
TEAL_DARK = G.TEAL_DARK
WHITE     = (255, 255, 255)


def blit(dst, src, ox, oy):
    """Dán canvas src lên dst tại (ox, oy) với alpha blending."""
    sh = len(src); sw = len(src[0])
    for y in range(sh):
        for x in range(sw):
            r, g, b, a = src[y][x]
            if a > 0:
                G.px(dst, ox + x, oy + y, (r, g, b), a)


# ── 1. Icon 512×512 ───────────────────────────────────────────────────────────
def make_icon_512():
    print('⏳  Vẽ icon 512×512...')
    icon = G.draw_icon(512)
    G.write_png(icon, 'icon-512.png')


# ── 2. Feature graphic 1024×500 ───────────────────────────────────────────────
def make_feature_graphic():
    print('⏳  Vẽ feature graphic 1024×500...')
    W, H = 1024, 500
    c = G.new_canvas(W, H, (*TEAL, 255))

    # Nền gradient chéo teal → teal đậm
    for y in range(H):
        for x in range(W):
            t = (x + y) / (W + H)
            r2 = int(TEAL[0] * (1 - t * 0.35) + TEAL_DARK[0] * t * 0.35)
            g2 = int(TEAL[1] * (1 - t * 0.35) + TEAL_DARK[1] * t * 0.35)
            b2 = int(TEAL[2] * (1 - t * 0.35) + TEAL_DARK[2] * t * 0.35)
            c[y][x] = [r2, g2, b2, 255]

    # Các dấu thập y tế mờ trang trí (bên phải)
    def cross(cx, cy, size, bw, alpha):
        G.fill_rect(c, cx - bw, cy - size, cx + bw, cy + size, WHITE, alpha)
        G.fill_rect(c, cx - size, cy - bw, cx + size, cy + bw, WHITE, alpha)

    cross(760, 120, 46, 12, 22)
    cross(900, 300, 34, 9, 16)
    cross(680, 380, 26, 7, 14)
    cross(860, 90, 20, 6, 12)

    # Hào quang tròn phía sau icon
    G.fill_circle(c, 250, H // 2, 210, WHITE, 16)
    G.fill_circle(c, 250, H // 2, 180, WHITE, 12)

    # Icon ống tiêm (360px) đặt bên trái
    icon = G.draw_icon(360)
    blit(c, icon, 70, (H - 360) // 2)

    # Dải chữ: vẽ khối nền bo góc để bạn có thể thêm tên app (hoặc để trống)
    # Ở đây vẽ 3 "thanh" tượng trưng cho tên app + slogan (đồ hoạ tối giản)
    tx = 470
    G.fill_rounded_rect(c, tx, 150, tx + 470, 205, 14, WHITE, 235)      # thanh tên app (đậm)
    G.fill_rounded_rect(c, tx, 225, tx + 380, 262, 10, WHITE, 150)      # slogan dòng 1
    G.fill_rounded_rect(c, tx, 275, tx + 300, 305, 10, WHITE, 110)      # slogan dòng 2

    G.write_png(c, 'feature-graphic.png')


if __name__ == '__main__':
    make_icon_512()
    make_feature_graphic()
    print('\n🎉  Xong! Đã tạo icon-512.png và feature-graphic.png trong thư mục assets/.')
    print('    (Feature graphic dùng đồ hoạ tối giản — bạn có thể thêm chữ tên app bằng công cụ như Canva nếu muốn.)')
