"""Build fig-U4-6 (Pakistan: physical regions and rivers) from Natural Earth 5.1.1.

Boundaries: ne_10m_admin_0_countries_pak (Pakistan point of view) for the national outline,
de facto ne_10m_admin_0_countries to separate the disputed territory, and
ne_10m_admin_0_boundary_lines_land for the Line of Control. Physical regions and rivers:
ne_10m_geography_regions_polys, ne_10m_rivers_lake_centerlines. Equirectangular projection
scaled by cos(30 N). Usage: python build_map.py <ne_dir> <out.svg>
"""
import math, sys, html
import shapefile
from shapely.geometry import shape, box, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection
from shapely.ops import unary_union, linemerge
from shapely import affinity

NE, OUT = sys.argv[1], sys.argv[2]

LON0, LON1, LAT0, LAT1 = 60.6, 80.6, 23.4, 37.15
W = 900
MX, MY = 20, 20                      # map frame offset
K = (W - 2 * MX) / ((LON1 - LON0) * math.cos(math.radians(30)))
MAP_W = W - 2 * MX
MAP_H = round((LAT1 - LAT0) * K)
COSL = math.cos(math.radians(30))
TOL = 1.3                            # simplification tolerance in px
BBOX = box(LON0 - 1, LAT0 - 1, LON1 + 1, LAT1 + 1)


def load(name, key=None):
    r = shapefile.Reader(f"{NE}/{name}/{name}.shp", encoding="utf-8")
    fields = [f[0] for f in r.fields[1:]]
    out = []
    for sr in r.iterShapeRecords():
        rec = dict(zip(fields, sr.record))
        g = shape(sr.shape.__geo_interface__)
        if not g.is_valid:
            g = g.buffer(0)
        if g.intersects(BBOX):
            out.append((rec, g.intersection(BBOX)))
    return out


def proj(g):
    """lon/lat -> px, then simplify in px."""
    g = affinity.affine_transform(g, [K * COSL, 0, 0, -K, MX - LON0 * K * COSL, MY + LAT1 * K])
    return g.simplify(TOL, preserve_topology=True)


def path(g, closed):
    """Integer relative path data."""
    parts = []
    def ring(coords, close):
        pts = [(round(x), round(y)) for x, y in coords]
        ded = [pts[0]]
        for p in pts[1:]:
            if p != ded[-1]:
                ded.append(p)
        if len(ded) < 2:
            return
        s = f"M{ded[0][0]} {ded[0][1]}"
        px, py = ded[0]
        rel = []
        for x, y in ded[1:]:
            rel.append(f"{x - px} {y - py}".replace(" -", "-"))
            px, py = x, y
        s += "l" + " ".join(rel)
        if close:
            s += "z"
        parts.append(s)
    def walk(geom):
        if geom.is_empty:
            return
        if isinstance(geom, Polygon):
            ring(geom.exterior.coords, True)
            for i in geom.interiors:
                ring(i.coords, True)
        elif isinstance(geom, LineString):
            ring(geom.coords, closed)
        elif isinstance(geom, (MultiPolygon, MultiLineString, GeometryCollection)):
            for sub in geom.geoms:
                walk(sub)
    walk(g)
    return "".join(parts)


def lines_only(g):
    if g.is_empty:
        return g
    if isinstance(g, (LineString, MultiLineString)):
        return linemerge(g) if isinstance(g, MultiLineString) else g
    ls = [s for s in getattr(g, "geoms", []) if isinstance(s, (LineString, MultiLineString))]
    return linemerge(unary_union(ls)) if ls else LineString()


def polys_only(g):
    if isinstance(g, (Polygon, MultiPolygon)):
        return g
    ps = [s for s in getattr(g, "geoms", []) if isinstance(s, (Polygon, MultiPolygon))]
    return unary_union(ps) if ps else Polygon()


# ---- data -------------------------------------------------------------------
pov = load("ne_10m_admin_0_countries_pak")
defacto = load("ne_10m_admin_0_countries")
blines = load("ne_10m_admin_0_boundary_lines_land")
regions = load("ne_10m_geography_regions_polys")
rivers = load("ne_10m_rivers_lake_centerlines")

pak_pov = unary_union([g for r, g in pov if r["ADMIN"] == "Pakistan"])
neigh = [(r["ADMIN"], g) for r, g in pov if r["ADMIN"] != "Pakistan"]
china_pov = unary_union([g for a, g in neigh if a == "China"])
neigh_all = unary_union([g for a, g in neigh])
# Pakistan-administered area: de facto Pakistan, plus the Siachen area, which lies west of the
# Line of Control as the Survey of Pakistan draws it (LoC from NJ9842 to the Karakoram Pass).
pak_admin = unary_union([g for r, g in defacto if r["ADMIN"] in ("Pakistan", "Siachen Glacier")])
pak_admin = pak_admin.intersection(pak_pov)
disputed = polys_only(pak_pov.difference(pak_admin.buffer(0.002)))
disputed = unary_union([p for p in getattr(disputed, "geoms", [disputed]) if p.area > 0.05 and p.centroid.y > 30])

loc = unary_union([g for r, g in blines if str(r["FEATURECLA"]).startswith("Line of control")
                   or (str(r["FEATURECLA"]).startswith("Indeterminant") and {r["ADM0_LEFT"], r["ADM0_RIGHT"]} == {"Siachen Glacier", "India"})])
frontier = lines_only(disputed.boundary.intersection(china_pov.buffer(0.02)))
pak_b = pak_pov.boundary
land_b = lines_only(pak_b.intersection(neigh_all.buffer(0.02)))
intl = lines_only(land_b.difference(frontier.buffer(0.03)))
coast = lines_only(pak_b.difference(neigh_all.buffer(0.02)))
# The Line of Control ends near Chhamb (about 32.9 N); south of it the Survey of Pakistan map shows
# the Working Boundary with Jammu, which Natural Earth folds into its LoC feature.
SOUTH = box(70, 30, 80, 32.9)
working = lines_only(loc.intersection(SOUTH))
loc = lines_only(loc.difference(SOUTH))

def region(*names):
    return unary_union([g for r, g in regions if r["NAME"] in names]).intersection(pak_pov)

mountains = region("HIMALAYAS", "KARAKORAM RA.", "HINDU KUSH", "Sulaiman Ra.", "Kirthar Ra.").difference(disputed)
thar = region("THAR DESERT")
delta = region("Indus Delta")

def river(name):
    return lines_only(unary_union([g for r, g in rivers if r["name"] == name]).intersection(pak_pov.buffer(0.05)))

indus = river("Indus")
tribs = unary_union([river(n) for n in ("Jhelum", "Chenab", "Ravi", "Sutlej")])

# ---- svg --------------------------------------------------------------------
def P(lon, lat):
    return round(MX + (lon - LON0) * K * COSL), round(MY + (LAT1 - lat) * K)

ROOT = (":root{--bg:#ffffff;--panel:#eef3f1;--ink:#132a24;--muted:#566b65;--line:#1f6f5c;--a1:#1f6f5c;"
        "--a1-fill:#e6efed;--a2:#15476b;--a2-fill:#e6ebf0;--a3:#b8551d;--a3-fill:#f0e9e5;--a4:#7b3886;"
        "--a4-fill:#ede7ee;--wm:#8b9a95}")
STYLE = ROOT + (
    " .bg{fill:var(--bg)} .sea{fill:var(--a2-fill)} .nb{fill:var(--bg);stroke:var(--muted);stroke-width:1}"
    " .pk{fill:var(--a1-fill)} .dz{fill:url(#hd)} .mt{fill:url(#hm)} .ds{fill:url(#hs)} .dl{fill:url(#hl)}"
    " .hm{stroke:var(--a3);stroke-width:1.4} .hs{fill:var(--a3)} .hl{stroke:var(--a2);stroke-width:1.2} .hd{stroke:var(--a1);stroke-width:1}"
    " .ib{fill:none;stroke:var(--ink);stroke-width:2;stroke-linejoin:round} .cs{fill:none;stroke:var(--a2);stroke-width:1.2}"
    " .fu{fill:none;stroke:var(--ink);stroke-width:1.5;stroke-dasharray:2 4} .lc{fill:none;stroke:var(--a3);stroke-width:2.6;stroke-dasharray:0.1 6;stroke-linecap:round}"
    " .wb{fill:none;stroke:var(--a4);stroke-width:2;stroke-dasharray:7 3}"
    " .rv{fill:none;stroke:var(--a2);stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round} .tr{fill:none;stroke:var(--a2);stroke-width:1.8;stroke-linecap:round}"
    " .frame{fill:none;stroke:var(--muted);stroke-width:1} .pt{fill:var(--ink)} .ptw{fill:var(--bg);stroke:var(--ink);stroke-width:1.5}"
    " text{fill:var(--ink);font-size:13px} .cn{font-size:15px;font-weight:700;letter-spacing:3px;fill:var(--muted)} .sl{font-size:13px;font-style:italic;fill:var(--a2)}"
    " .zl{font-size:13px;font-weight:700} .pol{font-size:12px;fill:var(--muted);font-weight:700} .dzt{font-size:12px;fill:var(--a3);font-weight:700}"
    " .h{font-size:18px;font-weight:700} .sub{font-size:13px;fill:var(--muted)} .kt{font-size:13px} .note{font-size:12px;fill:var(--muted)}"
    " .halo{stroke:var(--bg);stroke-width:3.5;paint-order:stroke;stroke-linejoin:round} .wm{fill:var(--wm);font-size:11px}")

DEFS = ('<defs>'
        '<pattern id="hm" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="hm" x1="0" y1="0" x2="0" y2="8"/></pattern>'
                '<pattern id="hs" width="6" height="6" patternUnits="userSpaceOnUse"><circle class="hs" cx="3" cy="3" r="1.1"/></pattern>'
        '<pattern id="hl" width="6" height="6" patternUnits="userSpaceOnUse"><line class="hl" x1="0" y1="3" x2="6" y2="3"/><line class="hl" x1="3" y1="0" x2="3" y2="6"/></pattern>'
        '<pattern id="hd" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line class="hd" x1="0" y1="0" x2="0" y2="9"/></pattern>'
        f'<clipPath id="cf"><rect x="{MX}" y="{MY}" width="{MAP_W}" height="{MAP_H}"/></clipPath>'
        '</defs>')

body = []
def add(cls, g, closed=True):
    d = path(proj(g), closed)
    if d:
        body.append(f'<path class="{cls}" d="{d}"/>')

def text(x, y, s, cls=None, anchor=None, halo=True, extra=""):
    c = " ".join(filter(None, [cls, "halo" if halo else None]))
    a = f' text-anchor="{anchor}"' if anchor else ""
    body.append(f'<text{f" class=\"{c}\"" if c else ""} x="{x}" y="{y}"{a}{extra}>{html.escape(s, quote=False)}</text>')

body.append(f'<g clip-path="url(#cf)"><rect class="sea" x="{MX}" y="{MY}" width="{MAP_W}" height="{MAP_H}"/>')
add("nb", unary_union([g for a, g in neigh]))
add("pk", pak_pov)
add("dz", disputed)
add("mt", mountains)
add("ds", thar)
add("dl", delta)
add("cs", coast, False)
add("ib", intl, False)
add("fu", frontier, False)
add("wb", working, False)
add("lc", loc, False)
add("tr", tribs, False)
add("rv", indus, False)
body.append("</g>")
body.append(f'<rect class="frame" x="{MX}" y="{MY}" width="{MAP_W}" height="{MAP_H}"/>')

# neighbours and sea
for lon, lat, s in [(66.4, 33.6, "AFGHANISTAN"), (61.0, 27.2, "IRAN"), (77.6, 36.7, "CHINA"), (75.6, 27.6, "INDIA")]:
    x, y = P(lon, lat); text(x, y, s, "cn", "middle")
x, y = P(64.2, 23.9); text(x, y, "ARABIAN SEA", "cn", "middle")
x, y = P(80.45, 35.95)
text(x, y, "FRONTIER", "pol", "end")
text(x, y + 15, "UNDEFINED", "pol", "end")

# physical regions (names from Topic 4.3)
for lon, lat, s in [(75.75, 36.2, "Karakoram"), (71.3, 36.15, "Hindu Kush"), (73.85, 34.8, "Himalaya"),
                    (69.4, 31.0, "Sulaiman Range"), (66.5, 27.0, "Kirthar Range"), (72.75, 33.2, "Potohar Plateau"),
                    (65.4, 29.6, "Balochistan Plateau"), (72.6, 30.25, "Upper Indus Plain"), (68.9, 27.4, "Lower Indus Plain"),
                    (71.45, 31.45, "Thal"), (72.0, 28.75, "Cholistan"), (70.35, 25.6, "Thar"), (65.0, 28.2, "Kharan"),
                    (63.2, 25.55, "Makran coast"), (67.6, 23.85, "Indus Delta")]:
    x, y = P(lon, lat); text(x, y, s, "zl", "middle")

# rivers
for lon, lat, s, rot in [(70.9, 32.6, "Indus", -62), (73.25, 32.6, "Jhelum", 0), (73.5, 31.9, "Chenab", 0),
                         (73.95, 31.05, "Ravi", 0), (73.4, 29.8, "Sutlej", 0)]:
    x, y = P(lon, lat)
    t = f' transform="rotate({rot} {x} {y})"' if rot else ""
    text(x, y, s, "sl", "middle", extra=t)

# political labels (wording of the Survey of Pakistan folio map)
for lon, lat, s in [(73.9, 36.6, "GILGIT-BALTISTAN"), (73.95, 34.25, "AJK")]:
    x, y = P(lon, lat); text(x, y, s, "pol", "middle")
x, y = P(77.15, 34.15)
for i, s in enumerate(["INDIAN ILLEGALLY OCCUPIED", "JAMMU AND KASHMIR", "(Disputed territory)"]):
    text(x, y + i * 14, s, "dzt", "middle")

# places
for lon, lat, s, dx, anchor in [(73.05, 33.69, "Islamabad", -8, "end"), (74.35, 31.55, "Lahore", 8, None),
                                (67.01, 24.86, "Karachi", -8, "end"), (62.33, 25.13, "Gwadar", 0, "middle")]:
    x, y = P(lon, lat)
    if s == "Islamabad":
        body.append(f'<rect class="pt" x="{x - 4}" y="{y - 4}" width="8" height="8"/>')
    else:
        body.append(f'<circle class="ptw" cx="{x}" cy="{y}" r="4"/>')
    text(x + dx, y + (16 if s == "Gwadar" else 4), s, None, anchor)
x, y = P(72.70, 34.09)
body.append(f'<rect class="ptw" x="{x - 4}" y="{y - 4}" width="8" height="8"/>')
text(x - 8, y + 4, "Tarbela Dam", None, "end")
for lon, lat, s in [(76.51, 35.88, "K2"), (74.59, 35.24, "Nanga Parbat")]:
    x, y = P(lon, lat)
    body.append(f'<path class="pt" d="M{x} {y - 5}l5 9h-10z"/>')
    text(x + 7, y + 4, s)

# north arrow and scale bar (km per px at 30 N along a parallel)
nx, ny = P(79.6, 25.9)
body.append(f'<path class="pt" d="M{nx} {ny - 22}l7 20-7-5-7 5z"/>')
text(nx, ny + 14, "N", "zl", "middle")
km_px = (111.32 * COSL) / (K * COSL)
bar = round(200 / km_px)
sx, sy = P(76.2, 24.0)
body.append(f'<path class="ib" d="M{sx} {sy}h{bar}M{sx} {sy - 5}v10M{sx + bar} {sy - 5}v10"/>')
text(sx, sy - 9, "0", None, None)
text(sx + bar, sy - 9, "200 km", None, "middle")

# key
ky = MY + MAP_H + 34
body.append(f'<text class="h" x="{MX}" y="{ky}">Key</text>')
items = [("sw", "mt", "Mountains"), ("sw", "ds", "Desert (Thar and Cholistan)"), ("sw", "dl", "Indus Delta"),
         ("sw", "dz", "Disputed territory"), ("ln", "rv", "Indus River"), ("ln", "tr", "Tributary"), ("ln", "ib", "International boundary"),
         ("ln", "lc", "Line of Control (approximate)"), ("ln", "wb", "Working Boundary"), ("ln", "fu", "Frontier undefined"), ("pt", "", "Capital, city, dam")]
colw = (W - 2 * MX) // 3
for i, (kind, cls, lab) in enumerate(items):
    cx = MX + (i % 3) * colw
    cy = ky + 20 + (i // 3) * 28
    if kind == "sw":
        body.append(f'<rect class="pk" x="{cx}" y="{cy}" width="34" height="18"/><rect class="{cls}" x="{cx}" y="{cy}" width="34" height="18"/><rect class="frame" x="{cx}" y="{cy}" width="34" height="18"/>')
    elif kind == "ln":
        body.append(f'<path class="{cls}" d="M{cx} {cy + 9}h34"/>')
    else:
        body.append(f'<rect class="pt" x="{cx + 2}" y="{cy + 5}" width="8" height="8"/><circle class="ptw" cx="{cx + 18}" cy="{cy + 9}" r="4"/><rect class="ptw" x="{cx + 26}" y="{cy + 5}" width="8" height="8"/>')
    text(cx + 44, cy + 14, lab, "kt", halo=False)

ny0 = ky + 20 + 4 * 28 + 14
notes = [
    "Indian Illegally Occupied Jammu and Kashmir: disputed territory, final status to be decided in line with relevant UNSC resolutions.",
    "The dotted Line of Control is approximate. The state of Jammu and Kashmir and its accession is yet to be decided through a",
    "plebiscite under the relevant United Nations Security Council resolutions.",
    "Where FRONTIER UNDEFINED appears, the actual boundary will be decided by the sovereign authorities concerned after the final",
    "settlement of the Jammu and Kashmir dispute. Too small to show at this scale: Junagadh and Manavadar (south of the map area)",
    "and the Sir Creek boundary, which runs along the eastern bank of the creek. Region edges are generalised for teaching.",
    "Boundaries: Natural Earth 5.1.1 (public domain), Pakistan point of view, checked against the Survey of Pakistan folio map.",
]
for i, s in enumerate(notes):
    text(MX, ny0 + i * 16, s, "note", halo=False)
H = ny0 + len(notes) * 16 + 14
body.append(f'<text class="wm" x="{W - MX}" y="{H - 8}" text-anchor="end" aria-hidden="true">textbook.com.pk</text>')

TITLE = "Map of Pakistan's physical regions and rivers"
DESC = ("Map of Pakistan's physical regions and rivers: the northern and western mountains (Himalaya, Karakoram, Hindu Kush, "
        "Sulaiman and Kirthar ranges), the Potohar and Balochistan plateaus, the upper and lower Indus Plain, the Thal, Cholistan, "
        "Thar and Kharan deserts, and the Makran coast and Indus Delta, with the Indus and its tributaries the Jhelum, Chenab, Ravi "
        "and Sutlej flowing to the Arabian Sea; neighbouring Afghanistan, Iran, China and India are labelled, and Jammu and Kashmir "
        "is shown as disputed territory with the Line of Control, as on the Survey of Pakistan map.")
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="t d" '
       f'font-family="system-ui, -apple-system, \'Segoe UI\', Roboto, sans-serif"><title id="t">{html.escape(TITLE, quote=False)}</title>'
       f'<desc id="d">{html.escape(DESC, quote=False)}</desc><style>{STYLE}</style>{DEFS}'
       f'<rect class="bg" x="0" y="0" width="{W}" height="{H}"/>' + "".join(body) + '</svg>')
open(OUT, "w").write(svg)
print(f"{W}x{H}, {len(svg.encode())/1024:.1f} KB", file=sys.stderr)
