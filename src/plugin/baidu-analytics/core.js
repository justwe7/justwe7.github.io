import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      try {
        if (_hmt && typeof _hmt !== undefined) {
          if (location.pathname) {
            _hmt.push(["_trackPageview", location.pathname]);
          }
        }
      } catch (error) {
        console.log('baidu-analytics:', error)
      }
    },
  };
})();