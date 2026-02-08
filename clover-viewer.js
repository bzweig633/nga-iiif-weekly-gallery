(function() {
    // 1. Load the Clover Library via CDN
    const script = document.createElement('script');
    script.src = "https://www.unpkg.com/@samvera/clover-iiif@latest/dist/web-components/index.umd.js";
    document.head.appendChild(script);

    // 2. Run initialization when the library is ready
    script.onload = () => {
        const anchor = document.getElementById('clover-anchor');
        if (!anchor) return;

        const viewer = document.createElement('clover-viewer');

        // Configure options: Set information panel to closed
        const options = JSON.stringify({
            informationPanel: {
                open: false
            }
        });

        viewer.setAttribute('options', options);
        viewer.setAttribute('iiif-content', 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json');

        // Inject into the DOM
        anchor.appendChild(viewer);
    };
})();
