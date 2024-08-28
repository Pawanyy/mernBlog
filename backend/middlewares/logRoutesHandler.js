const logRoutesHandler = (app) => {
    const routes = [];

    const extractRoutes = (stack, parentPath = '') => {
        stack.forEach((middleware) => {
            if (middleware.route) {
                // Routes registered directly on the app or router
                routes.push({
                    method: Object.keys(middleware.route.methods).join(', ').toUpperCase(),
                    path: parentPath + middleware.route.path
                });
            } else if (middleware.name === 'router' && middleware.handle.stack) {
                // Recursively handle nested routers
                let newParentPath = parentPath;

                // Clean up the path regex and append it to the parentPath
                if (middleware.regexp) {
                    const regexPath = middleware.regexp.source
                        .replace(/\\\//g, '/')       // Replace escaped slashes
                        .replace(/\/\?\(\?=\/\|\$\)/, '')  // Remove trailing regex characters
                        .replace('^', '');           // Remove starting ^ character
                    newParentPath += regexPath;
                }

                extractRoutes(middleware.handle.stack, newParentPath);
            }
        });
    };

    extractRoutes(app._router.stack);

    console.table(routes.map(route => ({
        Method: route.method,
        Path: route.path
    })));
};

export default logRoutesHandler;
