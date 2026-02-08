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
                // This forces the image to center within its specific window
                view: 'single', 
            }],
            window: {
                allowClose: false,
                allowMaximize: false,
                hideWindowTitle: true, // Optional: keeps it cleaner
                defaultSideBarPanel: 'info',
            },
            workspace: {
                // 'mosaic' with a single window usually centers better than 'elastic'
                type: 'mosaic',
                showZoomControls: true,
            },
            workspaceControlPanel: {
                enabled: false, 
            },
            // Force the layout to focus on the content
            selectedWindowId: 'window-1'
        });
    };
})();
