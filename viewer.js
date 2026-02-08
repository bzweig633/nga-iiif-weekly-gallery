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
                defaultView: 'single',
            }],
            window: {
                allowClose: false,
                allowMaximize: false,
                defaultSideBarPanel: 'info',
                // This tells Mirador to reset the zoom every time the canvas changes
                forceContext: true, 
            },
            // We pass settings directly to the internal OpenSeadragon engine
            osdConfig: {
                preserveViewport: false, // This is the "magic" setting for centering
                visibilityRatio: 1,
                minZoomLevel: 0,
                homeFillsViewer: true
            },
            workspaceControlPanel: { enabled: false }
        });
    };
})();
