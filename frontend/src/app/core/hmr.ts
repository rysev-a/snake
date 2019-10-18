const customizedHMRPlugin = {
  hmrUpdate: ({ type, path, content, dependants }) => {
    // Dependants only available when emitHMRDependencies = true
    if (type === 'js') {
      FuseBox.flush(file => {
        if (/core/.test(file) || /history/.test(file)) {
          return false;
        }
        return true;
      });
      FuseBox.dynamic(path, content);
      if (FuseBox.mainFile) {
        FuseBox.import(FuseBox.mainFile);
      }
      return true;
    }
  },
};

let alreadyRegistered = false;
if (!window.hmrRegistered) {
  window.hmrRegistered = true;
  FuseBox.addPlugin(customizedHMRPlugin);
}
