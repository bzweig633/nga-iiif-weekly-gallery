import pandas as pd
import json
import os

# --- CONFIGURATION ---
GITHUB_USERNAME = "bzweig633"
REPO_NAME = "nga-iiif-weekly-gallery"
MANIFEST_FILENAME = "nga_random_collection.json"
FILTER_CATEGORY = 'Painting' 

BASE_URL = f"https://{GITHUB_USERNAME}.github.io/{REPO_NAME}"
NGA_DATA_URL = "https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/objects.csv"
NGA_IMAGE_URL = "https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/published_images.csv"

def clean_text(text):
    if pd.isna(text):
        return "Unknown"
    return str(text).replace('\r', ' ').replace('\n', ' ').strip()

def generate_iiif_manifest(selected_items):
    manifest = {
        # MUST be http and MUST NOT have a trailing slash to be recognized
        "@context": "http://iiif.io/api/presentation/3/context.json",
        "id": f"{BASE_URL}/{MANIFEST_FILENAME}", 
        "type": "Manifest",
        "label": { "en": [ f"Weekly NGA {FILTER_CATEGORY} Gallery" ] },
        "items": []
    }

    for i, item in enumerate(selected_items):
        image_uuid = str(item.get('uuid', '')).strip()
        image_service_url = f"https://api.nga.gov/iiif/{image_uuid}"
        canvas_id = f"{BASE_URL}/canvas/p{i}"
        
        # We fetch the width/height from the CSV if available, or use 1000 as a safe fallback
        # Strict V3 requires these at the Canvas level
        w = int(item.get('width', 1000))
        h = int(item.get('height', 1000))

        canvas = {
            "id": canvas_id,
            "type": "Canvas",
            "label": { "en": [ clean_text(item.get('title', 'Untitled')) ] },
            "width": w,
            "height": h,
            "items": [{
                "id": f"{BASE_URL}/page/{i}",
                "type": "AnnotationPage",
                "items": [{
                    "id": f"{BASE_URL}/anno/{i}",
                    "type": "Annotation",
                    "motivation": "painting",
                    "body": {
                        "id": f"{image_service_url}/full/max/0/default.jpg",
                        "type": "Image",
                        "format": "image/jpeg",
                        "width": w,
                        "height": h,
                        "service": [
                            {
                                "id": image_service_url,
                                "type": "ImageService2",
                                "profile": "level2"
                            }
                        ]
                    },
                    "target": canvas_id
                }]
            }]
        }
        manifest["items"].append(canvas)
    return manifest

def main():
    print("--- Starting Curator Script ---")
    objects_df = pd.read_csv(NGA_DATA_URL, low_memory=False)
    images_df = pd.read_csv(NGA_IMAGE_URL, low_memory=False)
    
    objects_df.columns = objects_df.columns.str.lower()
    images_df.columns = images_df.columns.str.lower()

    df = pd.merge(objects_df, images_df, left_on="objectid", right_on="depictstmsobjectid")
    
    oa_df = df[
        (df['classification'] == FILTER_CATEGORY) & 
        (df['iiifurl'].notna())
    ].copy()

    if len(oa_df) == 0:
        print("No matches found.")
        return

    selected = oa_df.sample(n=min(20, len(oa_df))).to_dict('records')
    iiif_json = generate_iiif_manifest(selected)
    
    with open(MANIFEST_FILENAME, 'w', encoding='utf-8') as f:
        json.dump(iiif_json, f, indent=2, ensure_ascii=False)

    print(f"SUCCESS: {MANIFEST_FILENAME} saved with V3 Schema fixes.")

if __name__ == "__main__":
    main()
