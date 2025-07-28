import json
from deep_translator import GoogleTranslator
from copy import deepcopy


# Traduce valores recursivamente manteniendo claves
def translate_values(obj, lang_from, lang_to):
    if isinstance(obj, dict):
        return {k: translate_values(v, lang_from, lang_to) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [translate_values(item, lang_from, lang_to) for item in obj]
    elif isinstance(obj, str):
        try:
            return GoogleTranslator(source=lang_from, target=lang_to).translate(obj)
        except Exception as e:
            print(f"Error al traducir '{obj}': {e}")
            return obj
    else:
        return obj


# Cargar JSON original en español
with open("es.json", "r", encoding="utf-8") as f:
    original = json.load(f)

# Traducir a inglés
translated_en = translate_values(deepcopy(original), "es", "en")
with open("en.json", "w", encoding="utf-8") as f:
    json.dump(translated_en, f, indent=2, ensure_ascii=False)

# Traducir a francés
translated_fr = translate_values(deepcopy(original), "es", "fr")
with open("fr.json", "w", encoding="utf-8") as f:
    json.dump(translated_fr, f, indent=2, ensure_ascii=False)

print("Listo: archivos 'en.json' y 'fr.json' generados.")
