(function() {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/mirador@latest/dist/mirador.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        const miradorInstance = Mirador.viewer({
            id: 'mirador-viewer',
            windows: [{
                manifestId: 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json',
                sideBarOpen: false,
                thumbnailNavigationPosition: 'far-bottom',
                view: 'single',
            }],
            window: {
                allowClose: false,
                allowMaximize: false,
                hideWindowTitle: true,
                // Ensures the "view" context is reset per canvas
                forceContext: true, 
            },
            // Direct instructions to the internal OSD engine
            osdConfig: {
                preserveViewport: false,    // RESET zoom on image change
                visibilityRatio: 1.0,       // Keep the image fully in view
                defaultZoomLevel: 0,        // 0 usually represents "Fit to window"
                minZoomLevel: 0,
                homeFillsViewer: true,      // Tells OSD to maximize the art in the box
                immediateRender: true       // Speeds up the initial "fit" calculation
            },
            workspaceControlPanel: { enabled: false }
        });
    };
})();
