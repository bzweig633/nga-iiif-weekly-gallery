(function() {
    // 1. Load Mirador from CDN
    const script = document.createElement('script');
    script.src = "https://unpkg.com/mirador@latest/dist/mirador.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        // 2. Initialize the viewer
        const miradorInstance = Mirador.viewer({
            id: 'mirador-viewer', // Must match your HTML div ID
            windows: [{
                manifestId: 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json',
                sideBarOpen: false,
                thumbnailNavigationPosition: 'far-bottom',
            }],
            window: {
                allowClose: false,
                allowMaximize: false,
                defaultSideBarPanel: 'info',
                views: [
                    { key: 'single', behaviors: ['individuals'] }
                ]
            },
            workspace: {
                type: 'mosaic',
                showZoomControls: true,
            },
            workspaceControlPanel: {
                enabled: false,
            }
        });

        // 3. THE FIX: Listen for canvas changes and reset zoom/coordinates
        // This ensures a landscape image and a portrait image both start centered.
        let currentCanvasId = '';

        miradorInstance.store.subscribe(() => {
            const state = miradorInstance.store.getState();
            const windowId = Object.keys(state.windows)[0];
            if (!windowId) return;

            const newCanvasId = state.windows[windowId].canvasId;

            // Only trigger if the image (canvas) has actually changed
            if (newCanvasId !== currentCanvasId) {
                currentCanvasId = newCanvasId;

                // Dispatch a reset action to center the new image
                miradorInstance.store.dispatch(
                    Mirador.actions.setWindowViewType(windowId, 'single')
                );
            }
        });
    };
})();
