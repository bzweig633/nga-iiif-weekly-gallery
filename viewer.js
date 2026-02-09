(function() {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/mirador@latest/dist/mirador.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        Mirador.viewer({
            id: 'mirador-viewer',
            windows: [{
                manifestId: 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json',
                sideBarOpen: false,
                thumbnailNavigationPosition: 'far-bottom',
            }],
            window: {
                allowClose: false,
                allowMaximize: false,
                hideWindowTitle: true,
                // These help the viewer 'snap' to the new image size faster
                defaultView: 'single',
                switchCanvasOnSearch: true,
            },
            // Reduce the 'tiling' effect by increasing the tile cache and reducing 'blur' transitions
            osdConfig: {
                preserveViewport: false,
                alwaysBlend: false,       // Performance: Stops the 'fading' between tiles
                wrapHorizontal: false,
                minZoomImageRatio: 1,     // Forces image to at least fill one dimension
                loadTilesWithAjax: true,
                imageLoaderLimit: 15,     // Increases parallel tile loading
            },
            workspace: {
                type: 'mosaic',           // Mosaic is faster than Elastic
            },
            workspaceControlPanel: { enabled: false },
            // Disable animations to save CPU/GPU for rendering tiles
            themes: {
                default: {
                    transitions: { create: () => 'none', duration: 0 }
                }
            }
        });
    };
})();
