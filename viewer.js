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
            }],
            window: {
                allowClose: false,
                defaultSideBarPanel: 'info',
            },
            workspaceControlPanel: { enabled: false }
        });

        // Track the current canvas so we only reset when it actually changes
        let lastCanvasId = null;

        miradorInstance.store.subscribe(() => {
            const state = miradorInstance.store.getState();
            const windowId = Object.keys(state.windows)[0];
            if (!windowId) return;

            const currentCanvasId = state.windows[windowId].canvasId;

            // Only act if the canvas has changed
            if (currentCanvasId && currentCanvasId !== lastCanvasId) {
                lastCanvasId = currentCanvasId;

                // We use a slight delay to ensure the new image has begun loading 
                // before we tell the viewer to 'Fit' it to the window.
                setTimeout(() => {
                    miradorInstance.store.dispatch({
                        type: 'mirador/UPDATE_WINDOW',
                        windowId: windowId,
                        payload: {
                            view: 'single' // This forces a re-render of the 'single' view
                        }
                    });
                }, 100);
            }
        });
    };
})();
