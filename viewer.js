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
                // This setting specifically controls the thumbnail strip for this window
                thumbnailNavigationPosition: 'far-bottom', 
            }],
            window: {
                allowClose: false,
                sideBarPanel: 'info',
                views: [
                    { key: 'single', behaviors: ['individuals'] },
                    { key: 'gallery' }
                ],
            },
            // Global thumbnail settings
            thumbnailNavigation: {
                defaultHeight: 150, // Height of the thumbnail strip
                displaySettings: true,
            },
            workspaceControlPanel: {
                enabled: false, 
            }
        });
    };
})();
