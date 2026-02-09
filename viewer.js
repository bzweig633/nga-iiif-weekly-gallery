// 1. Clear session memory so the viewer doesn't "remember" old zoom levels
localStorage.removeItem('mirador');

// 2. Initialize the basic viewer
const miradorInstance = Mirador.viewer({
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
});
