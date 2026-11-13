# Membuat font TrueType "tanpa glyph" (semua glyph kosong, lebar 500/1000 em) untuk lapisan teks tak terlihat di PDF.
# Teks di PDF tetap bisa dicari/disalin/dibaca ATS, sedangkan tampilannya berasal dari gambar halaman.
#   python3 alat/glyphless.py src/aset/glyphless.ttf
import sys
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

fb = FontBuilder(1000, isTTF=True)
fb.setupGlyphOrder(['.notdef', 'kosong'])
fb.setupCharacterMap({0x20: 'kosong'})
kosong = TTGlyphPen(None).glyph()
fb.setupGlyf({'.notdef': kosong, 'kosong': TTGlyphPen(None).glyph()})
fb.setupHorizontalMetrics({'.notdef': (500, 0), 'kosong': (500, 0)})
fb.setupHorizontalHeader(ascent=1000, descent=0)
fb.setupNameTable({'familyName': 'GlyphLess', 'styleName': 'Regular'})
fb.setupOS2(sTypoAscender=1000, sTypoDescender=0, usWinAscent=1000, usWinDescent=0)
fb.setupPost()
fb.save(sys.argv[1])
