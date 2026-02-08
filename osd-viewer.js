(function() {
    // 1. Load OpenSeadragon from CDN
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/openseadragon.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        // 2. Initialize the viewer
        // OpenSeadragon looks for an existing ID in the HTML
        const viewer = OpenSeadragon({
            id: "osd-viewer",
            prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
            tileSources: "https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json",
            
            // Customizations
            showNavigationControl: true,
            navigationControlAnchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
            showRotationControl: true,
            gestureSettingsMouse: {
                scrollToZoom: true
            }
        });

        console.log("OpenSeadragon initialized.");
    };
})();
