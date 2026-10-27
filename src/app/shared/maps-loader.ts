// Install the dynamic import hook synchronously so routed maps can render before
// the external API has downloaded. The existing browser API key is preserved.
const mapsWindow = window as any;
if (!mapsWindow.google?.maps?.importLibrary) {
  const namespace = mapsWindow.google = mapsWindow.google || {};
  const maps = namespace.maps = namespace.maps || {};
  let loading: Promise<void> | undefined;
  const importLibrary = (library: string): Promise<unknown> => {
    loading ||= new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      maps.angularMapsReady = resolve;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD9LZFPNoD3k7JGQ0w4NLYBSIZfGhAsJAA&loading=async&callback=google.maps.angularMapsReady';
      script.async = true;
      script.onerror = () => reject(new Error('Google Maps could not load'));
      document.head.appendChild(script);
    });
    return loading.then(() => {
      if (maps.importLibrary === importLibrary) throw new Error('Google Maps import API unavailable');
      return maps.importLibrary(library);
    });
  };
  maps.importLibrary = importLibrary;
}
