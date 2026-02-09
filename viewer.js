(function() {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/mirador@latest/dist/mirador.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        const miradorInstance = Mirador.viewer({
            id: 'mirador-viewer',
            windows: [{
                id: 'window-1', // Explicit ID to help focus
                manifestId: 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json',
                sideBarOpen: false,
                thumbnailNavigationPosition: 'far-bottom',
                view: 'single',
            }],
            window: {
                allowClose: false,
                allowMaximize: false,
                hideWindowTitle: true,
                defaultSideBarPanel: 'info',
            },
            workspace: {
                showZoomControls: true,
                type: 'mosaic',
                allowNewWindows: false,
            },
            workspaceControlPanel: { enabled: false },
            // THE FIXES
            osdConfig: {
                maxZoomLevel: 8,
                preserveViewport: false, // Forces recalculation on every image switch
                visibilityRatio: 1.0,    // Keeps the image within the container bounds
                homeFillsViewer: false,  // PREVENTS the "zoomed-in" default; forces "fit"
            },
            thumbnailNavigation: {
                defaultHeight: 110,
            }
        });

        // KEYBOARD FOCUS FIX:
        // Mirador needs the window to be "selected" for arrow keys to work.
        // This small delay ensures the window is ready before we focus it.
        setTimeout(() => {
            const viewerElement = document.getElementById('mirador-viewer');
            if (viewerElement) {
                viewerElement.tabIndex = 0; // Make it focusable
                viewerElement.focus();
            }
        }, 2000);
    };
})();
