const packageJson = require("./package.json");

module.exports = {
  output: "export",
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
  //   webpack: ( config ) => {
  //     config.module.rules.push(
  //       {
  //         test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
  //         loader: 'url-loader?limit=100000',
  //       },
  //     )
  //     return config
  //   },
  //   webpack5: false,
};

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
