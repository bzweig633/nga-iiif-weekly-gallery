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
                defaultView: 'single',
            },
            // 1. LIMIT THE ZOOM
            osdConfig: {
                preserveViewport: false,
                visibilityRatio: 1.0,
                minZoomLevel: 0,
                // Prevents zooming past the actual resolution of the image (no 'pixel-mush')
                maxZoomLevel: 3, 
                homeFillsViewer: true,
            },
            // 2. ENABLE KEYBOARD NAVIGATION
            canvasNavigation: {
                height: 100,
                width: 100,
            },
            // This enables the arrow keys (Left/Right) to swap images
            thumbnailNavigation: {
                defaultHeight: 120,
                displaySettings: true,
            },
            workspace: {
                type: 'mosaic',
                // This ensures the viewer listens for keyboard events
                isWorkspaceControlPanelVisible: false,
            },
            // Global keyboard settings
            keyboardShortcutConfig: {
                enabled: true,
                previousCanvas: 'left',
                nextCanvas: 'right',
            }
        });
    };
})();
