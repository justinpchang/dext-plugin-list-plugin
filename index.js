const fs = require('fs');
const dextDir = __dirname.substring(0, __dirname.indexOf('.dext') + 6);

module.exports = {
    action: 'openurl',
    query: (query) => {
        let items = [];
        if(query === 'plugins') {
            // get list of enabled plugins
            var plugins = JSON.parse(fs.readFileSync(dextDir + 'config.json', 'utf8')).plugins;
            // create item for each plugin
            for(var i = 0; i < plugins.length; i++) {
                var plugin = JSON.parse(fs.readFileSync(dextDir + 'plugins/' + plugins[i] + '/package.json'));
                var title = plugins[i] + ' v' + plugin.version;
                var repository = plugin.repository;
                var url;
                if(typeof repository === 'undefined') {
                    title += ' (No GitHub URL)';
                } else {
                    url = plugin.repository.url;
                }
                items.push(
                    {
                        title: title,
                        subtitle: plugin.description,
                        arg: url,
                        icon: {
                            path: './icon.png'
                        }
                    }
                );
            }
        }
        console.log(items[1]);
        return { items };
    }
};
