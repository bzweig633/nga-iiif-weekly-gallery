import pandas as pd
import requests
import json
import os

# --- CONFIGURATION ---
# Replace these with your actual GitHub details
GITHUB_USERNAME = "bzweig633"
REPO_NAME = "nga-iiif-weekly-gallery"
MANIFEST_FILENAME = "nga_random_collection.json"
FILTER_CATEGORY = 'Painting' 

BASE_URL = f"https://{GITHUB_USERNAME}.github.io/{REPO_NAME}"
NGA_DATA_URL = "https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/objects.csv"
NGA_IMAGE_URL = "https://raw.githubusercontent.com/NationalGalleryOfArt/opendata/main/data/published_images.csv"

def generate_iiif_manifest(selected_items):
    manifest = {
        "@context": "http://iiif.io/api/presentation/3/context.json",
        "id": f"{BASE_URL}/{MANIFEST_FILENAME}", 
        "type": "Manifest",
        "label": { "en": [ f"Weekly NGA {FILTER_CATEGORY} Gallery" ] },
        "summary": { "en": [ f"A curated selection of 20 random {FILTER_CATEGORY}s from the NGA Open Access collection." ] },
        "rights": "https://creativecommons.org/publicdomain/zero/1.0/",
        "requiredStatement": {
            "label": { "en": [ "Attribution" ] },
            "value": { "en": [ "Courtesy of the National Gallery of Art, Washington." ] }
        },
        "behavior": ["paged"],
        "items": []
    }

    for i, item in enumerate(selected_items):
        # We use .get() and str() to ensure we don't crash on missing data
        image_uuid = str(item.get('uuid', ''))
        image_service_url = f"https://api.nga.gov/iiif/p/{image_uuid}"
        canvas_id = f"{BASE_URL}/canvas/p{i}"
        
        canvas = {
            "id": canvas_id,
            "type": "Canvas",
            "label": { "en": [ str(item.get('title', 'Untitled')) ] },
            "metadata": [
                {"label": {"en": ["Artist"]}, "value": {"en": [str(item.get('attribution', 'Unknown'))]}},
                {"label": {"en": ["Date"]}, "value": {"en": [str(item.get('displaydate', 'n.d.'))]}},
                {"label": {"en": ["Medium"]}, "value": {"en": [str(item.get('medium', 'Unknown'))]}},
                {"label": {"en": ["Dimensions"]}, "value": {"en": [str(item.get('dimensions', 'Not recorded'))]}}
            ],
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
                        "service": [{
                            "id": image_service_url,
                            "type": "ImageService3",
                            "profile": "level2"
                        }]
                    },
                    "target": canvas_id
                }]
            }]
        }
        manifest["items"].append(canvas)
    return manifest

def main():
    print("--- Starting Curator Script ---")
    
    print("Step 1: Downloading NGA Metadata...")
    objects_df = pd.read_csv(NGA_DATA_URL, low_memory=False)
    images_df = pd.read_csv(NGA_IMAGE_URL, low_memory=False)

    # FIX: Force all columns to lowercase to avoid 'objectid' vs 'objectID' errors
    objects_df.columns = objects_df.columns.str.lower()
    images_df.columns = images_df.columns.str.lower()

    print(f"Step 2: Merging data and filtering for {FILTER_CATEGORY}...")
    df = pd.merge(objects_df, images_df, on="objectid")
    
    # Filter for Open Access and the specific classification
    oa_df = df[
        (df['is_public_domain'] == 1) & 
        (df['classification'] == FILTER_CATEGORY)
    ].dropna(subset=['iiifurl'])

    if len(oa_df) == 0:
        print(f"FAILED: No items found for category '{FILTER_CATEGORY}'.")
        return

    print(f"Step 3: Selecting 20 random items from {len(oa_df)} matches...")
    selected = oa_df.sample(n=min(20, len(oa_df))).to_dict('records')

    print("Step 4: Generating IIIF Manifest...")
    iiif_json = generate_iiif_manifest(selected)
    
    with open(MANIFEST_FILENAME, 'w') as f:
        json.dump(iiif_json, f, indent=4)

    print(f"SUCCESS: {MANIFEST_FILENAME} has been created.")

if __name__ == "__main__":
    main()
