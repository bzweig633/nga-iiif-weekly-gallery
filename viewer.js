// 1. Clear session memory so the viewer doesn't "remember" old zoom levels
localStorage.removeItem('mirador');

(function() {
  // 1. Create the script element to load Mirador
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/mirador@latest/dist/mirador.min.js';
  script.async = true;
  document.head.appendChild(script);

  // 2. Once the script loads, initialize the viewer
  script.onload = () => {
    Mirador.viewer({
      id: 'mirador-viewer', // Must match the ID in your HTML
      windows: [{
        manifestId: 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json',
        sideBarOpen: false // 1) Hide sidebar by default
      }],
      osdConfig: {
        preserveViewport: false, // 2) Reset zoom/center on every image
        homeFillsViewer: false   // 2) Ensure the entire image is visible (fit)
      },
      workspaceControlPanel: {
        enabled: false // Hide the workspace panel on the left by default
      }
    });
  };
})();
/*
//const miradorInstance = Mirador.viewer({
  id: 'mirador-viewer',
  windows: [{
    manifestId: 'https://bzweig633.github.io/nga-iiif-weekly-gallery/nga_random_collection.json',
    sideBarOpen: false, // Starts with metadata panel closed
  }],
  workspaceControlPanel: {
    enabled: false, // Hides the dark utility bar on the far left
  },
  window: {
    allowClose: false,
    allowMaximize: false,
  }
}); */
