(function() {
    // Load Mirador from CDN
    const script = document.createElement('script');
    script.src = "https://unpkg.com/mirador@latest/dist/mirador.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        Mirador.viewer({
            id: 'mirador-viewer',
            windows: [{
                manifestId: 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json',
                sideBarOpen: false, // Closed by default
                defaultSideBarPanel: 'info', // Metadata ready in sidebar
                thumbnailNavigationPosition: 'far-bottom', // Thumbnails at bottom
            }],
            window: {
                allowClose: false,
                allowMaximize: false,
                hideWindowTitle: true,
                sideBarPanel: 'info',
            },
            workspace: {
                type: 'mosaic', // Best for single-window centering
                allowNewWindows: false,
                showZoomControls: true,
            },
            workspaceControlPanel: {
                enabled: false, // Hides the dark left-hand utility bar
            },
            // THE FIXES FOR ZOOM & KEYBOARD
            osdConfig: {
                maxZoomLevel: 8,          // Your requested zoom limit
                preserveViewport: false,  // FORCE centering on every load
                visibilityRatio: 1,       // Prevents image from "flying" off screen
                homeFillsViewer: true,
            },
            // Enable Keyboard Arrows for navigation
            canvasNavigation: {
                height: 100,
            },
            thumbnailNavigation: {
                defaultHeight: 120,
            }
        });
    };
})();
