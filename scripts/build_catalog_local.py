"""Regenerate the file:// catalog after updating products.json."""
import json
from pathlib import Path

catalog = Path(__file__).resolve().parents[1] / 'content-assets' / 'catalog'
data = json.loads((catalog / 'products.json').read_text())
(catalog / 'products.js').write_text(
    '/* Generated from products.json by scripts/build_catalog_local.py. */\n'
    + 'globalThis.UrborLocalCatalog = '
    + json.dumps(data, ensure_ascii=True, separators=(',', ':')) + ';\n'
)
