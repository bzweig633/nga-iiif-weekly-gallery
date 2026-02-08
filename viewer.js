(function() {
    // 1. Load Mirador Library from CDN
    const script = document.createElement('script');
    script.src = "https://unpkg.com/mirador@latest/dist/mirador.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        // 2. Initialize Mirador
        // 'id' must match the div ID in your HTML
        const miradorInstance = Mirador.viewer({
            id: 'mirador-viewer',
            windows: [{
                manifestId: 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json',
                allowMaximize: false,
                allowFullscreen: true,
                // This closes the sidebar (Information Panel) by default
                sideBarOpen: false, 
            }],
            window: {
                allowClose: false,
                defaultSideBarPanel: 'info',
                sideBarPanel: 'info',
            },
            workspace: {
                showZoomControls: true,
                type: 'mosaic', // or 'elastic'
            },
            workspaceControlPanel: {
                enabled: false, // Hides the dark left-hand settings bar
            }
        });

        console.log("Mirador Viewer initialized.");
    };
})();
